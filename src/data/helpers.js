import data from './dummyData.json'

export const TODAY = new Date('2026-10-25')
export const getBook = (id) => data.books.find((b) => b.id === id)
export const fmt = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
export const daysLeft = (iso) => Math.ceil((new Date(iso) - TODAY) / 86400000)
export const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')
export default data
