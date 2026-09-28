export const topics = [
  { slug: 'jenis-ikan-dosis-tebar', icon: '🐠', title: 'Pemilihan Jenis Ikan & Dosis Tebar', short: 'Pilih benih yang tepat dan hitung kepadatan tebar ideal.',
    intro: 'Keberhasilan budidaya dimulai dari benih. Jenis ikan harus cocok dengan kondisi air, ukuran kolam, dan modal Anda. Kepadatan tebar yang terlalu tinggi memicu stres, penyakit, dan air cepat kotor.',
    facts: [
      ['Lele', 'Tahan kualitas air rendah. Kolam terpal: 100–300 ekor/m³ (intensif).'],
      ['Nila', 'Cepat tumbuh, mudah dipelihara. Kolam tanah: 5–10 ekor/m²; terpal: 50–100 ekor/m³.'],
      ['Patin', 'Bernilai jual tinggi, butuh air lebih bersih. Sekitar 20–50 ekor/m³.'],
      ['Gurame', 'Pertumbuhan lambat tapi harga tinggi. Sekitar 5–10 ekor/m².']
    ],
    tips: ['Beli benih seragam ukurannya dari pembenih terpercaya.', 'Lakukan aklimatisasi 15–30 menit sebelum tebar.', 'Tebar pagi atau sore saat suhu air rendah.', 'Angka di atas hanya acuan umum; sesuaikan dengan sistem dan aerasi Anda.'] },
  { slug: 'pemberian-pakan', icon: '🍤', title: 'Pemberian Pakan yang Tepat', short: 'Jenis, ukuran, frekuensi, dan takaran pakan harian.',
    intro: 'Pakan menyumbang 60–70% biaya produksi. Pakan berlebih tidak membuat ikan lebih cepat besar, tetapi mencemari air dan menurunkan efisiensi (FCR).',
    facts: [
      ['Dosis harian', 'Umumnya 3–5% dari bobot total ikan per hari; lebih rendah untuk ikan besar.'],
      ['Frekuensi', 'Benih 3–4 kali/hari, ikan dewasa 2–3 kali/hari.'],
      ['Ukuran pelet', 'Sesuaikan dengan bukaan mulut ikan agar tidak terbuang.'],
      ['Protein', 'Benih 30–40%, pembesaran 25–30%, sesuai jenis ikan.']
    ],
    tips: ['Beri sedikit demi sedikit sampai ikan berhenti agresif makan.', 'Kurangi pakan saat cuaca ekstrem atau ikan tampak lesu.', 'Simpan pakan di tempat kering agar tidak berjamur.', 'Catat pakan harian untuk menghitung FCR.'] },
  { slug: 'nutrisi-probiotik', icon: '🧪', title: 'Pemberian Nutrisi Tambahan & Probiotik', short: 'Vitamin, mineral, dan probiotik untuk daya tahan dan pencernaan.',
    intro: 'Nutrisi tambahan membantu ikan tumbuh optimal dan tahan penyakit. Probiotik menjaga keseimbangan bakteri baik di usus ikan dan di dalam air.',
    facts: [
      ['Vitamin C', 'Meningkatkan daya tahan saat stres, misalnya setelah panen parsial atau pindah kolam.'],
      ['Probiotik pakan', 'Dicampur pada pakan untuk memperbaiki pencernaan dan menekan FCR.'],
      ['Probiotik air', 'Membantu menguraikan sisa organik dan menekan amonia.'],
      ['Mineral', 'Kalsium dan fosfor mendukung pembentukan tulang dan sisik.']
    ],
    tips: ['Ikuti dosis pada kemasan produk.', 'Campur dengan binder (putih telur/minyak ikan) agar menempel di pelet.', 'Beri rutin 2–3 kali seminggu, bukan sekali banyak.', 'Simpan probiotik cair di tempat sejuk.'] },
  { slug: 'kualitas-air', icon: '💧', title: 'Tips Menjaga Kualitas Air', short: 'pH, oksigen, amonia, suhu, dan cara menjaga air tetap jernih.',
    intro: 'Air adalah rumah ikan. Sebagian besar masalah budidaya berawal dari kualitas air yang menurun. Pantau parameter secara rutin dan ganti air secara terjadwal.',
    facts: [
      ['pH', 'Ideal 6,5–8,5. Ukur pagi dan sore.'],
      ['Oksigen terlarut (DO)', 'Minimal 3–5 mg/L. Gunakan aerator atau kincir bila padat.'],
      ['Amonia (NH₃)', 'Sebaiknya di bawah 0,1 mg/L; tinggi berarti pakan berlebih atau air kotor.'],
      ['Suhu', 'Kisaran 26–32 °C untuk sebagian besar ikan tropis.']
    ],
    tips: ['Ganti 20–30% air secara berkala, lebih sering di kolam padat.', 'Sifon kotoran di dasar kolam.', 'Gunakan tanaman air atau biofilter.', 'Air keruh hijau pekat? Kurangi pakan dan tambah aerasi.'] },
  { slug: 'kesehatan-ikan', icon: '🩺', title: 'Cara Mengecek Kesehatan Ikan', short: 'Kenali tanda ikan sehat, gejala penyakit, dan penanganan awal.',
    intro: 'Deteksi dini mencegah kematian massal. Amati ikan setiap hari saat memberi pakan; perubahan perilaku biasanya muncul sebelum gejala fisik.',
    facts: [
      ['Ikan sehat', 'Gerakan lincah, nafsu makan baik, warna cerah, sirip utuh, mata jernih.'],
      ['Tanda sakit', 'Berenang di permukaan, menggosokkan badan, sirip lengket, bintik putih, luka.'],
      ['Insang', 'Insang sehat berwarna merah segar; pucat atau berlendir tanda masalah.'],
      ['Nafsu makan', 'Penurunan mendadak adalah alarm awal yang paling sering terlihat.']
    ],
    tips: ['Pisahkan ikan sakit di wadah karantina.', 'Cek kualitas air dulu sebelum memberi obat.', 'Jaga kebersihan alat, jangan berbagi jaring antar kolam.', 'Karantina benih baru 7–14 hari.'] }
];
export const bySlug = (s) => topics.find((t) => t.slug === s);
