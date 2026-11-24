---
name: prd
description: Template dan aturan menulis PRD (dokumen kebutuhan produk) dan spesifikasi modul sebelum menulis kode. Pakai saat memulai project baru, fitur baru, atau modul baru, dan saat pemilik mengambil keputusan yang harus diingat sesi berikutnya.
---

# PRD dan spesifikasi modul

Tulis dulu, baru kode. Dokumen ini adalah kontrak antara pemilik, backend, frontend, dan sesi berikutnya.

## Aturan

- Cek dulu apakah PRD atau spesifikasi modulnya sudah ada. Perbarui, jangan menulis ulang dari nol.
- Satu PRD per project (`docs/prd.md`), satu spesifikasi per modul (`docs/modul/<nama>.md`).
- Tulis keputusan yang tidak terbaca dari kode atau bentuk data: efek samping tersembunyi, aturan khusus, hal yang sengaja ditunda.
- Keputusan pemilik dicatat di bagian **Keputusan**, lengkap dengan tanggalnya. Sesi berikutnya tidak mengusulkan ulang hal yang sudah diputuskan.
- Daftar "belum dikerjakan" ditulis eksplisit, bukan dibiarkan tersirat.
- Konstanta bisnis (harga, paket, nomor rekening, kontak) tidak ditulis di kode. Diatur lewat panel admin atau konfigurasi.
- Perubahan yang mengubah cara pakai ikut memperbarui panduan pengguna.
- Untuk project bertahap, pecah pekerjaan menjadi langkah bernomor (L1, L2, …). Tiap langkah memuat berkas yang disentuh, cara verifikasi, dan kriteria selesai. Satu langkah per sesi, statusnya kotak centang, buktinya ditempel di `VERIFICATION.md` (lihat skill `langkah`).

## Template `docs/prd.md`

```markdown
# <Nama produk>

## Masalah
Siapa yang kesulitan, dalam situasi apa, dan apa akibatnya sekarang.

## Pengguna
- <peran 1>: apa yang ingin dicapai
- <peran 2>: …

## Tujuan
- Ukuran berhasil yang bisa dicek (mis. "pesanan masuk tanpa chat manual").

## Bukan tujuan
- Hal yang sengaja tidak dikerjakan di versi ini.

## Fitur
| Fitur | Untuk siapa | Prioritas (wajib/nanti) |

## Alur utama
1. …

## Data
Entitas utama, field penting, siapa yang boleh melihat dan mengubah.

## Keamanan dan privasi
Data sensitif apa yang disimpan, siapa yang boleh mengakses, apa yang tidak boleh dipublikasikan.

## Teknis
Stack, tempat jalan, layanan luar, batas (RAM, biaya, kuota).

## Keputusan
- YYYY-MM-DD: <keputusan pemilik> (alasan singkat)

## Belum dikerjakan
- …
```

## Template `docs/modul/<nama>.md`

```markdown
# Modul <nama>

## Backend
- Endpoint: METHOD /path, izin yang dibutuhkan, bentuk request dan respons (contoh fiktif)
- Aturan validasi dan aturan bisnis
- Efek samping (mis. menghapus berantai, mengirim email, mengosongkan antrean)

## Frontend
- Halaman dan komponen
- State, filter, dan pagination (lewat URL)
- Teks konfirmasi untuk aksi yang punya efek samping

## Uji
- Cara membuktikan modul bekerja (probe, uji net-zero)

## Belum dikerjakan
- …
```
