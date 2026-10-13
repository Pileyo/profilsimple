# Website Profil Pribadi - Tugas UTS Pemrograman Web

**Nama:** Leo  
**NIM:** [NIM]  
**Mata Kuliah:** Pemrograman Web - Semester 3  
**Program Studi:** Manajemen Informatika

---

## Deskripsi Project

Website profil pribadi ini dibuat sebagai tugas UTS Pemrograman Web. Website terdiri dari tiga halaman utama (Beranda, Tentang Kami, Kontak) yang dibangun menggunakan HTML5, CSS3, dan JavaScript murni tanpa framework atau library eksternal. Website menampilkan informasi pribadi, daftar proyek portofolio, biodata lengkap, daftar skill yang dimuat lewat AJAX, serta formulir kontak dengan validasi input.

---

## Cara Melihat Website

### Online (GitHub Pages)
Kunjungi: **https://[USERNAME].github.io/[NAMA-REPO]/**

*(Ganti `[USERNAME]` dengan username GitHub Anda dan `[NAMA-REPO]` dengan nama repositori)*

### Lokal

1. Clone atau download repositori ini.
2. **Penting:** Buka website melalui **local server** (misalnya Live Server di VS Code, atau `python -m http.server`), bukan dengan membuka file HTML langsung (`file://`). Fitur AJAX (`fetch()`) membutuhkan local server agar dapat membaca file `data.json`.
3. Buka `index.html` di browser lewat local server tersebut.

---

## Struktur HTML

Website ini menggunakan elemen-elemen HTML5 semantik untuk memastikan struktur yang jelas dan mudah dipahami:

- **`<!DOCTYPE html>`**: Deklarasi dokumen HTML5 standar.
- **`<html lang="id">`**: Menetapkan bahasa Indonesia untuk seluruh halaman.
- **`<head>`**: Berisi metadata (`charset`, `viewport`), judul halaman (`<title>`), dan link ke file CSS eksternal.
- **`<body>`**: Wadah utama konten halaman.

### Elemen Semantik yang Digunakan

1. **`<header>`**: 
   - Navbar navigasi utama yang muncul di semua halaman, berisi brand logo dan menu.
   - Page header di dalam `<main>` untuk setiap halaman, menampilkan judul dan deskripsi singkat halaman (memenuhi syarat soal UTS).

2. **`<nav>`**: Menu navigasi dengan daftar link halaman (Beranda, Tentang Kami, Kontak) dan tombol dark mode.

3. **`<main>`**: Konten utama halaman, memuat semua section.

4. **`<section>`**: 
   - `#profil` (beranda): area hero dengan foto dan intro.
   - `#proyek` (beranda): grid card portofolio.
   - `#about-section` (tentang kami): biodata dan daftar skill.
   - `#contact-section` (kontak): formulir dan info kontak.

5. **`<footer>`**: Copyright dan informasi tugas.

6. **`<form>`**: Formulir kontak dengan elemen `<label>`, `<input>`, `<textarea>`, dan `<button type="submit">`.

7. **`<ul>` / `<li>`**: Daftar menu navigasi dan daftar skill (diisi lewat JavaScript).

8. **`<img>`**: Foto profil dengan atribut `alt` yang deskriptif untuk aksesibilitas.

### Alasan Penggunaan Elemen Semantik

- **Aksesibilitas**: Elemen semantik membantu screen reader memahami struktur halaman.
- **SEO**: Mesin pencari lebih mudah mengindeks konten yang terstruktur dengan jelas.
- **Pemeliharaan**: Kode lebih mudah dibaca dan dikelola oleh developer lain.

### Atribut Aksesibilitas

- `alt` pada semua `<img>` untuk teks alternatif.
- `aria-label` pada tombol dark mode.
- `role="status"` dan `aria-live="polite"` pada div status pesan form agar screen reader membacanya saat muncul.
- Label form dihubungkan dengan input melalui atribut `for` dan `id`.

---

## Desain CSS

Website ini menerapkan desain modern, bersih, dan responsif dengan pendekatan **mobile-first** dan menggunakan **CSS custom properties** (variabel CSS) untuk memudahkan pemeliharaan tema.

### Teknik CSS yang Digunakan

