---
name: rahasia-privasi
description: Aturan menjaga rahasia (token, kunci, sandi) dan data pribadi (pasien, klien, pengguna). Pakai di setiap project, dan wajib saat menyentuh .env, kredensial, database klien, log, atau saat akan mengirim data ke layanan luar.
---

# Rahasia dan privasi

## Rahasia (token, kunci API, sandi)

- Rahasia tidak pernah dikirim atau ditampilkan lewat chat. Pemilik mengisinya sendiri di `.env` atau berkas rahasia; asisten cukup memverifikasi "terisi, panjang N, diawali X".
- Kunci yang terlihat di log atau keluaran perintah jangan diulang di jawaban.
- Rahasia disimpan di berkas mode `600` (atau `640` dengan grup aplikasi), di luar folder publik, tidak di-commit. Jangan pernah di kode frontend atau bundle browser.
- Jangan menaruh rahasia di URL remote git, di argumen perintah (terlihat di daftar proses), atau di skrip yang bisa dibaca semua user.
- Rahasia yang pernah terbaca pihak lain dianggap bocor: rotasi, jangan hanya menutup lubangnya.
- Saat membagikan kunci antar mesin, yang dikirim hanya kunci publik (`.pub`), dan fingerprint dicocokkan di kedua sisi.

## Data pribadi

- Database klien atau sistem pihak ketiga hanya diakses dengan akun read-only, kecuali pemilik menyetujui tindakan tulis tertentu di sesi itu.
- Data asli (rekam medis, data klien) tinggal di folder lokal terpisah: tidak di-commit, tidak dipublikasikan, tidak dikirim ke layanan luar (termasuk layanan AI di cloud).
- Data pribadi pemilik (nama, email, nomor) tidak dimasukkan ke request ke layanan luar (header, URL, payload) tanpa izin.
- Untuk contoh, dokumentasi, tangkapan layar, dan data uji: pakai data fiktif. Tandai ilustrasi sebagai ilustrasi.
- Log dan statistik sebisa mungkin tanpa IP/identitas mentah. Bila perlu menghitung pengunjung unik, pakai HMAC dengan kunci aplikasi, bukan hash polos (hash IPv4 bisa dibalik dengan brute force).
- Akun anggota keluarga atau pengguna lain di sistem milik pemilik tidak dipantau atau dibuka lognya kecuali diminta.
- Transkrip suara: simpan teksnya saja, lokal.

## Konfigurasi server

- Perubahan konfigurasi server (web server, firewall, SSH, layanan) butuh izin pemilik per kejadian. Izin sekali bukan izin permanen.
- Sebelum mengubah atau menghapus: lihat dulu targetnya, buat cadangan, catat cara rollback.

## Rahasia lokal

Detail nyata (nama klien, alamat server, nama akun) tidak ditulis di kit publik. Simpan di berkas privat project, misalnya `CLAUDE.local.md` atau `docs/rahasia/` yang ada di `.gitignore`, dan rujuk dari sana.
