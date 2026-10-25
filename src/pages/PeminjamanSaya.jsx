import { useState } from 'react'
import { Link } from 'react-router-dom'
import data, { getBook, fmt, daysLeft, rupiah } from '../data/helpers.js'

export default function PeminjamanSaya() {
  const [loans, setLoans] = useState(data.transactions.filter((t) => t.status === 'Aktif'))
  const [toast, setToast] = useState('')

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }
  const extend = (t) => {
    setLoans(loans.map((l) => l.id === t.id ? { ...l, dueDate: new Date(new Date(l.dueDate).getTime() + 7 * 86400000).toISOString().slice(0, 10) } : l))
    notify(`Perpanjangan ${getBook(t.bookId).title} berhasil!`)
  }
  const giveBack = (t) => {
    setLoans(loans.filter((l) => l.id !== t.id))
    notify(`Pengajuan pengembalian ${getBook(t.bookId).title} telah dikirim ke petugas.`)
  }
  const next = loans.map((l) => l.dueDate).sort()[0]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Peminjaman Saya</h1>
          <p className="text-ink-variant">Daftar buku yang sedang kamu pinjam dan batas waktu pengembaliannya.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="bg-white rounded-lg px-4 py-2 shadow-sm">{loans.length} Buku Sedang Dipinjam</span>
          <span className="bg-white rounded-lg px-4 py-2 shadow-sm">0 Terlambat</span>
          {next && <span className="bg-primary-container text-white rounded-lg px-4 py-2 shadow-sm">Batas Berikutnya: {fmt(next)}</span>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-low text-ink-variant text-xs">
            <tr>{['Judul Buku', 'Tanggal Pinjam', 'Batas Pengembalian', 'Sisa Waktu', 'Denda', 'Aksi'].map((h) => <th key={h} className="p-4">{h}</th>)}</tr>
          </thead>
          <tbody>
            {loans.map((t) => {
              const b = getBook(t.bookId)
              return (
                <tr key={t.id} className="border-t border-surface-container">
                  <td className="p-4 min-w-[260px]">
                    <div className="flex items-center gap-4">
                      <div className={`${b.color} w-12 h-16 rounded-md shrink-0`} />
                      <div><div className="font-bold">{b.title}</div><div className="text-xs text-ink-variant">{b.author}</div><div className="text-[11px] text-outline">ID: {b.id}</div></div>
                    </div>
                  </td>
                  <td className="p-4 text-ink-variant">{fmt(t.borrowDate)}</td>
                  <td className="p-4 font-semibold">{fmt(t.dueDate)}</td>
                  <td className="p-4"><span className="bg-primary-fixed text-primary text-xs font-semibold px-3 py-1 rounded-full">{daysLeft(t.dueDate)} hari lagi</span></td>
                  <td className="p-4 font-semibold">{rupiah(t.fine)}</td>
                  <td className="p-4"><div className="flex gap-1 justify-end">
                    <button onClick={() => extend(t)} className="px-4 py-2 bg-surface-container hover:bg-surface-high rounded-lg text-xs font-semibold">Perpanjang</button>
                    <button onClick={() => giveBack(t)} className="px-4 py-2 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-semibold">Ajukan Pengembalian</button>
                  </div></td>
                </tr>
              )
            })}
            {!loans.length && <tr><td colSpan="6" className="p-10 text-center text-ink-variant">Tidak ada pinjaman aktif. <Link to="/katalog" className="text-primary underline">Pinjam buku</Link></td></tr>}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h4 className="font-semibold">Informasi Pengembalian</h4>
          <p className="text-sm text-ink-variant">Buku dapat dikembalikan ke drop-box perpustakaan atau loket petugas sebelum pukul 17:00 WIB.</p>
        </div>
        <Link to="/katalog" className="text-primary font-semibold text-sm">Pinjam buku lainnya</Link>
      </div>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-primary text-white text-sm font-semibold rounded-lg shadow-xl px-4 py-2">{toast}</div>}
    </div>
  )
}