1. **CSS Variables (Custom Properties)**:
   - Variabel warna, shadow, radius, dan spacing didefinisikan di `:root` agar mudah diubah secara konsisten di seluruh halaman.
   - Contoh: `--primary`, `--text`, `--bg`, `--card`, `--border`, `--shadow`.

2. **Flexbox**:
   - **Navbar**: layout horizontal, spacing merata, item sejajar vertikal.
   - **Hero section** (`#profil`, `.about-flex`): foto di kiri, konten di kanan dengan gap konsisten.
   - **Button group**: tombol disusun secara horizontal dengan `flex-wrap` agar responsif di layar kecil.

3. **CSS Grid**:
   - **Project cards** (`.projects-grid`): 3 kolom di desktop, 2 di tablet, 1 di mobile.
   - **Contact section**: grid 2 kolom (form + info card).
   - **Biodata** (`.biodata-grid`): grid 2 kolom (label + value).
   - **Skill list** (`.skill-list`): grid 2 kolom di desktop, 1 di mobile.

4. **Responsive Design**:
   - **Media queries** di `@media (max-width: 768px)` dan `@media (max-width: 480px)`.
   - Navbar berubah menjadi layout vertikal di mobile.
   - Grid card menyesuaikan jumlah kolom sesuai lebar layar.

5. **Transisi & Animasi**:
   - Tombol dan card punya `transition` saat hover (transform, shadow, color).
   - **Keyframe animation** `fadeIn` untuk skill card dan pesan form, dipicu oleh class `.fade-in`.

6. **Dark Mode**:
   - Class `dark-mode` di `<body>` mengubah seluruh warna (background hitam, teks putih).
   - Disimpan di `localStorage` agar pilihan tema tetap terjaga saat refresh.

7. **Aksesibilitas**:
   - `min-height: 44px` pada semua tombol dan link untuk target klik yang cukup besar.
   - `outline` focus-visible untuk keyboard navigation.
   - Kontras warna memenuhi WCAG AA.

### Alasan Desain

- **Konsistensi**: Variabel CSS dan komponen modular membuat desain terasa seragam.
- **Responsivitas**: Layout otomatis menyesuaikan tanpa horizontal scroll di device apapun.
- **Performa**: Tidak ada framework CSS eksternal, file CSS hanya 15KB, cepat dimuat.

---

## Fungsionalitas JavaScript

JavaScript digunakan untuk membuat website lebih interaktif dan dinamis. Lima fitur JavaScript yang diimplementasikan sesuai soal UTS:

### 1. Event Handling

**Letak:** `script.js` baris 31-32, 66-67, 105  
**Cara Kerja:**
- Tombol dark mode (`#btn-dark-mode`) mendengarkan event `click`, lalu memanggil fungsi `toggleDarkMode()`.
- Tombol sembunyikan/tampilkan foto di halaman Tentang Kami mendengarkan event `click`.
- Formulir kontak mendengarkan event `submit`, lalu memanggil fungsi `handleKirimPesan()`.

### 2. DOM Manipulation

**Letak:** `script.js` baris 48-54, 238-259  
**Cara Kerja:**
- **Dark mode button**: fungsi `updateDarkModeButton()` mengubah HTML tombol (`innerHTML`) dan atribut (`setAttribute`) sesuai tema aktif.
- **Status pesan form**: fungsi `handleKirimPesan()` membuat elemen `<div>` berisi pesan sukses atau error, lalu menambahkannya ke halaman.
- **Skill list**: fungsi `tampilkanSkill()` membuat elemen `<li>`, `<h4>`, `<span>`, dan `<p>` untuk tiap skill dari data JSON, lalu menambahkannya ke `<ul id="daftar-skill">`.

### 3. Style & Animation

**Letak:** `script.js` baris 37-38, 77-79, 149, 251  
**Cara Kerja:**
- Fungsi `toggleDarkMode()` menambah/menghapus class `dark-mode` pada `<body>`, lalu CSS mengubah warna seluruh halaman.
- Fungsi `sembunyikanFoto()` dan `tampilkanFoto()` mengubah properti `style.display` foto profil.
- Class `fade-in` ditambahkan pada elemen pesan form dan skill card, memicu animasi CSS `@keyframes fadeIn` yang membuat elemen muncul dari bawah dengan fade.
- Class `input-error` ditambahkan pada input form yang tidak valid, mengubah border menjadi merah.

### 4. Form Validation

