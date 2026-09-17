# Perencana Bahan Bakar Pertalite

Aplikasi web satu halaman untuk menghitung kebutuhan pengisian bahan bakar dalam perjalanan darat. Masukkan parameter kendaraan dan perjalanan, dan aplikasi langsung menghitung jarak tempuh, jumlah pengisian yang dibutuhkan, interval pemberhentian, perkiraan biaya, dan waktu tempuh — lengkap dengan peta perjalanan visual, rincian per pemberhentian, serta dukungan bahasa Indonesia/Inggris dan tema gelap/terang.

## Fitur

### Input
- **Jenis bahan bakar** — Pertalite (Rp 10.000), Pertamax (Rp 15.000), Solar (Rp 5.000) per liter
- **Jarak total perjalanan**, **ukuran tangki**, **efisiensi bahan bakar** (number + slider tersinkron)
- **Tingkat bahan bakar saat ini** dalam persen
- **Cadangan bahan bakar aman** yang bisa diatur (0–25%) agar tidak kehabisan di jalan
- **Kecepatan rata-rata** yang bisa diubah untuk estimasi waktu tempuh

### Hasil (real-time)
- Jarak tempuh dengan bahan bakar saat ini
- Jarak aman (dengan mempertahankan cadangan)
- Jumlah pengisian yang dibutuhkan
- Interval pemberhentian (jarak antar pengisian)
- Perkiraan biaya dalam Rupiah (otomatis sesuai jenis bahan bakar)
- Total bahan bakar terpakai
- Estimasi waktu tempuh

### Visualisasi
- Gauge bahan bakar melingkar dengan jarum animasi (hijau → kuning → merah)
- Bar bahan bakar berwarna
- Peta perjalanan dengan ikon pompa ⛽ dan label jarak di titik pemberhentian
- Deretan ikon pompa per bagian perjalanan (Start → Isi #1 → … → Tujuan)
- **Tabel rincian per pemberhentian** — posisi, jumlah bensin diisi, estimasi biaya
- **Banner risiko** — hijau (cukup), oranye (butuh pengisian), merah (di bawah cadangan)

### Lainnya
- **Metrik & Imperial** — beralih antara km/L dan mil/Gallon, semua nilai dikonversi otomatis
- **Bahasa** — Indonesia / English (ID ⇄ EN)
- **Tema** — gelap / terang
- **Simpan & Bagikan** — simpan banyak rencana perjalanan, muat ulang, atau **salin ringkasan** teks untuk dibagikan
- **Persistensi** — input tersimpan otomatis di `localStorage`
- **PWA-lite** — favicon & manifest untuk diinstall dari browser
- **Responsif** — layar HP hingga desktop
- **Aksesibilitas** — HTML semantik, label ARIA, dukungan `prefers-reduced-motion`

## Cara Menjalankan

Tidak perlu build atau instalasi — buka langsung di browser:

```bash
# Opsi 1: buka file langsung
xdg-open index.html

# Opsi 2: lewat server lokal
python3 -m http.server 8080
# lalu buka http://localhost:8080
```

## Cara Menggunakan

1. Isi **Jarak Total Perjalanan** (contoh: 800 km Surabaya–Yogyakarta)
2. Isi **Ukuran Tangki Bahan Bakar** (contoh: 45 liter)
3. Isi **Efisiensi Bahan Bakar** dalam L/100km atau MPG
4. Atur **Tingkat Bahan Bakar Saat Ini** sesuai jarum indikator dashboard
5. Sesuaikan **Cadangan Aman** (misal 10%) dan **Kecepatan Rata-rata**
6. Pilih **jenis bahan bakar** untuk menghitung estimasi biaya
7. Baca hasil di kartu ringkasan, banner risiko, dan peta perjalanan
8. Simpan rencana (**💾**) atau bagikan ringkasan (**📋**) jika perlu

## Cara Menjalankan Test

```bash
node test.js
```

Test memverifikasi logika perhitungan, cadangan aman, konversi satuan, pilihan bahan bakar, pergantian bahasa, penyimpanan/muat rencana, dan persistensi — berjalan tanpa browser menggunakan stub DOM (43 kasus).

## Struktur Proyek

```
road-trip-fuel-stop-planner/
├── index.html      # Struktur halaman
├── styles.css      # Styling & tema (gelap/terang)
├── script.js       # Logika perhitungan & visualisasi
├── test.js         # Pengujian otomatis (Node)
├── favicon.svg     # Ikon aplikasi
└── manifest.json   # Manifest PWA-lite
```

## Cara Menghitung

| Satuan   | Jangkauan tangki penuh          | Konsumsi total            |
|----------|---------------------------------|---------------------------|
| Imperial | `tank × efisiensi(MPG)`         | `jarak ÷ efisiensi(MPG)`  |
| Metrik   | `tank ÷ L/100km × 100`          | `L/100km × jarak ÷ 100`   |

Dengan cadangan bahan bakar aman `r%`:

- Segmen pertama: `(fuel% − r)% × jangkauan tangki penuh`
- Segmen berikutnya: `(100 − r)% × jangkauan tangki penuh`
- Jumlah pengisian: `⌈(jarak − segmen pertama) ÷ segmen berikutnya⌉`

Estimasi biaya: `konsumsi total × harga per liter`.

## Lisensi

Hitungan bersifat estimasi dan hanya untuk referensi. Harga bahan bakar dapat berubah sewaktu-waktu.