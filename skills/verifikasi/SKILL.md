---
name: verifikasi
description: Cara membuktikan pekerjaan benar-benar selesai sebelum melapor. Pakai sebelum mengatakan "selesai", "sudah jalan", "sudah sinkron", atau sebelum rilis, dan saat menulis uji end-to-end yang menulis data.
---

# Verifikasi

## Prinsip

- Bukti, bukan keyakinan. `tsc`, lint, atau build yang lolos bukan bukti fitur bekerja. Buka halamannya, panggil endpoint-nya, lihat hasilnya.
- Setelah mengubah tampilan (view, template, CSS), render halaman yang terdampak, bukan hanya halaman daftarnya.
- Uji di ukuran HP dan desktop. Cek overflow horizontal dan galat di console browser.
- Angka status di dokumen cepat basi. Sumber kebenaran adalah skrip dan keluaran nyata.
- Pemeriksa yang bisa gagal diam-diam (skrip pencari, filter, audit) butuh uji-sendiri yang membuktikan ia masih bisa gagal. Contoh nyata: `grep --include` yang tidak cocok membuat skrip memproses daftar kosong dan melapor "aman".

## Audit dua lapis

- Lapis modul: tiap modul punya berkas yang seharusnya (tipe, aksi, halaman).
- Lapis endpoint: tiap route backend punya pemanggil di frontend, dan sebaliknya.
- Satu lapis saja punya titik buta.
- Audit bentuk respons di runtime: tipe yang benar belum menjamin bentuk data sama (array vs objek berpaginasi menghasilkan "daftar kosong senyap"). Uji dengan probe langsung ke backend.
- Pencocokan path memakai batas kata: pencocokan substring membuat `/set` dianggap tertutup oleh `/setting`.
- Dispatcher dinamis bisa menutupi celah. Verifikasi nama literalnya.

## Uji yang menulis data (net-zero)

- Setiap uji membuat lalu menghapus datanya sendiri. Hasil akhirnya bersih.
- Pakai penanda (tanggal, kode, prefix `UJI-`) yang tidak mungkin bentrok dengan data nyata.
- Pagar bawaan: uji keluar sendiri bila nama database atau URL cocok dengan daftar produksi.
- Bila terpaksa mengubah baris nyata saat menguji, catat nilai aslinya dulu.
- Tabel audit yang tidak boleh dihapus dicatat sebagai pengecualian.
- Uji yang sengaja memicu lockout atau rate limit dikecualikan dari sapuan default.

## Laporan

Tulis apa yang dicek dan hasilnya, misalnya:

```
/            200   (HP 390px, desktop 1280px, 0 galat console)
/admin       302 → login
POST /api    tanpa token 401
tes          312 lulus, 0 gagal
belum dicek  pembayaran sungguhan (butuh akun pemilik)
```

Langkah yang butuh dunia nyata (uang sungguhan, nomor HP, akun pihak ketiga) dibiarkan tidak dicentang, dengan alasan yang jelas.
