import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import data, { getBook, fmt, daysLeft } from '../data/helpers.js'
import BookCard from '../components/ui/BookCard.jsx'

const Section = ({ title, to, link, children }) => (
  <section className="mb-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {to && <Link to={to} className="text-sm font-semibold text-primary hover:underline">{link}</Link>}
    </div>
    {children}
  </section>
)

export default function Beranda() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [registered, setRegistered] = useState(false)
  const loans = data.transactions.filter((t) => t.status === 'Aktif')
  const newest = data.books.slice(0, 4)
  const popular = [data.books[4], data.books[1], data.books[5], data.books[6]]

  return (
    <>
      <section className="bg-surface-low rounded-xl px-8 py-10 mb-10 shadow-sm">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">Halo, Pengguna!<br />Mau baca apa hari ini?</h1>
        <p className="text-ink-variant max-w-xl mb-6">Telusuri koleksi perpustakaan, pinjam dari rumah, dan ambil bukunya kapan saja.</p>
        <form onSubmit={(e) => { e.preventDefault(); navigate('/katalog') }}
          className="bg-white rounded-xl p-1.5 flex max-w-lg shadow-sm">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari judul, penulis, atau kategori..."
            className="flex-1 px-3 outline-none text-sm bg-transparent" />
          <button className="bg-primary hover:bg-primary-container text-white text-sm font-semibold px-6 py-2 rounded-lg">Cari buku</button>
        </form>
      </section>

      <Section title="Sedang kamu pinjam" to="/peminjaman-saya" link={`${loans.length} Buku Aktif`}>
        <div className="grid md:grid-cols-2 gap-4">
          {loans.map((t) => {
            const b = getBook(t.bookId)
            return (
              <div key={t.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                <div className={`${b.color} w-12 h-16 rounded-md shrink-0`} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{b.title}</h3>
                  <p className="text-xs text-ink-variant">Kembali {fmt(t.dueDate)} • sisa {daysLeft(t.dueDate)} hari</p>
                </div>
                <Link to="/peminjaman-saya" className="text-primary text-xs font-semibold bg-surface px-4 py-2 rounded-lg">Kelola</Link>
              </div>
            )
          })}
        </div>
      </Section>

      <Section title="Buku terbaru" to="/katalog" link="Lihat semua buku">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{newest.map((b) => <BookCard key={b.id} book={b} compact />)}</div>
      </Section>

      <Section title="Paling sering dipinjam" to="/katalog" link="Lihat peringkat">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{popular.map((b) => <BookCard key={b.id} book={b} compact />)}</div>
      </Section>

      <section className="bg-primary-container text-white rounded-xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Baca & Temui Penulis</h2>
          <p className="text-on-primary-container mb-3">Diskusi langsung bersama Raka Pratama tentang proses menulis “Bumi dan Bintang”, lalu sesi tanda tangan buku.</p>
          <p className="text-secondary-fixed text-xs font-semibold">Sabtu, 7 November 2026 • 14.00 WIB • Ruang Baca Utama • 42 dari 60 kursi terisi</p>
        </div>
        <button disabled={registered} onClick={() => setRegistered(true)}
          className="bg-secondary-container hover:bg-secondary disabled:bg-primary text-ink text-sm font-semibold px-8 py-2.5 rounded-lg">
          {registered ? 'Terdaftar ✓' : 'Daftar event'}
        </button>
      </section>
    </>
  )
}
