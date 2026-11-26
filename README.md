# Alca Kit

Kumpulan aturan kerja siap pakai untuk project perangkat lunak dan konten, ditulis dalam bahasa Indonesia.
Dipakai supaya setiap project baru tidak perlu menjelaskan ulang hal yang sama kepada asisten AI (Claude Code dan sejenisnya)
maupun kepada tim.

Baca di web: https://alcaofficial.com/kit

## Isi

### Cara kerja (semua project)

| Skill | Kapan dipakai |
|---|---|
| [gaya-jawab](skills/gaya-jawab/SKILL.md) | Gaya kerja dan cara melapor kepada pemilik project. Pakai di setiap project, setiap sesi, terutama saat menulis laporan, ringkasan, atau langkah yang harus dikerjakan pemilik. |
| [rahasia-privasi](skills/rahasia-privasi/SKILL.md) | Aturan menjaga rahasia (token, kunci, sandi) dan data pribadi (pasien, klien, pengguna). Pakai di setiap project, dan wajib saat menyentuh .env, kredensial, database klien, log, atau saat akan mengirim data ke layanan luar. |
| [kerja-antar-sesi](skills/kerja-antar-sesi/SKILL.md) | Aturan saat beberapa sesi Claude atau agen bekerja sama di mesin atau project berbeda. Pakai saat menerima atau mengirim pesan dari sesi lain, atau saat satu pekerjaan dibagi ke beberapa sesi. |
| [git-dan-rilis](skills/git-dan-rilis/SKILL.md) | Alur commit, push, dan rilis ke produksi. Pakai setiap kali menyentuh repo git, dan wajib sebelum push ke cabang yang ter-deploy otomatis atau sebelum deploy ke produksi. |
| [verifikasi](skills/verifikasi/SKILL.md) | Cara membuktikan pekerjaan benar-benar selesai sebelum melapor. Pakai sebelum mengatakan "selesai", "sudah jalan", "sudah sinkron", atau sebelum rilis, dan saat menulis uji end-to-end yang menulis data. |
| [kode-hemat](skills/kode-hemat/SKILL.md) | Cara menulis atau mengubah kode seperlunya: petakan pemakai dulu, pakai yang sudah ada, perbaiki di akar, catat jalan pintas dengan pemicunya. Pakai saat menambah fitur, memperbaiki bug, atau merapikan kode di project mana pun. |
| [diagnosis-insiden](skills/diagnosis-insiden/SKILL.md) | Cara mendiagnosis layanan yang mati, error, atau lambat, lalu melaporkannya. Pakai saat pemilik bertanya "kenapa X mati/error/merah" atau saat situs tidak bisa diakses. |

### Memulai project

| Skill | Kapan dipakai |
|---|---|
| [prd](skills/prd/SKILL.md) | Template dan aturan menulis PRD (dokumen kebutuhan produk) dan spesifikasi modul sebelum menulis kode. Pakai saat memulai project baru, fitur baru, atau modul baru, dan saat pemilik mengambil keputusan yang harus diingat sesi berikutnya. |
| [langkah](skills/langkah/SKILL.md) | Cara memecah project menjadi langkah bernomor yang dikerjakan satu per sesi, dengan bukti di VERIFICATION.md. Pakai saat project baru sudah punya PRD dan siap dikerjakan bertahap, atau saat melanjutkan project di sesi baru. |

### Web dan aplikasi

