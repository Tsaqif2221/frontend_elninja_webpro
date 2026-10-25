import { Link } from 'react-router-dom'
import Badge from './Badge.jsx'

export default function BookCard({ book, compact = false }) {
  return (
    <article className="flex flex-col bg-white rounded-xl p-4 shadow-sm">
      <div className={`${book.color} w-full aspect-[4/5] rounded-lg p-4 flex flex-col justify-end text-white mb-4`}>
        <h3 className="font-bold text-lg leading-tight line-clamp-2">{book.title}</h3>
      </div>
      <div className="flex justify-between gap-2 mb-1">
        <span className="text-xs font-semibold truncate">{book.author}</span>
        {!compact && <span className="text-[11px] text-outline shrink-0">Rak: {book.rack}</span>}
      </div>
      {!compact && <p className="text-xs text-ink-variant mb-2">Kategori: {book.category}</p>}
      <div className="mb-4"><Badge>{book.status}</Badge></div>
      <Link to={`/buku/${book.id}`}
        className="mt-auto bg-primary hover:bg-primary-container text-white text-xs font-semibold py-2 rounded-lg text-center transition-colors">
        {compact ? 'Lihat detail' : 'Detail'}
      </Link>
    </article>
  )
}
