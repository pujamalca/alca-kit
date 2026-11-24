---
name: nextjs
description: Pola aplikasi Next.js (App Router) dengan backend API terpisah: login berbasis cookie, Server Actions, filter lewat URL, dan header di balik reverse proxy. Pakai saat membuat atau mengubah aplikasi Next.js.
---

# Next.js dengan API terpisah

## Login dan sesi

- Token disimpan di cookie HTTP-only lewat Server Action, tidak di `localStorage`.
- Umur cookie diturunkan dari klaim `exp` token, bukan angka tetap, supaya tidak ada sesi zombi (cookie hidup, token mati).
- Flag `secure` mengikuti protokol permintaan asli (`x-forwarded-proto`), bukan `NODE_ENV`.
- Browser tidak memanggil API backend langsung. Semua lewat Server Action atau route handler same-origin.
- Tidak ada token layanan permanen di env: access token pasti kedaluwarsa. Data publik diambil dari endpoint publik berkontrak sempit.
- `NEXTAUTH_URL` / URL aplikasi diset ke domain publik; nilai `localhost` membuat cookie tanpa `Secure` dan sitemap/canonical salah.

## Server Actions

```ts
'use server'
type Hasil<T> = { success: boolean; data?: T; message?: string; error?: string }

export async function simpanPasien(input: PasienInput): Promise<Hasil<Pasien>> {
  try {
    const res = await fetch(api(`/pasien/${encodeURIComponent(input.id)}`), {
      method: 'PUT', headers: await authHeaders(), body: JSON.stringify(input),
    })
    if (!res.ok) return { success: false, error: await pesanGalat(res) }
    revalidatePath('/pasien')
    return { success: true, data: await res.json() }
  } catch (e) {
    return { success: false, error: 'Gagal terhubung ke server' }
  }
}
```

- `'use server'` di baris pertama; setiap fungsi ekspor punya try/catch dan tipe kembalian eksplisit.
- Header Authorization dan header forwarded (host, IP) dibangun di satu helper.
- Setelah mutasi: `revalidatePath`.
- ID di path: `encodeURIComponent`.
- Tipe satu berkas per modul, cocok dengan DTO backend, tanpa `any`.
- Skrip audit statis memeriksa aturan-aturan ini, supaya lupa satu aturan menjadi kegagalan build.

## UI

- Filter, pencarian, dan pagination lewat URL (`useSearchParams`), bukan `useState`: tahan refresh dan bisa dibagikan.
- Aksi destruktif lewat satu util konfirmasi bersama; efek samping disebut di teks konfirmasi.
- Metadata form (kolom, tipe, enum, wajib) sebaiknya dikirim backend dan dirender langsung. Bila terpaksa menyalin enum, salin persis termasuk salah ejaannya.

## Keamanan dan produksi

- `robots: noindex` secara default; halaman publik opt-in dan masuk sitemap.
- Proxy ke backend dengan `new URL()` + cek origin.
- CSP di middleware, dibangun dari origin terkonfigurasi. `poweredByHeader: false`.
- Service worker hanya meng-cache aset statis.
- Di balik nginx: header `Link` preload font Next.js bisa melebihi buffer default 4k → `proxy_buffer_size 16k` (gejala: 502 hanya di path tertentu, log "upstream sent too big header").
- Rate limit app yang membaca `X-Forwarded-For` hanya aman bila proxy mengisi header itu dari IP koneksi.
