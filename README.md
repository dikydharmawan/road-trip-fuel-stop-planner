# Perencana Bahan Bakar Pertalite

Aplikasi web satu halaman untuk menghitung kebutuhan pengisian bahan bakar dalam perjalanan darat. Masukkan parameter kendaraan dan perjalanan, dan aplikasi langsung menghitung jarak tempuh, jumlah pengisian yang dibutuhkan, serta interval pemberhentian yang disarankan — lengkap dengan peta perjalanan visual.

## Fitur

- **Perhitungan real-time** — hasil diperbarui otomatis saat input diubah
- **Jenis bahan bakar** — Pertalite (Rp 10.000), Pertamax (Rp 15.000), Solar (Rp 5.000) per liter
- **Metrik & Imperial** — beralih antara km/L dan mil/Gallon, semua nilai dikonversi otomatis
- **Visualisasi lengkap**
  - Gauge bahan bakar melingkar dengan jarum animasi
  - Bar bahan bakar berwarna (hijau → kuning → merah)
  - Peta perjalanan dengan ikon pompa ⛽ di titik pemberhentian
  - Deretan ikon pompa per bagian perjalanan
- **Metrik hasil**
  - Jarak tempuh dengan bahan bakar saat ini
  - Jumlah pengisian yang dibutuhkan
  - Interval pemberhentian (jarak antar pengisian)
  - Perkiraan biaya bahan bakar (Rupiah)
  - Total bahan bakar terpakai
  - Estimasi waktu tempuh (80 km/jam / 50 mph)
- **Persistensi** — input tersimpan otomatis di `localStorage`, nilai kembali saat halaman dibuka ulang
- **Responsif** — tampilan menyesuaikan layar HP hingga desktop
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
5. Pilih **jenis bahan bakar** untuk menghitung estimasi biaya
6. Baca hasil di kartu ringkasan dan peta perjalanan

## Cara Menjalankan Test

```bash
node test.js
```

Test memverifikasi logika perhitungan, konversi satuan, pilihan bahan bakar, dan persistensi — berjalan tanpa browser menggunakan stub DOM.

## Struktur Proyek

```
road-trip-fuel-stop-planner/
├── index.html    # Struktur halaman
├── styles.css    # Styling & tema
├── script.js     # Logika perhitungan & visualisasi
└── test.js       # Pengujian otomatis (Node)
```

## Cara Menghitung

| Satuan     | Jarak tempuh saat ini          | Konsumsi total                |
|------------|--------------------------------|-------------------------------|
| Imperial   | `fuel% × tank × efisiensi(MPG)` | `jarak ÷ efisiensi(MPG)`      |
| Metrik     | `fuel% × tank ÷ L/100km × 100`  | `L/100km × jarak ÷ 100`       |

Ditambah estimasi biaya: `konsumsi total × harga per liter`.

## Lisensi

Hitungan bersifat estimasi dan hanya untuk referensi. Harga bahan bakar dapat berubah sewaktu-waktu.