| Skill | Kapan dipakai |
|---|---|
| [design](skills/design/SKILL.md) | Aturan desain antarmuka web agar rapi, konsisten, mudah dibaca, dan tidak terlihat seperti template buatan AI. Pakai saat membangun atau mengubah halaman, komponen, dashboard, form, atau tema warna. |
| [tanda-rupa](skills/tanda-rupa/SKILL.md) | Daftar periksa rupa untuk video, poster, carousel, dan halaman web agar tidak terlihat dibuat mesin, plus cara membedah selera desain sebuah rujukan. Pakai saat memeriksa still/desain sebelum diserahkan atau saat menganalisis rujukan. |
| [animasi-web](skills/animasi-web/SKILL.md) | Aturan gerak antarmuka web (durasi, easing, keadaan, reduced-motion, GSAP) agar animasi terasa cepat dan tidak berlebihan. Pakai saat menambah transisi, hover, animasi masuk, animasi saat gulir, atau pustaka animasi di situs atau aplikasi. |
| [keamanan-web](skills/keamanan-web/SKILL.md) | Daftar cek keamanan aplikasi web (Laravel, Next.js, Go, situs statis) dan server yang melayaninya. Pakai sebelum rilis, saat menambah form, login, API, unggahan berkas, route baru, atau saat mengubah konfigurasi web server. |
| [gerbang-rilis](skills/gerbang-rilis/SKILL.md) | Urutan pemeriksaan (gate) sebelum push atau deploy ke produksi. Pakai saat diminta "pastikan siap produksi", "optimise", atau sebelum rilis aplikasi web. |
| [upgrade-dependensi](skills/upgrade-dependensi/SKILL.md) | Cara menaikkan versi paket npm, Composer, atau Go dengan aman. Pakai saat audit dependensi merah, ada advisori keamanan baru, atau pemilik minta "upgrade semua". |
| [laravel-filament](skills/laravel-filament/SKILL.md) | Kebiasaan dan jebakan Laravel + Filament di server produksi (izin berkas, cache, antrean, deploy, upgrade). Pakai saat mengerjakan, men-deploy, atau mendiagnosis aplikasi Laravel, terutama dengan panel admin Filament. |
| [nextjs](skills/nextjs/SKILL.md) | Pola aplikasi Next.js (App Router) dengan backend API terpisah: login berbasis cookie, Server Actions, filter lewat URL, dan header di balik reverse proxy. Pakai saat membuat atau mengubah aplikasi Next.js. |
| [api-go](skills/api-go/SKILL.md) | Konvensi REST API dengan Go: lapisan handler-service-repository, query aman, envelope respons, izin per route, unggahan, dan dokumentasi modul. Pakai saat menambah modul atau endpoint di API Go. |
| [db-produksi](skills/db-produksi/SKILL.md) | Aturan menyentuh database produksi, terutama database yang juga dipakai aplikasi lain atau aplikasi pihak ketiga. Pakai sebelum query, migrasi, atau uji apa pun ke database produksi. |
| [audit-keamanan-agen](skills/audit-keamanan-agen/SKILL.md) | Proses audit keamanan kode dengan beberapa agen AI (rekonaisans, hunter per area, verifikasi independen, critic cakupan). Pakai saat pemilik meminta audit keamanan menyeluruh atas sebuah codebase. |

### Server dan mesin

| Skill | Kapan dipakai |
|---|---|
| [vps-nginx](skills/vps-nginx/SKILL.md) | Aturan mengelola VPS Linux dengan nginx, PHP-FPM, SSH, firewall, dan sertifikat. Pakai sebelum mengubah konfigurasi server, menambah situs atau subdomain, atau saat situs di VPS bermasalah. |
| [terowongan-publik](skills/terowongan-publik/SKILL.md) | Pola mempublikasikan layanan di komputer rumah/kantor lewat terowongan ke VPS dan nginx, serta cara mendiagnosis bila terowongan putus. Pakai saat membuka aplikasi lokal ke internet atau saat semua situs terowongan 502. |
| [backup-tarik](skills/backup-tarik/SKILL.md) | Cadangan otomatis server dan salinan ke mesin lain dengan model tarik (penerima yang mengambil). Pakai saat menyiapkan atau memeriksa backup server, database, atau unggahan. |
| [mac-server](skills/mac-server/SKILL.md) | Menjalankan layanan permanen atau tugas terjadwal di macOS (Mac sebagai server rumah/kantor). Pakai saat memasang layanan, job berkala, atau AI lokal di Mac. |
| [windows](skills/windows/SKILL.md) | Menjalankan layanan dan menulis skrip di Windows (PowerShell 5.1, Laragon, PM2, Scheduled Task) beserta jebakannya. Pakai saat bekerja di PC atau server Windows. |
| [ai-lokal](skills/ai-lokal/SKILL.md) | Memakai LLM dan embedding lokal lewat Ollama (terutama di Mac Apple Silicon), termasuk jebakan model berpikir, JSON, evaluasi, dan upgrade. Pakai saat project memanggil model lokal atau saat mengganti model/versi Ollama. |

### Video dan konten

