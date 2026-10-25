import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBook } from '../data/helpers.js'
import Badge from '../components/ui/Badge.jsx'

export default function DetailBuku() {
  const { id } = useParams()
  const book = getBook(id)
  const [modal, setModal] = useState(false)
  const [borrowed, setBorrowed] = useState(false)
  const [wish, setWish] = useState(false)

  if (!book) return <p>Buku tidak ditemukan. <Link to="/katalog" className="text-primary underline">Kembali ke katalog</Link></p>
  const available = book.status === 'Tersedia'
  const specs = [['ISBN', book.isbn], ['Kategori', book.category], ['Jumlah Halaman', `${book.pages} Halaman`], ['Lokasi Fisik', book.location], ['Format', book.format], ['Terbit', book.year]]

  return (
    <>
      <nav className="text-xs font-semibold text-ink-variant mb-6 flex gap-2">
        <Link to="/katalog" className="hover:text-primary">Katalog</Link>/<span className="text-primary">{book.title}</span>
      </nav>
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className={`${book.color} aspect-[3/4.2] rounded-xl p-8 flex flex-col justify-end text-white`}>
            <h2 className="text-3xl font-bold leading-tight">{book.title}</h2>
            <p className="text-on-primary-container">{book.author}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Badge>{book.status}</Badge>
              <span className="text-sm font-bold text-primary">{book.stock.available} / {book.stock.total} Buku</span>
            </div>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary-container" style={{ width: `${(book.stock.available / book.stock.total) * 100}%` }} />
            </div>
            <button disabled={!available || borrowed} onClick={() => setModal(true)}
              className="bg-primary-container hover:bg-primary disabled:bg-tertiary-container disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-lg">
              {borrowed ? 'Permintaan Pinjam Diproses' : available ? 'Pinjam Buku Sekarang' : 'Sedang Dipinjam'}
            </button>
            <button onClick={() => setWish(!wish)} className="bg-surface-low hover:bg-surface-container text-primary text-sm font-semibold py-2.5 rounded-lg">
              {wish ? 'Tersimpan di Wishlist' : 'Tambahkan ke Wishlist'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <p className="text-xs text-ink-variant mb-2">{book.category} • ★ {book.rating} ({book.reviews} Ulasan)</p>
            <h1 className="text-4xl font-extrabold text-primary">{book.title}</h1>
            <p className="text-ink-variant mb-6">Ditulis oleh <strong className="text-ink">{book.author}</strong></p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface-low rounded-xl p-4">
              {specs.map(([k, v]) => (
                <div key={k}><div className="text-[11px] text-ink-variant">{k}</div><div className="text-sm font-semibold">{v}</div></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-3">Sinopsis Buku</h3>
            <p className="text-ink-variant leading-relaxed">{book.synopsis}</p>
          </div>
          <div className="bg-surface-container rounded-xl p-8 grid md:grid-cols-3 gap-4">
            {[['Durasi Peminjaman', 'Maksimal 7 hari kalender sejak tanggal transaksi.'], ['Denda Keterlambatan', 'Rp 1.000 per hari per judul buku.'], ['Lokasi Pengembalian', 'Loket sirkulasi perpustakaan Lantai 1.']].map(([t, d]) => (
              <div key={t} className="bg-white rounded-lg p-4"><h4 className="text-sm font-semibold mb-1">{t}</h4><p className="text-xs text-ink-variant">{d}</p></div>
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
          <div className="bg-white rounded-xl max-w-md w-full p-8 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary">Konfirmasi Pinjam</h3>
            <p className="text-sm text-ink-variant">Anda akan meminjam <strong className="text-ink">{book.title}</strong> selama 7 hari. Ambil di <strong>Rak {book.rack}</strong>.</p>
            <div className="flex gap-2">
              <button onClick={() => setModal(false)} className="flex-1 bg-surface-low py-2.5 rounded-lg text-sm font-semibold">Batal</button>
              <button onClick={() => { setBorrowed(true); setModal(false) }} className="flex-1 bg-primary-container text-white py-2.5 rounded-lg text-sm font-semibold">Ya, Pinjam Sekarang</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
