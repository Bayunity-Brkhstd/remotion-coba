# Gemini Antigravity × Bang Motion (Remotion Engine)

Mesin produksi video terprogram (*programmatic video engine*) berbasis **React** dan **Remotion**, disesuaikan khusus untuk eksekusi oleh **Gemini API** dan runtime **Antigravity**. Dilengkapi dengan hukum desain motion graphic sinematik **Anti-PPT** dari [**Bang Motion**](https://github.com/bangtutorial/bang-motion).

---

## ⚡ Fitur Utama

- **Headless MP4 Rendering**: Render video MP4 otomatis menggunakan Chromium headless tanpa GUI atau dialog interaktif.
- **Hukum Desain Sinematik Bang Motion**:
  - *Satu shot = satu pernyataan* (maksimal ≤ 5 kata per shot).
  - Hirarki atensi: Pernyataan → Visual Hero / Metric → Detail pendukung.
  - Latar hidup multi-layer (*GrainyBackground*, ambient mesh glow).
  - *Dynamic camera breathing* dan transisi berbasis fisika *spring*.
- **Multi-Format Siap Pakai**:
  - `16:9` Landscape (1920×1080) untuk YouTube dan presentasi video.
  - `9:16` Portrait (1080×1920) untuk TikTok, Instagram Reels, dan YouTube Shorts.
- **Dukungan Dynamic Props**:
  - Kirim teks, warna, durasi, dan metrik melalui file JSON atau inline argumen CLI secara aman (kompatibel penuh dengan Windows PowerShell & Linux).

---

## 📁 Struktur Repositori

```text
├── .agents/
│   └── skills/
│       ├── bang-motion/                      # Knowledge base & asset library Bang Motion
│       │   ├── SKILL.md
│       │   ├── references/ (anti-ppt.md, techniques.md, dll.)
│       │   └── assets/ (starter HTML templates)
│       └── remotion-builder/                 # Standar Skill Antigravity
│           └── SKILL.md
├── remotion/
│   ├── remotion.config.ts                    # Konfigurasi Chromium headless
│   ├── public/                               # Folder aset statis lokal (staticFile)
│   └── src/
│       ├── components/
│       │   ├── GrainyBackground.tsx          # Latar ambient mesh gradient dinamis
│       │   ├── KineticTitleScene.tsx         # Tipografi kinetik tajam (Anti-PPT)
│       │   ├── PunchyFeatureScene.tsx        # Hero metric reveal tanpa bullet list
│       │   ├── TitleScene.tsx                # Scene standar
│       │   └── FeatureScene.tsx              # Scene card list standar
│       ├── CinematicComposition.tsx          # Template video gaya Bang Motion
│       ├── Composition.tsx                   # Template video modular standar
│       ├── Root.tsx                          # Pendaftaran 4 Komposisi (16:9 & 9:16)
│       ├── types.ts                          # Tipe data TypeScript props
│       └── index.ts                          # Entry point bundler Remotion
├── scripts/
│   ├── render.mjs                            # Headless MP4 renderer CLI
│   └── test-composition.mjs                  # Validasi komposisi sebelum render
├── out/                                      # Direktori output file MP4
├── props.sample.json                         # Contoh parameter dynamic props
├── GEMINI.md                                 # Workspace rules untuk model Gemini
├── package.json
└── tsconfig.json
```

---

## 🚀 Perintah Cepat

```bash
# 1. Instalasi dependensi
npm install

# 2. Verifikasi tipe TypeScript
npm run check

# 3. Uji & inspeksi daftar komposisi
npm run test:composition

# 4. Preview interaktif di browser (Remotion Studio)
npm run preview

# 5. Render video MP4:
# Komposisi Sinematik 16:9
npm run render CinematicVideo out/cinematic-landscape.mp4

# Komposisi Sinematik 9:16 (Reels/Shorts)
npm run render CinematicVideoPortrait out/cinematic-reels.mp4

# Render dengan props dinamis kustom
npm run render CinematicVideo out/custom.mp4 props.sample.json
```
