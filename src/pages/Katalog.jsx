import { useState } from 'react'
import data from '../data/helpers.js'
import BookCard from '../components/ui/BookCard.jsx'

const categories = [['all', 'Semua Kategori'], ['teknologi', 'Teknologi & IT'], ['sastra', 'Sastra & Novel'], ['sains', 'Sains & Matematika']]
const statuses = [['all', 'Semua Status'], ['Tersedia', 'Hanya Tersedia'], ['Dipinjam', 'Sedang Dipinjam']]

const Chip = ({ active, onClick, children }) => (
  <button onClick={onClick} type="button"
    className={`px-4 py-1 rounded-full text-xs font-semibold transition-colors ${active ? 'bg-primary text-white' : 'bg-white text-ink-variant hover:text-ink'}`}>
    {children}
  </button>
)

export default function Katalog() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [status, setStatus] = useState('all')

  const books = data.books.filter((b) =>
    (b.title + b.author + b.isbn).toLowerCase().includes(query.toLowerCase()) &&
    (cat === 'all' || b.filter === cat) && (status === 'all' || b.status === status))

  return (
    <>
      <section className="bg-surface-low rounded-xl px-5 py-10 mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Katalog Perpustakaan</h1>
        <p className="text-ink-variant mb-6">Temukan koleksi buku fisik dan e-book yang siap dipinjam.</p>
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul buku, penulis, atau ISBN..."
          className="w-full max-w-2xl bg-white rounded-xl px-5 py-3 text-sm outline-none shadow-sm mb-6" />
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {categories.map(([v, l]) => <Chip key={v} active={cat === v} onClick={() => setCat(v)}>{l}</Chip>)}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {statuses.map(([v, l]) => <Chip key={v} active={status === v} onClick={() => setStatus(v)}>{l}</Chip>)}
        </div>
      </section>

      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-bold">Daftar Buku</h2>
        <span className="text-xs font-semibold text-primary bg-primary-fixed px-3 py-0.5 rounded-full">{books.length} Buku Ditampilkan</span>
      </div>

      {books.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {books.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-10 text-center">
          <h3 className="font-bold text-lg mb-1">Buku Tidak Ditemukan</h3>
          <p className="text-ink-variant">Coba kata kunci lain atau reset filter.</p>
        </div>
      )}
    </>
  )
}