**Letak:** `script.js` baris 138-192  
**Cara Kerja:**
- Saat form di-submit, fungsi `handleKirimPesan()` memeriksa:
  1. Semua field tidak boleh kosong.
  2. Email harus sesuai format (memakai regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  3. Pesan minimal 10 karakter.
- Jika validasi gagal, muncul pesan error merah di bawah form dan input yang salah diberi border merah (class `input-error`).
- Jika validasi sukses, muncul pesan hijau "Pesan berhasil dikirim" dan form dikosongkan.
- **Tidak ada pengiriman ke server** (hanya simulasi client-side).

### 5. AJAX (Fetch API)

**Letak:** `script.js` baris 203-263  
**Cara Kerja:**
- Fungsi `initSkillAjax()` dipanggil saat halaman Tentang Kami dibuka.
- `fetch("data.json")` mengambil file JSON dari server secara asynchronous.
- Jika berhasil, data JSON di-parse lalu fungsi `tampilkanSkill()` membuat elemen HTML untuk tiap skill dan menambahkannya ke halaman (DOM manipulation).
- Jika gagal (misalnya file tidak ditemukan atau dibuka lewat `file://`), muncul pesan error ramah yang mengingatkan pengguna untuk membuka lewat local server.
- **Error handling**: blok `catch()` menangani error jaringan atau file tidak ditemukan.

---

## Struktur Folder

```
.
├── index.html          # Halaman Beranda
├── about.html          # Halaman Tentang Kami
├── contact.html        # Halaman Kontak
├── style.css           # File CSS (desain dan responsivitas)
├── script.js           # File JavaScript (interaksi dan AJAX)
├── data.json           # Data skill (dimuat lewat AJAX)
├── foto.jpg            # Foto profil
├── README.md           # Dokumentasi project (file ini)
└── SRS.md              # Software Requirements Specification
```

---

## Validasi HTML dan CSS

Website ini telah divalidasi menggunakan validator resmi W3C:

- **HTML Validator**: https://validator.w3.org/
- **CSS Validator**: https://jigsaw.w3.org/css-validator/

Cara validasi:
1. Buka link validator di atas.
2. Pilih tab "Validate by Direct Input" atau "Validate by File Upload".
3. Copy-paste kode HTML/CSS atau upload file, lalu klik "Check".
4. Perbaiki error yang ditemukan hingga muncul pesan "Document checking completed. No errors or warnings to show."

---

## Cara Mengaktifkan GitHub Pages

1. Push semua file project ke repositori GitHub.
2. Buka repositori di GitHub, klik **Settings**.
3. Scroll ke bawah, klik **Pages** di sidebar kiri.
4. Di bagian "Source", pilih branch **main** dan folder **/ (root)**.
5. Klik **Save**.
6. Tunggu beberapa menit, lalu link website akan muncul di bagian atas halaman Pages.
7. Salin link tersebut dan masukkan ke README.md bagian "Cara Melihat Website > Online".

### Perintah Git untuk Push ke GitHub

```bash
git init
git add .
git commit -m "Upload tugas UTS Pemrograman Web"
git branch -M main
git remote add origin https://github.com/[USERNAME]/[NAMA-REPO].git
git push -u origin main
```

*(Ganti `[USERNAME]` dan `[NAMA-REPO]` dengan akun dan nama repo Anda)*

---

## Link Dokumentasi

- **README.md**: Dokumentasi utama project (file ini).
- **SRS.md**: Software Requirements Specification, berisi kebutuhan fungsional dan non-fungsional sistem.

---

## Catatan Teknis

- Website ini **tidak menggunakan framework atau library eksternal** seperti Bootstrap, Tailwind, jQuery, React, atau npm package apapun. Semua kode ditulis dari nol memakai HTML, CSS, dan JavaScript murni.
- **Font**: Google Fonts (Plus Jakarta Sans) dimuat dari CDN.
- **Browser support**: Chrome, Firefox, Safari, Edge versi terbaru.
- **Fitur AJAX membutuhkan local server** untuk membaca `data.json`. Jika dibuka langsung lewat `file://`, fetch akan gagal karena CORS policy browser.

---

## Lisensi

© 2026 Leo. Seluruh hak cipta dilindungi. Project ini dibuat untuk keperluan tugas UTS Pemrograman Web.
