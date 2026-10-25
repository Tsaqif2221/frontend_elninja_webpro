import { useState } from 'react'
import data, { getBook, fmt, rupiah } from '../data/helpers.js'
import Badge from '../components/ui/Badge.jsx'

export default function Riwayat() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('semua')

  const done = data.transactions.filter((t) => t.status === 'Selesai')
  const onTime = done.filter((t) => t.fine === 0)
  const rows = done.filter((t) => {
    const b = getBook(t.bookId)
    const okFilter = filter === 'semua' || (filter === 'tepat' ? t.fine === 0 : t.fine > 0)
    return okFilter && (b.title + b.author + t.id).toLowerCase().includes(query.toLowerCase())
  })
  const pills = [['semua', `Semua (${done.length})`], ['tepat', `Tepat Waktu (${onTime.length})`], ['denda', `Denda Diselesaikan (${done.length - onTime.length})`]]

  return (
    <div className="space-y-6">
      <div className="bg-surface-low rounded-xl p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Riwayat Peminjaman</h1>
          <p className="text-ink-variant">Histori buku yang pernah kamu pinjam dan kembalikan.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm"><div className="text-[11px] text-ink-variant">Total Selesai</div><div className="font-bold text-primary">{done.length} Buku</div></div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm"><div className="text-[11px] text-ink-variant">Tepat Waktu</div><div className="font-bold text-primary">{Math.round((onTime.length / done.length) * 1000) / 10}%</div></div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {pills.map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`px-4 py-2 rounded-full text-xs font-semibold ${filter === v ? 'bg-primary-container text-white' : 'bg-surface-low text-ink-variant'}`}>{l}</button>
          ))}
        </div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari riwayat buku..."
          className="bg-surface-low rounded-lg px-4 py-2 text-sm outline-none lg:w-80" />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-low text-xs text-ink-variant">
            <tr>{['Kode Pinjam', 'Judul Buku & Penulis', 'Tgl Pinjam', 'Tgl Kembali', 'Status', 'Rating / Ulasan'].map((h) => <th key={h} className="p-4 whitespace-nowrap">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((t) => {
              const b = getBook(t.bookId)
              return (
                <tr key={t.id} className="border-t border-surface-container">
                  <td className="p-4 font-mono text-xs text-tertiary whitespace-nowrap">{t.id}</td>
                  <td className="p-4 min-w-[220px]"><div className="flex items-center gap-3">
                    <div className={`${b.color} w-10 h-14 rounded-md shrink-0`} />
                    <div><div className="font-bold">{b.title}</div><div className="text-xs text-ink-variant">{b.author}</div></div>
                  </div></td>
                  <td className="p-4 text-ink-variant whitespace-nowrap">{fmt(t.borrowDate)}</td>
                  <td className="p-4 whitespace-nowrap">{fmt(t.returnDate)}</td>
                  <td className="p-4 whitespace-nowrap">
                    {t.fine === 0 ? <Badge variant="Tepat Waktu">Tepat Waktu</Badge>
                      : <Badge variant="Terlambat">Terlambat 1 Hari (Denda {rupiah(t.fine)} - Lunas)</Badge>}
                  </td>
                  <td className="p-4"><div className="text-secondary-container">{'★'.repeat(t.rating)}<span className="text-outline-variant">{'★'.repeat(5 - t.rating)}</span></div>
                    <div className="text-xs italic text-ink-variant">"{t.review}"</div></td>
                </tr>
              )
            })}
            {!rows.length && <tr><td colSpan="6" className="p-10 text-center text-ink-variant">Tidak ada riwayat yang cocok.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