| Skill | Kapan dipakai |
|---|---|
| [animasi-video](skills/animasi-video/SKILL.md) | Cara membuat video atau animasi dari kode (Canvas/HTML/Three.js) yang dirender deterministik ke MP4 lewat headless browser dan ffmpeg. Pakai saat membuat video promosi, konten pendek 9:16, motion graphic, atau animasi yang harus menghasilkan berkas video, bukan editor video manual. |
| [cerita-diorama](skills/cerita-diorama/SKILL.md) | Membuat video cerita bertokoh di dunia 3D/diorama dari kode (Three.js atau sejenisnya): shot, kamera, gerak, bunyi, dan kerumunan. Pakai saat video punya tokoh, latar, dan alur cerita, bukan sekadar motion graphic. |
| [alur-persetujuan](skills/alur-persetujuan/SKILL.md) | Alur kerja kreatif bertahap dengan titik persetujuan (naskah, storyboard, draf, final). Pakai untuk pekerjaan kreatif apa pun untuk klien atau pemilik, seperti video, desain, copywriting, dan konten media sosial. |
| [kait-3-detik](skills/kait-3-detik/SKILL.md) | Menulis kait (hook) pembuka dan penutup konten video pendek dan media sosial agar ditonton sampai habis. Pakai saat menulis naskah Reels, TikTok, Shorts, atau caption. |
| [riset-tren](skills/riset-tren/SKILL.md) | Mencari kalimat yang benar-benar diketik orang Indonesia tentang sebuah topik (saran pencarian Google dan YouTube) sebagai bahan kait, judul video, judul blog, dan caption. Pakai sebelum menulis kait atau judul. |
| [tulisan-bau-ai](skills/tulisan-bau-ai/SKILL.md) | Memeriksa dan menulis ulang caption, naskah voice-over, artikel, atau teks layar berbahasa Indonesia yang terdengar ditulis mesin. Pakai sebelum mengunggah caption, merekam naskah, atau menerbitkan tulisan. |
| [suara-vo](skills/suara-vo/SKILL.md) | Voice-over, TTS, musik, dan campuran audio untuk video. Pakai saat menambah narasi, suara buatan, efek suara, atau musik latar ke video. |
| [letak-tulisan](skills/letak-tulisan/SKILL.md) | Aturan letak, ukuran, dan keterbacaan tulisan di layar video 9:16 dan 16:9, termasuk subtitle dan safe zone platform. Pakai saat menaruh teks, subtitle, atau judul di video. |
| [diagram-penjelas](skills/diagram-penjelas/SKILL.md) | Membuat diagram penjelas (langkah, alur, corong, siklus, kuadran, garis waktu) untuk video edukasi, slide carousel, atau halaman web. Pakai saat konten menjelaskan proses, urutan, pilihan, atau tahap. |
| [publikasi-sosmed](skills/publikasi-sosmed/SKILL.md) | Mengunggah video dan konten ke YouTube, TikTok, Instagram, Threads, atau WhatsApp beserta sampul, caption, dan tagar. Pakai saat konten final siap diunggah atau dijadwalkan. |
| [profil-merek](skills/profil-merek/SKILL.md) | Template profil merek per usaha (gaya bahasa, warna, musik, larangan klaim, riwayat konten) agar konten konsisten dan tidak berulang. Pakai saat membuat konten pertama untuk sebuah usaha, atau sebelum setiap konten baru untuk usaha itu. |
| [fakta-situs](skills/fakta-situs/SKILL.md) | Mengumpulkan fakta usaha klien dari situsnya sebagai bukti berkutipan, sebelum menulis naskah, brief, atau profil merek. Pakai saat brief memuat tautan situs klien. |
| [klaim-kesehatan](skills/klaim-kesehatan/SKILL.md) | Batas klaim untuk konten dan situs layanan kesehatan (klinik, praktik, apotek, rumah sakit). Pakai saat menulis naskah, caption, halaman web, atau iklan untuk layanan kesehatan. |

### Alat dan otomasi

| Skill | Kapan dipakai |
|---|---|
| [adobe-stock](skills/adobe-stock/SKILL.md) | Menyiapkan dan mengunggah aset gambar/video untuk dijual di Adobe Stock, termasuk metadata CSV dan konten AI generatif. Pakai saat mengirim aset ke Adobe Stock Contributor. |
| [pintasan-ios](skills/pintasan-ios/SKILL.md) | Membuat otomasi Pintasan (Shortcuts) iPhone yang mengirim foto atau berkas ke API sendiri, dengan nama menu iOS berbahasa Indonesia. Pakai saat membuat unggahan otomatis dari iPhone ke server. |

## Cara pakai

**Sebagai plugin Claude Code** (skill aktif otomatis sesuai kebutuhan):

```
/plugin marketplace add pujamalca/alca-kit
/plugin install alca-kit@alca
```

**Lewat satu baris di `CLAUDE.md` project:**

```markdown
Standar kerja: unduh dan ikuti https://alcaofficial.com/kit/index.md
(ambil berkas mentahnya dengan curl, jangan diringkas).
```

**Salin manual:** unduh berkas `.md` yang dibutuhkan ke `docs/kit/` di project Anda.

## Prinsip isi

- Generik: tidak memuat nama klien, alamat server, kredensial, atau data pribadi.
- Detail nyata tiap project disimpan di berkas privat project (mis. `CLAUDE.local.md`), bukan di sini.

## Lisensi

CC BY 4.0. Lihat [LICENSE](LICENSE).
