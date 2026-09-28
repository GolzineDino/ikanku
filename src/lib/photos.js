// Foto bertema laut/ikan (Unsplash). Ganti dengan foto Anda sendiri di folder static/ bila perlu.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;
export const photos = [
  { src: u('photo-1524704654690-b56c05c78a00'), cap: 'Kolam budidaya' },
  { src: u('photo-1522069169874-c58ec4b76be5'), cap: 'Ikan hias berwarna' },
  { src: u('photo-1544551763-46a013bb70d5'), cap: 'Kehidupan bawah laut' },
  { src: u('photo-1520302630591-fd1c66edc19d'), cap: 'Air jernih, ikan sehat' }
];
