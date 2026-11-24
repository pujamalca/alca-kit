---
name: animasi-video
description: Cara membuat video atau animasi dari kode (Canvas/HTML/Three.js) yang dirender deterministik ke MP4 lewat headless browser dan ffmpeg. Pakai saat membuat video promosi, konten pendek 9:16, motion graphic, atau animasi yang harus menghasilkan berkas video, bukan editor video manual.
---

# Animasi video dari kode

Video diperlakukan seperti program: setiap frame dihitung dari waktu, sehingga hasil render selalu sama dan bisa diperiksa.

## Prinsip inti

1. **Frame adalah fungsi murni dari waktu `t`.** `render(t)` menggambar seluruh frame hanya dari `t`. Lompat ke detik mana pun, hasilnya identik.
2. **Dilarang sumber waktu dan acak dari luar:** `requestAnimationFrame`, `setTimeout`, `setInterval`, `Date.now()`, `performance.now()`, `Math.random()`.
3. **Acak memakai PRNG ber-seed** (mis. mulberry32) per elemen, dibuat ulang tiap frame dari seed yang sama.
4. **Tidak ada state yang menumpuk antar frame.** Posisi partikel, skor, atau jejak dihitung ulang dari `t` (pakai rumus atau simulasi yang diputar ulang dari 0 secara deterministik).
5. **Satu sumber kebenaran:**
   - `timeline.js`: timing, teks, posisi, dan efek suara.
   - `tokens.js`: warna, huruf, ukuran dasar.
6. **Efek suara menempel pada gerakannya** di timeline (mis. `{ t: 2.4, gerak: 'logo-masuk', sfx: 'whoosh' }`), bukan di daftar terpisah yang bisa bergeser.

## Render

- Frame diambil dari canvas lewat headless browser (Puppeteer/Playwright): set `t`, panggil `render(t)`, ambil piksel, kirim ke ffmpeg lewat pipe. Bukan perekaman layar.
- Semua huruf dan aset lokal, dan sudah termuat (`document.fonts.ready`, gambar `decode()`) sebelum frame pertama.
- Contoh pipe ffmpeg (30 fps, H.264, cocok untuk media sosial):

```bash
ffmpeg -y -f image2pipe -framerate 30 -i - \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart keluar.mp4
```

- Audio (suara, efek, musik) dicampur sesudahnya dari timeline yang sama, dengan urutan prioritas: suara > efek > musik.

## Uji determinisme

Sebelum render final:
1. Render beberapa frame secara maju, mundur, dan acak.
2. Bandingkan hash piksel tiap frame yang sama. Harus identik.
3. Kalau berbeda, cari state yang menumpuk atau sumber waktu/acak terlarang.

## Ukuran dan format

- Koordinat dalam persen safe area; ukuran dalam px referensi 1080×1920 (9:16), lalu diskalakan per format (1:1, 16:9).
- Hormati safe zone platform: hindari sepertiga bawah dan tepi kanan yang tertutup tombol aplikasi.
- Tulisan di layar minimal setara 21 px pada referensi 1080 lebar. Letaknya diukur alat, bukan dikira-kira.
- Subtitle di bawah, tanpa kartu latar tebal.

## Pratinjau dan pengiriman

- Draf untuk klien diberi tanda air (nama studio + kode pesanan).
- Video final tanpa tanda air hanya diberikan setelah pembayaran dikonfirmasi.
- Periksa sendiri still dari beberapa detik (terpotong, kontras, tumpang tindih) sebelum ditunjukkan.
- Musik: untuk YouTube pakai lisensi CC0. CC BY wajib atribusi dan masih bisa terkena klaim Content ID. Jangan menyalin lagu dari video contoh.
- Alur persetujuan lihat skill `alur-persetujuan`.

## Rahasia lokal

Aset klien, rekaman suara, model suara, dan isi folder studio tidak masuk repo publik. Simpan di folder yang ada di `.gitignore`.
