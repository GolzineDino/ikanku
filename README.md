# 🐟 Ikan.ku – Forum Tanya Jawab Budidaya Ikan

SvelteKit + Supabase (Auth, Database, Storage) + Vercel.

## 1. Siapkan Supabase
1. Buat proyek di https://supabase.com.
2. Buka **SQL Editor** → tempel seluruh isi `supabase/schema.sql` → **Run**. Ini membuat tabel `questions`, `answers`, aturan keamanan (RLS), dan bucket foto `question-images`.
3. **Authentication → Providers → Email**: aktif. Untuk uji cepat, matikan *Confirm email* (atau biarkan aktif dan konfirmasi lewat email).
4. **Project Settings → API**: salin **Project URL** dan **anon public key**.
5. **Authentication → URL Configuration**: isi *Site URL* dengan alamat Vercel Anda setelah deploy (mis. `https://ikanku.vercel.app`).

## 2. Jalankan lokal (opsional)
```bash
npm install
cp .env.example .env   # isi PUBLIC_SUPABASE_URL dan PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## 3. Deploy ke Vercel
**Lewat GitHub (disarankan)**
1. Ekstrak zip, upload isinya ke repository GitHub baru (jangan upload `.env`).
2. Di https://vercel.com → **Add New → Project** → pilih repository. Framework terdeteksi otomatis sebagai **SvelteKit**.
3. Buka **Environment Variables**, tambahkan:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
4. Klik **Deploy**.

**Lewat Vercel CLI**
```bash
npm i -g vercel
vercel        # ikuti petunjuk, lalu tambahkan env di dashboard
vercel --prod
```
Setelah env ditambahkan/diubah, lakukan **Redeploy**.

## Struktur
- `src/routes/` – halaman (beranda, forum per topik, detail pertanyaan, login)
- `src/lib/topics.js` – isi informasi tiap forum (ubah sesuai kebutuhan)
- `src/lib/photos.js` – foto dekorasi (URL Unsplash; ganti dengan foto sendiri di `static/`)
- `supabase/schema.sql` – database, RLS, storage

## Catatan
- Hanya pemilik yang dapat menghapus pertanyaan/jawabannya (dijaga oleh RLS).
- Foto pertanyaan opsional, maksimal 5 MB.
- Angka dosis di panduan adalah acuan umum; sesuaikan dengan kondisi lapangan.
