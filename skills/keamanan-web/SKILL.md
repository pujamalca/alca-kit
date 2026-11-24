---
name: keamanan-web
description: Daftar cek keamanan aplikasi web (Laravel, Next.js, Go, situs statis) dan server yang melayaninya. Pakai sebelum rilis, saat menambah form, login, API, unggahan berkas, route baru, atau saat mengubah konfigurasi web server.
---

# Keamanan web

## Input dan output

- Semua input divalidasi di server: tipe, panjang, pola. Teks bebas di-`strip_tags` atau di-escape saat ditampilkan.
- HTML dari pengguna hanya lewat sanitizer. Di Next.js: setiap `dangerouslySetInnerHTML` wajib lewat sanitizer.
- Teks dari pengguna yang dimasukkan ke HTML lewat JavaScript memakai `textContent`, bukan `innerHTML`.
- Tautan dari pengguna hanya `https://` (tolak `javascript:`, `data:`, `http:` bila tidak perlu). Validasi juga saat ditampilkan, bukan hanya saat disimpan.
- Email yang menyisipkan teks pengguna (nama, komentar) memakai Markdown dengan encoding aman, supaya tidak bisa menyisipkan tautan.
- Query database selalu terparameter. Nama kolom atau tabel dinamis hanya dari daftar putih.

## Login, sesi, dan izin

- Cookie sesi `HttpOnly`, `Secure`, `SameSite=Lax`. Di balik proxy, pastikan aplikasi tahu request aslinya HTTPS.
- Token disimpan di cookie HTTP-only lewat server, bukan di `localStorage`. Umur cookie mengikuti masa berlaku token.
- Izin dicek di server untuk setiap aksi, termasuk aksi massal (bulk). Admin biasa tidak boleh mengubah akun super admin.
- Ganti email atau sandi wajib memasukkan sandi saat ini. Ganti sandi mencabut semua token lama.
- Endpoint API tanpa token mengembalikan 401 JSON, bukan 500 atau redirect HTML.
- Seeder tidak pernah membuat akun bawaan (`admin@example.com` / `password`) di luar lingkungan lokal.

## Unggahan berkas

- Pertanyakan dulu apakah form publik perlu unggahan. Sering cukup lewat WhatsApp/email, dan permukaan serangannya hilang.
- Batasi ukuran sebelum parse. Tipe ditentukan dari isi berkas, bukan dari nama atau header. Nama berkas di disk acak.
- Gambar: hanya raster (JPG, PNG, WebP). SVG bisa membawa skrip (XSS tersimpan).
- Simpan di disk privat di luar webroot. Unduh lewat route yang mengecek izin.
- Jalur berkas dibentuk dari data di database (mis. kode pesanan), tidak pernah dari input pengunjung. Tolak `..`.
- Folder unggahan publik tidak pernah mengeksekusi skrip (`*.php` → 404) dan dikirim dengan `X-Content-Type-Options: nosniff`.

## Formulir publik dan rate limit

- Rate limit per IP di web server atau aplikasi untuk login, registrasi, form, dan API tulis. Batasi POST, jangan GET halaman biasa.
- Anti-bot ringan: honeypot, cek waktu isi, soal hitung sederhana.
- Di balik reverse proxy, `X-Forwarded-For` diset dari IP koneksi (mis. `$remote_addr` di nginx), bukan diteruskan dari klien, supaya rate limit tidak bisa diakali dengan header palsu.

## Header dan web server

- Header keamanan: HSTS, `X-Content-Type-Options`, `X-Frame-Options` (atau CSP `frame-ancestors`), `Referrer-Policy`, `Permissions-Policy`. Jangan menimpa header backend yang lebih ketat.
- CSP disusun dari origin yang memang dipakai. Skrip CDN diberi `integrity` (SRI) dan versi dipaku.
- Sembunyikan versi server (`server_tokens off`, `poweredByHeader: false`).
- Blokir dotfile (`.git`, `.env`) dan berkas sumber di webroot. Lebih baik lagi: webroot hanya berisi folder build/publik.
- Host yang tidak dikenal ditolak: vhost `default_server` yang menutup koneksi, dan daftar host tepercaya di aplikasi. Tanpa ini, tautan reset sandi bisa dibangun dari header `Host` palsu.
- Selalu uji konfigurasi sebelum reload (`nginx -t`, `sshd -t`). Pakai reload, bukan restart.
- `proxy_pass` ke hostname luar memakai variabel + `resolver`, supaya DNS yang gagal saat start tidak menjatuhkan seluruh web server.

## Proxy dan SSRF (Next.js dan sejenisnya)

- Browser tidak memanggil API backend langsung. Lewat route same-origin.
- Proxy ke backend dibangun dengan `new URL()` + cek origin, bukan menyambung string.
- Service worker hanya meng-cache aset statis, tidak pernah halaman dashboard atau data pengguna.

## Indeks mesin pencari

- Halaman pribadi (pratinjau klien, unduhan, dashboard) diberi `noindex` + `Cache-Control: private, no-store`. Tautan rahasia memakai token acak panjang dan masa berlaku.
- Halaman yang berisi data pribadi dan sudah terindeks tidak bisa ditarik kembali sepenuhnya.

## Dependensi dan server

- Jalankan `composer audit` / `npm audit --omit=dev` sebelum rilis. Tutup yang kritis dulu, catat sisanya beserta alasan.
- Jangan build sebagai root. Jangan biarkan pengguna web server punya sudo tanpa batas.
- Berkas konfigurasi yang berisi rahasia tidak bisa dibaca semua user (`640`/`600`).
- Cadangan otomatis + salinan di mesin lain (model tarik: mesin cadangan yang menarik, server tidak memegang kuncinya). Uji pemulihannya sekali.
