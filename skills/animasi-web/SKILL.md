---
name: animasi-web
description: Aturan gerak antarmuka web (durasi, easing, keadaan, reduced-motion, GSAP) agar animasi terasa cepat dan tidak berlebihan. Pakai saat menambah transisi, hover, animasi masuk, animasi saat gulir, atau pustaka animasi di situs atau aplikasi.
---

# Animasi web

Gerak di antarmuka membantu orang memahami perubahan. Bukan hiasan. Untuk video yang dirender dari kode, lihat skill `animasi-video`.

## Durasi

| Jenis | Durasi |
|---|---|
| Gerak kecil (hover, tekan, centang) | 100–150 ms |
| Transisi komponen (buka menu, drawer, tab) | 200–300 ms |
| Pindah halaman atau tampilan besar | 300–500 ms |

Tidak ada gerak UI di atas 500 ms.

## Easing dan bentuk

- Masuk memakai ease-out. Keluar memakai ease-in dan lebih pendek dari masuknya.
- Jangan menyusut sampai skala 0. Paling kecil 0,95, digabung dengan opacity.
- Animasikan hanya `transform` dan `opacity`. Jangan `width`, `height`, `top`, `left`, atau `margin` (memicu tata letak ulang dan patah-patah di HP).
- Satu gerak khas per halaman (lihat "tesis gerak" di skill `design`). Sisanya tenang.

## Reduced motion

- `prefers-reduced-motion: reduce` benar-benar dihormati: gerak pindah dan gulir dimatikan, cukup ganti opacity atau langsung tampil.
- Konten tidak boleh bergantung pada animasi untuk terlihat. Tanpa JavaScript atau dengan gerak dimatikan, semua isi tetap tampil.

## GSAP

- Boleh dipakai bila CSS tidak cukup: `ScrollTrigger` untuk gerak saat gulir, `timeline` untuk urutan, `gsap.matchMedia()` untuk memisahkan perilaku reduced-motion dan ukuran layar.
- Muat dari CDN dengan versi pasti dan hash SRI, atau bundel lewat build.
- Bersihkan instance saat komponen dilepas (`ctx.revert()`), terutama di aplikasi satu halaman.

## Cek sebelum selesai

1. Gerak terasa cepat di HP kelas menengah (uji dengan CPU throttling 4x).
2. Dengan reduced-motion aktif, tidak ada yang bergeser dan semua isi tampil.
3. Tidak ada pergeseran tata letak (CLS) akibat animasi masuk.
