import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Beranda from './pages/Beranda.jsx'
import Katalog from './pages/Katalog.jsx'
import DetailBuku from './pages/DetailBuku.jsx'
import PeminjamanSaya from './pages/PeminjamanSaya.jsx'
import Riwayat from './pages/Riwayat.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-5 pt-20 pb-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/buku/:id" element={<DetailBuku />} />
          <Route path="/peminjaman-saya" element={<PeminjamanSaya />} />
          <Route path="/riwayat" element={<Riwayat />} />
        </Routes>
      </main>
    </>
  )
}
