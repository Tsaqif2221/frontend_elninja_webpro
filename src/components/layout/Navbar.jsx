import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/katalog', label: 'Katalog' },
  { to: '/peminjaman-saya', label: 'Peminjaman Saya' },
  { to: '/riwayat', label: 'Riwayat' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm">
      <div className="h-16 max-w-7xl mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
              <span className="icon text-[20px]">menu_book</span>
            </span>
            <span className="font-bold text-lg text-primary">Perpustakaan Mini</span>
          </Link>
          <nav className="hidden md:flex gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'bg-primary-container text-white' : 'text-ink-variant hover:text-ink'}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="icon text-[18px]">person</span>
        </div>
      </div>
    </header>
  )
}
