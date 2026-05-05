import type { Question } from "./types";

export const questionBank: Question[] = [
  // ── Geografi ─────────────────────────────────────────────────────────────
  {
    id: 1,
    question: "Apa ibu kota negara Jepang?",
    options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"],
    correctIndex: 2,
    category: "🌏 Geografi",
  },
  {
    id: 2,
    question: "Sungai terpanjang di dunia adalah…",
    options: ["Amazon", "Nil", "Yangtze", "Mississippi"],
    correctIndex: 1,
    category: "🌏 Geografi",
  },
  {
    id: 3,
    question: "Gunung tertinggi di dunia adalah…",
    options: ["K2", "Kangchenjunga", "Everest", "Lhotse"],
    correctIndex: 2,
    category: "🌏 Geografi",
  },
  {
    id: 4,
    question: "Negara manakah yang memiliki garis pantai terpanjang di dunia?",
    options: ["Indonesia", "Australia", "Kanada", "Rusia"],
    correctIndex: 2,
    category: "🌏 Geografi",
  },
  {
    id: 5,
    question: 'Benua manakah yang dikenal sebagai "Benua Hitam"?',
    options: ["Asia", "Amerika", "Afrika", "Australia"],
    correctIndex: 2,
    category: "🌏 Geografi",
  },
  // ── Sains ────────────────────────────────────────────────────────────────
  {
    id: 6,
    question: 'Unsur kimia dengan simbol "Au" adalah…',
    options: ["Perak", "Emas", "Aluminium", "Tembaga"],
    correctIndex: 1,
    category: "🔬 Sains",
  },
  {
    id: 7,
    question: "Berapa kecepatan cahaya dalam vakum (km/s)?",
    options: ["150.000", "300.000", "450.000", "600.000"],
    correctIndex: 1,
    category: "🔬 Sains",
  },
  {
    id: 8,
    question: "Planet terbesar di tata surya kita adalah…",
    options: ["Saturnus", "Neptunus", "Jupiter", "Uranus"],
    correctIndex: 2,
    category: "🔬 Sains",
  },
  {
    id: 9,
    question: "DNA merupakan singkatan dari…",
    options: [
      "Deoxyribonucleic Acid",
      "Dinitrogen Acid",
      "Dynamic Nuclear Atom",
      "Dense Nucleotide Array",
    ],
    correctIndex: 0,
    category: "🔬 Sains",
  },
  {
    id: 10,
    question: "Siapakah ilmuwan yang merumuskan Hukum Gravitasi Universal?",
    options: [
      "Albert Einstein",
      "Galileo Galilei",
      "Isaac Newton",
      "Nikola Tesla",
    ],
    correctIndex: 2,
    category: "🔬 Sains",
  },
  // ── Sejarah ─────────────────────────────────────────────────────────────
  {
    id: 11,
    question: "Pada tahun berapa Indonesia merdeka?",
    options: ["1942", "1944", "1945", "1946"],
    correctIndex: 2,
    category: "📜 Sejarah",
  },
  {
    id: 12,
    question: "Siapakah proklamator kemerdekaan Indonesia?",
    options: [
      "Soeharto & Hamengkubuwono",
      "Soekarno & Hatta",
      "Syahrir & Yamin",
      "Sudirman & Nasution",
    ],
    correctIndex: 1,
    category: "📜 Sejarah",
  },
  {
    id: 13,
    question: "Perang Dunia II berakhir pada tahun…",
    options: ["1943", "1944", "1945", "1946"],
    correctIndex: 2,
    category: "📜 Sejarah",
  },
  {
    id: 14,
    question: "Tembok Berlin diruntuhkan pada tahun…",
    options: ["1985", "1987", "1989", "1991"],
    correctIndex: 2,
    category: "📜 Sejarah",
  },
  {
    id: 15,
    question: "Dinasti manakah yang membangun Tembok Besar China?",
    options: ["Tang", "Song", "Qin", "Han"],
    correctIndex: 2,
    category: "📜 Sejarah",
  },
  // ── Budaya & Seni ────────────────────────────────────────────────────────
  {
    id: 16,
    question: 'Siapakah pelukis terkenal yang menciptakan karya "Mona Lisa"?',
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Caravaggio"],
    correctIndex: 2,
    category: "🎨 Budaya & Seni",
  },
  {
    id: 17,
    question:
      "Alat musik tradisional Indonesia yang dimainkan dengan cara dipukul adalah…",
    options: ["Angklung", "Gamelan", "Kolintang", "Saluang"],
    correctIndex: 1,
    category: "🎨 Budaya & Seni",
  },
  {
    id: 18,
    question: 'Siapakah penulis novel "Harry Potter"?',
    options: [
      "Stephenie Meyer",
      "J.R.R. Tolkien",
      "J.K. Rowling",
      "C.S. Lewis",
    ],
    correctIndex: 2,
    category: "🎨 Budaya & Seni",
  },
  // ── Teknologi ────────────────────────────────────────────────────────────
  {
    id: 19,
    question: "Siapakah pendiri perusahaan Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
    correctIndex: 1,
    category: "💻 Teknologi",
  },
  {
    id: 20,
    question: 'Kepanjangan dari "HTTP" dalam konteks web adalah…',
    options: [
      "HyperText Transfer Protocol",
      "High Technology Transfer Process",
      "Hyperlink Text Transmission Protocol",
      "HyperText Transmission Program",
    ],
    correctIndex: 0,
    category: "💻 Teknologi",
  },
  {
    id: 21,
    question: "Satuan penyimpanan data terbesar dari daftar berikut adalah…",
    options: ["Gigabyte", "Terabyte", "Kilobyte", "Megabyte"],
    correctIndex: 1,
    category: "💻 Teknologi",
  },
  {
    id: 22,
    question:
      "Bahasa pemrograman yang dikembangkan oleh Brendan Eich pada 1995 adalah…",
    options: ["Python", "Java", "JavaScript", "PHP"],
    correctIndex: 2,
    category: "💻 Teknologi",
  },
  // ── Olahraga ─────────────────────────────────────────────────────────────
  {
    id: 23,
    question:
      'Cabang olahraga manakah yang menggunakan istilah "love" untuk angka nol?',
    options: ["Bulu Tangkis", "Tenis", "Squash", "Ping Pong"],
    correctIndex: 1,
    category: "⚽ Olahraga",
  },
  {
    id: 24,
    question: "Olimpiade modern pertama kali diadakan di negara mana?",
    options: ["Inggris", "Prancis", "Yunani", "Amerika Serikat"],
    correctIndex: 2,
    category: "⚽ Olahraga",
  },
  {
    id: 25,
    question:
      "Jumlah pemain dalam satu tim sepak bola (termasuk penjaga gawang) adalah…",
    options: ["9", "10", "11", "12"],
    correctIndex: 2,
    category: "⚽ Olahraga",
  },
  {
    id: 26,
    question: "Bika Ambon adalah makanan khas dari daerah mana?",
    options: ["Samarinda", "Medan", "Ambon", "Gorontalo"],
    correctIndex: 2,
    category: "🍨 Kuliner",
  },
  {
    id: 27,
    question: "Berikut ini yang bukan termasuk Wakil Presiden Soeharto adalah...",
    options: ["Sri Sultan Hamengkubowono IX", "Try Sutrisno", "Prof. Dr.- Ing Bacharuddin Jusuf Habibie", "Hamzah Haz"],
    correctIndex: 3,
    category: "📜 Sejarah",
  },
];

/** Returns `count` questions chosen randomly from the bank (no duplicates). */
export function pickRandomQuestions(count: number): Question[] {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
