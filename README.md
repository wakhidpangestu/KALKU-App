# 📐 Kalku App

**Kalku App** adalah aplikasi kalkulator teknik modern berbasis **Vite + React + TailwindCSS**, yang bisa dijalankan di **Web** maupun **Desktop** (Electron).
Aplikasi ini dibuat untuk memudahkan mahasiswa/engineer dalam menghitung rumus-rumus fisika dasar, khususnya dalam bidang mekanika & termodinamika.

---

## ✨ Fitur Utama

* 🔹 **GLBB (Gerak Lurus Berubah Beraturan)** – menghitung kecepatan, percepatan, perpindahan.
* 🔹 **Hukum Gas Ideal** – simulasi & perhitungan gas ideal.
* 🔹 **Persamaan Kalor** – menghitung perubahan kalor & energi.
* 🔹 **Efisiensi Carnot** – perhitungan efisiensi mesin Carnot.
* 🔹 **Diagram PV/TS** – grafik & perhitungan termodinamika.
* 🔹 **Dark Mode + Neon Blue Theme** – tampilan modern dan nyaman.
* 🔹 **Responsive Design** – bisa diakses dari web, mobile, maupun desktop.
* 🔹 **Ekspor Data** ke **CSV/XLSX** untuk keperluan laporan.

---

## 🖼️ Tampilan

![Preview Kalku App](assets/preview.png)
*(contoh screenshot tampilan aplikasi)*

---

## 🚀 Instalasi & Penggunaan

### 1. Clone Repo

```bash
git clone https://github.com/wakhidpangestu/KALKU-App.git
cd KALKU-App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan di Mode Dev (Web)

```bash
npm run dev
```

### 4. Build Versi Web

```bash
npm run build
```

Hasil build ada di folder `/dist`.

---

## 💻 Versi Desktop (Electron)

### 1. Jalankan dalam Mode Dev

```bash
npm run start
```

### 2. Build jadi `.exe`

```bash
npm run build:electron
```

Installer `.exe` akan muncul di folder:

```
/dist_electron/
```

---

## 📂 Struktur Project

```
KALKU-App/
├── electron/          # Main process Electron
├── src/               # Source React (frontend)
├── assets/            # Ikon & aset aplikasi
├── dist/              # Build hasil Vite
├── dist_electron/     # Build hasil Electron (exe)
└── package.json
```

---

## 🛠️ Teknologi yang Digunakan

* ⚡ **Vite** – Frontend bundler super cepat.
* ⚛️ **React + TypeScript** – Library frontend modern.
* 🎨 **TailwindCSS** – Styling cepat dan fleksibel.
* 🖥️ **Electron** – Build desktop app (Windows/Mac/Linux).
* 📊 **XLSX** – Ekspor data ke Excel.

---

## 👨‍💻 Kontributor

* **Wakhid Pangestu** – [@wakhidpangestu](https://github.com/wakhidpangestu)
* **Semesta Labs** – [@semestalabs.id](https://instagram.com/semestalabs.id)

---

## 📜 Lisensi

MIT License © 2025 [Semesta Labs](https://instagram.com/semestalabs.id)
