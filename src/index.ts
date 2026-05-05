import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { createBunWebSocket } from 'hono/bun'
import type { ServerWebSocket } from 'bun'
import type { ClientMessage } from './types'
import {
  createRoom,
  joinRoom,
  removePlayer,
  cleanupEmptyRoom,
  handleAnswer,
  startGame,
  skipQuestion,
  getRoom,
  getLeaderboard,
  broadcast,
  sendTo,
  playerPublic,
} from './gameManager'

// ─── WebSocket Setup ──────────────────────────────────────────────────────────

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>()

// ─── Hono App ─────────────────────────────────────────────────────────────────

const app = new Hono()

// Static files from /public
app.use('/*', serveStatic({ root: './public' }))

// ─── REST: Create Room ────────────────────────────────────────────────────────

app.post('/api/create-room', (c) => {
  const { roomId } = createRoom()
  console.log(`[Room] Created: ${roomId}`)
  return c.json({ success: true, roomId })
})

// ─── REST: Check Room Exists ──────────────────────────────────────────────────

app.get('/api/room/:roomId', (c) => {
  const roomId = c.req.param('roomId').toUpperCase()
  const room = getRoom(roomId)
  if (!room) return c.json({ exists: false }, 404)
  return c.json({
    exists: true,
    status: room.game.status,
    playerCount: room.players.size,
  })
})

// ─── WebSocket Endpoint ───────────────────────────────────────────────────────

app.get(
  '/ws',
  upgradeWebSocket(() => {
    // Unique per-connection state via closure
    let connectedRoomId: string | null = null
    let connectedPlayerId: string | null = null

    return {
      onOpen(_event, ws) {
        console.log('[WS] Connection opened')
        ws.send(JSON.stringify({ type: 'connected', message: '知識の戦い へようこそ!' }))
      },

      onMessage(event, ws) {
        let msg: ClientMessage
        try {
          msg = JSON.parse(event.data as string) as ClientMessage
        } catch {
          ws.send(JSON.stringify({ type: 'error', message: 'Format pesan tidak valid.' }))
          return
        }

        // ── join ────────────────────────────────────────────────────────────
        if (msg.type === 'join') {
          const roomId = msg.roomId.trim().toUpperCase()
          const room = getRoom(roomId)

          if (!room) {
            ws.send(JSON.stringify({ type: 'error', message: 'Room tidak ditemukan.' }))
            return
          }

          const result = joinRoom(roomId, msg.playerName, msg.isHost, ws)
          if (result.error) {
            ws.send(JSON.stringify({ type: 'error', message: result.error }))
            return
          }

          const player = result.player!
          connectedRoomId = roomId
          connectedPlayerId = player.id

          console.log(`[WS] ${player.name} joined room ${roomId} (host=${player.isHost})`)

          // Confirm to the new player
          sendTo(player, {
            type: 'room_joined',
            roomId,
            playerId: player.id,
            isHost: player.isHost,
          })

          // Broadcast updated player list to everyone
          const players = [...room.players.values()].map(playerPublic)
          broadcast(room, { type: 'players_update', players })
          return
        }

        // All subsequent messages require an established connection
        if (!connectedRoomId || !connectedPlayerId) {
          ws.send(JSON.stringify({ type: 'error', message: 'Kamu belum bergabung ke room.' }))
          return
        }

        // ── start_game ──────────────────────────────────────────────────────
        if (msg.type === 'start_game') {
          const result = startGame(connectedRoomId)
          if (result.error) {
            ws.send(JSON.stringify({ type: 'error', message: result.error }))
          }
          return
        }

        // ── answer ──────────────────────────────────────────────────────────
        if (msg.type === 'answer') {
          const result = handleAnswer(connectedRoomId, connectedPlayerId, msg.answerIndex)
          if (result.error) {
            ws.send(JSON.stringify({ type: 'error', message: result.error }))
          }
          return
        }

        // ── skip_question ───────────────────────────────────────────────────
        if (msg.type === 'skip_question') {
          const result = skipQuestion(connectedRoomId, connectedPlayerId)
          if (result.error) {
            ws.send(JSON.stringify({ type: 'error', message: result.error }))
          }
          return
        }
      },

      onClose(_event, _ws) {
        if (!connectedRoomId || !connectedPlayerId) return

        const room = getRoom(connectedRoomId)
        if (!room) return

        const player = room.players.get(connectedPlayerId)
        const wasHost = player?.isHost ?? false
        const playerName = player?.name ?? 'Pemain'

        removePlayer(connectedRoomId, connectedPlayerId)
        console.log(`[WS] ${playerName} disconnected from room ${connectedRoomId}`)

        if (wasHost) {
          broadcast(room, { type: 'host_disconnected' })
          // Clean up the room entirely when host leaves
          room.players.clear()
        } else {
          // Notify others
          if (room.players.size > 0) {
            broadcast(room, { type: 'player_left', playerName })
            const players = [...room.players.values()].map(playerPublic)
            broadcast(room, { type: 'players_update', players })
            broadcast(room, { type: 'leaderboard', players: getLeaderboard(room) })
          }
        }

        cleanupEmptyRoom(connectedRoomId)
        connectedRoomId = null
        connectedPlayerId = null
      },

      onError(error) {
        console.error('[WS] Error:', error)
      },
    }
  }),
)

// ─── Bun Server Entry ─────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT ?? '3000')
console.log(`
╔═══════════════════════════════════════════════╗
║     知識の戦い  –  Chishiki no Tatakai        ║
║     Server running on http://localhost:${PORT}   ║
╚═══════════════════════════════════════════════╝
`)

export default {
  fetch: app.fetch,
  websocket,
  port: PORT,
}
