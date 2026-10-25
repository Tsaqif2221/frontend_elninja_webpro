const styles = {
  Tersedia: 'bg-primary-fixed text-primary',
  Dipinjam: 'bg-secondary-fixed text-secondary',
  'Tepat Waktu': 'bg-[#def7ec] text-[#03543f]',
  Terlambat: 'bg-[#fef3c7] text-[#92400e]',
}
export default function Badge({ children, variant }) {
  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${styles[variant || children] || 'bg-surface-container'}`}>
      {children}
    </span>
  )
}
