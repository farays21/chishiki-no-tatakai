// ─── User & Session Management ────────────────────────────────────────────────

export interface User {
  id: string
  username: string
  email: string
  passwordHash: string
  createdAt: Date
  totalGamesPlayed: number
  totalScore: number
}

export interface Session {
  token: string
  userId: string
  username: string
  createdAt: Date
  expiresAt: Date
}

// ─── In-Memory Storage (Production: use database) ────────────────────────────

const users = new Map<string, User>()
const sessions = new Map<string, Session>()

// ─── Simple Password Hashing (Production: use bcrypt) ───────────────────────

function hashPassword(password: string): string {
  // Simple hash for demo (NOT SECURE - use bcrypt in production)
  return Buffer.from(password).toString('base64')
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// ─── Token Generation ─────────────────────────────────────────────────────────

function generateToken(): string {
  return Buffer.from(Math.random().toString()).toString('base64').slice(0, 32)
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function register(
  username: string,
  email: string,
  password: string,
): { success: boolean; message: string; userId?: string } {
  // Validation
  if (!username || username.length < 3) {
    return { success: false, message: 'Username minimal 3 karakter' }
  }
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Email tidak valid' }
  }
  if (!password || password.length < 6) {
    return { success: false, message: 'Password minimal 6 karakter' }
  }

  // Check if username/email already exists
  for (const user of users.values()) {
    if (user.username.toLowerCase() === username.toLowerCase()) {
      return { success: false, message: 'Username sudah terdaftar' }
    }
    if (user.email.toLowerCase() === email.toLowerCase()) {
      return { success: false, message: 'Email sudah terdaftar' }
    }
  }

  // Create user
  const userId = generateUserId()
  const user: User = {
    id: userId,
    username,
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date(),
    totalGamesPlayed: 0,
    totalScore: 0,
  }

  users.set(userId, user)
  console.log(`[Auth] User registered: ${username}`)

  return { success: true, message: 'Registrasi berhasil', userId }
}

export function login(
  username: string,
  password: string,
): { success: boolean; message: string; token?: string; username?: string; userId?: string } {
  // Find user
  let user: User | undefined
  for (const u of users.values()) {
    if (u.username.toLowerCase() === username.toLowerCase()) {
      user = u
      break
    }
  }

  if (!user) {
    return { success: false, message: 'Username atau password salah' }
  }

  // Verify password
  if (!verifyPassword(password, user.passwordHash)) {
    return { success: false, message: 'Username atau password salah' }
  }

  // Create session
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  const session: Session = {
    token,
    userId: user.id,
    username: user.username,
    createdAt: new Date(),
    expiresAt,
  }

  sessions.set(token, session)
  console.log(`[Auth] User logged in: ${username}`)

  return { success: true, message: 'Login berhasil', token, username: user.username, userId: user.id }
}

export function verifySession(token: string): { valid: boolean; session?: Session } {
  const session = sessions.get(token)

  if (!session) {
    return { valid: false }
  }

  if (new Date() > session.expiresAt) {
    sessions.delete(token)
    return { valid: false }
  }

  return { valid: true, session }
}

export function logout(token: string): boolean {
  return sessions.delete(token)
}

export function getUser(userId: string): User | undefined {
  return users.get(userId)
}

export function getUserByUsername(username: string): User | undefined {
  for (const user of users.values()) {
    if (user.username.toLowerCase() === username.toLowerCase()) {
      return user
    }
  }
  return undefined
}

export function updateUserStats(userId: string, score: number, increment: boolean = true) {
  const user = users.get(userId)
  if (user) {
    user.totalGamesPlayed += increment ? 1 : 0
    user.totalScore += score
    users.set(userId, user)
  }
}
