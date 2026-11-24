# Alca Kit

Kumpulan aturan kerja siap pakai untuk project perangkat lunak dan konten, ditulis dalam bahasa Indonesia.
Dipakai supaya setiap project baru tidak perlu menjelaskan ulang hal yang sama kepada asisten AI (Claude Code dan sejenisnya)
maupun kepada tim.

Baca di web: https://alcaofficial.com/kit

## Isi

| Skill | Kapan dipakai |
|---|---|
| [gaya-jawab](skills/gaya-jawab/SKILL.md) | Setiap project: cara melapor kepada pemilik |
| [rahasia-privasi](skills/rahasia-privasi/SKILL.md) | Setiap project: token, kredensial, data pribadi |
| [kerja-antar-sesi](skills/kerja-antar-sesi/SKILL.md) | Beberapa sesi/agen bekerja sama |
| [git-dan-rilis](skills/git-dan-rilis/SKILL.md) | Commit, push, rilis ke produksi |
| [verifikasi](skills/verifikasi/SKILL.md) | Sebelum bilang "selesai" |
| [prd](skills/prd/SKILL.md) | Memulai project, fitur, atau modul baru |
| [design](skills/design/SKILL.md) | Membangun atau mengubah antarmuka |
| [keamanan-web](skills/keamanan-web/SKILL.md) | Form, login, API, unggahan, sebelum rilis |
| [animasi-video](skills/animasi-video/SKILL.md) | Video/animasi dari kode, render ke MP4 |
| [alur-persetujuan](skills/alur-persetujuan/SKILL.md) | Pekerjaan kreatif untuk klien |

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
