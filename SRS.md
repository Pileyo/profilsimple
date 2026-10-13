# Software Requirements Specification (SRS)
## Website Profil Pribadi - Tugas UTS Pemrograman Web

**Nama Project:** Website Profil Pribadi Pileyo Hananim Zamonokhi Bate'e  
**Versi:** 1.0  
**Tanggal:** 13 Oktober 2026  
**Pembuat:** Pileyo Hananim Zamonokhi Bate'e - NIM 25091397045

---

## 1. Pendahuluan

### 1.1 Tujuan

Dokumen SRS ini menjelaskan kebutuhan fungsional dan non-fungsional dari website profil pribadi yang dibuat sebagai tugas UTS Pemrograman Web. Dokumen ini menjadi acuan bagi pengembang (mahasiswa) dan penilai (dosen) untuk memastikan bahwa website memenuhi seluruh syarat yang ditetapkan dalam soal UTS.

### 1.2 Ruang Lingkup

Website profil pribadi ini adalah aplikasi web statis berbasis HTML5, CSS3, dan JavaScript murni tanpa framework atau backend server. Website terdiri dari 3 halaman utama (Beranda, Tentang Kami, Kontak) dan menyediakan fitur navigasi, dark mode, formulir kontak dengan validasi, serta daftar skill yang dimuat lewat AJAX.

**Fitur yang termasuk dalam scope:**
- Struktur HTML semantik dengan header, nav, main, section, footer.
- Desain CSS responsif (desktop, tablet, mobile) dengan Flexbox dan Grid.
- Lima fitur JavaScript: Event Handling, DOM Manipulation, Style & Animation, Form Validation, AJAX.
- Hosting di GitHub Pages.

**Fitur yang tidak termasuk dalam scope:**
- Backend server atau database.
- Pengiriman email sungguhan dari formulir kontak.
- Sistem autentikasi atau login pengguna.
- Framework atau library eksternal (Bootstrap, jQuery, React, dll).

### 1.3 Definisi dan Singkatan

- **HTML**: HyperText Markup Language, bahasa markup untuk membuat struktur halaman web.
- **CSS**: Cascading Style Sheets, bahasa untuk mendesain tampilan halaman web.
- **JavaScript (JS)**: Bahasa pemrograman untuk membuat interaksi di sisi client.
- **AJAX**: Asynchronous JavaScript and XML, teknik untuk mengambil data dari server tanpa reload halaman.
- **Fetch API**: API JavaScript modern untuk melakukan HTTP request.
- **DOM**: Document Object Model, representasi struktur HTML sebagai objek yang dapat dimanipulasi JS.
- **Responsif**: Tampilan website otomatis menyesuaikan dengan berbagai ukuran layar.
- **Dark Mode**: Tema gelap dengan background hitam dan teks putih.
- **GitHub Pages**: Layanan hosting gratis dari GitHub untuk website statis.

---

## 2. Deskripsi Umum

### 2.1 Perspektif Produk

Website ini adalah produk standalone yang berjalan di browser pengguna tanpa memerlukan server backend. Semua logika interaksi dilakukan di sisi client memakai JavaScript. File `data.json` disimpan di folder yang sama dengan HTML dan dimuat menggunakan Fetch API.

### 2.2 Fungsi Produk

Website ini berfungsi sebagai:
1. **Portofolio pribadi** untuk menampilkan identitas, biodata, dan proyek.
2. **Media kontak** melalui formulir (simulasi, tanpa pengiriman email sungguhan).
3. **Demonstrasi skill** web development: HTML semantik, CSS responsif, JavaScript interaktif.

### 2.3 Pengguna

**Target pengguna:**
- Dosen penilai tugas UTS Pemrograman Web.
- Recruiter atau calon pemberi kerja yang ingin melihat portofolio.
- Teman sekelas atau siapa saja yang mengunjungi link GitHub Pages.

**Karakteristik pengguna:**
- Dapat mengakses internet dan membuka browser modern (Chrome, Firefox, Safari, Edge).
- Tidak memerlukan pengetahuan teknis khusus, website dirancang intuitif.

### 2.4 Batasan

- Website tidak menyimpan data pengguna ke database. Isian formulir kontak hanya ditampilkan sebagai notifikasi sukses tanpa dikirim ke server.
- Fitur AJAX membutuhkan local server saat development. Jika dibuka lewat `file://`, fetch akan gagal karena CORS policy browser.
- Tema dark mode disimpan di `localStorage` browser. Jika pengguna menghapus cache browser, pilihan tema akan reset ke default (light mode).

### 2.5 Asumsi dan Ketergantungan

- Pengguna menggunakan browser dengan JavaScript diaktifkan.
- Koneksi internet tersedia untuk memuat font dari Google Fonts (opsional, fallback ke font sistem jika gagal).
- Website di-hosting di GitHub Pages atau local server yang mendukung file statis.

---

## 3. Kebutuhan Fungsional

Kebutuhan fungsional menjelaskan fitur-fitur yang harus ada di website sesuai soal UTS.

### FR-01: Struktur HTML Semantik

**Deskripsi:** Setiap halaman memiliki struktur HTML5 dengan elemen semantik yang jelas.

**Detail:**
- Setiap halaman (`index.html`, `about.html`, `contact.html`) memiliki `<header>` berisi judul dan deskripsi singkat tentang halaman (syarat soal UTS).
- Navigasi menggunakan elemen `<nav>` dengan minimal 2 menu (Beranda, Tentang Kami, Kontak).
- Konten utama dibungkus dalam `<main>` dan dibagi ke dalam `<section>` sesuai fungsinya.
- Foto profil menggunakan `<img>` dengan atribut `alt` yang deskriptif.
- Formulir kontak menggunakan `<form>`, `<label>`, `<input>`, `<textarea>`, dan `<button>`.

**Kriteria Penerimaan:**
- HTML lolos validasi W3C tanpa error.
- Setiap halaman punya header dengan `<h1>` judul + `<p>` deskripsi.
- Navigasi berfungsi dengan benar, link mengarah ke halaman yang tepat.

---

### FR-02: Desain CSS Responsif dan Estetis

**Deskripsi:** Website menggunakan CSS untuk tampilan yang estetis, konsisten, dan responsif di berbagai ukuran layar.

**Detail:**
- **Flexbox**: Navbar, hero section, button group memakai Flexbox untuk layout horizontal/vertikal.
- **CSS Grid**: Project cards, contact section, biodata, dan skill list memakai Grid untuk layout multi-kolom.
- **Media Queries**: Layout menyesuaikan di layar desktop (>768px), tablet (480-768px), dan mobile (<480px).
- **CSS Variables**: Warna, shadow, radius didefinisikan di `:root` untuk kemudahan pemeliharaan.
- **Transisi & Animasi**: Tombol dan card punya efek hover. Keyframe `fadeIn` untuk animasi muncul.

**Kriteria Penerimaan:**
- CSS lolos validasi W3C tanpa error.
- Navbar berubah layout vertikal di mobile.
- Grid card menyesuaikan jumlah kolom: 3 di desktop, 2 di tablet, 1 di mobile.
- Tidak ada horizontal scroll di device apapun.

---

### FR-03: Event Handling

**Deskripsi:** JavaScript menangani event dari interaksi pengguna (klik tombol, submit form).

**Detail:**
- Tombol dark mode mendengarkan event `click` lalu memanggil `toggleDarkMode()`.
- Tombol sembunyikan/tampilkan foto mendengarkan event `click`.
- Formulir kontak mendengarkan event `submit` lalu memanggil `handleKirimPesan()`.

**Kriteria Penerimaan:**
- Klik tombol dark mode mengubah tema halaman.
- Klik tombol "Sembunyikan Foto" menyembunyikan foto profil, klik "Tampilkan Foto" menampilkannya kembali.
- Submit form memicu validasi tanpa reload halaman.

---

### FR-04: DOM Manipulation

**Deskripsi:** JavaScript mengubah atau membuat elemen HTML secara dinamis.

**Detail:**
- Fungsi `updateDarkModeButton()` mengubah `innerHTML` dan `setAttribute` tombol dark mode sesuai tema aktif.
- Fungsi `tampilkanSkill()` membuat elemen `<li>`, `<h4>`, `<span>`, `<p>` untuk tiap skill dari data JSON, lalu menambahkannya ke `<ul id="daftar-skill">`.
- Fungsi `handleKirimPesan()` membuat elemen `<div id="status-pesan">` berisi pesan sukses atau error.

**Kriteria Penerimaan:**
- Teks tombol dark mode berubah dari "Dark Mode" jadi "Light Mode" saat dark mode aktif.
- Daftar skill di halaman Tentang Kami muncul secara dinamis dari `data.json`.
- Pesan status form muncul di bawah tombol submit setelah validasi.

---

### FR-05: Style & Animation

**Deskripsi:** JavaScript mengubah style atau menambah class untuk memicu animasi CSS.

**Detail:**
- Fungsi `toggleDarkMode()` menambah/menghapus class `dark-mode` pada `<body>`.
- Fungsi `sembunyikanFoto()` mengubah `style.display = "none"`, `tampilkanFoto()` mengubah `style.display = "block"`.
- Class `fade-in` ditambahkan pada pesan form dan skill card, memicu animasi `@keyframes fadeIn`.
- Class `input-error` ditambahkan pada input form yang tidak valid, mengubah border merah.

**Kriteria Penerimaan:**
- Dark mode mengubah seluruh warna halaman (background hitam, teks putih).
- Skill card dan pesan form muncul dengan animasi fade dari bawah.
- Input form yang tidak valid diberi border merah hingga pengguna mengisinya dengan benar.

---

### FR-06: Form Validation

**Deskripsi:** JavaScript memvalidasi input form kontak sebelum menampilkan pesan sukses.

**Detail:**
- Validasi 1: Nama, email, dan pesan tidak boleh kosong.
- Validasi 2: Email harus sesuai format `nama@domain.com` (pakai regex).
- Validasi 3: Pesan minimal 10 karakter.
- Jika validasi gagal, muncul pesan error merah dan input yang salah diberi border merah.
- Jika validasi sukses, muncul pesan hijau "Pesan berhasil dikirim" dan form dikosongkan.

**Kriteria Penerimaan:**
- Submit form dengan field kosong menampilkan pesan "Semua kolom wajib diisi".
- Submit dengan email tidak valid (misal "abc") menampilkan pesan "Format email tidak valid".
- Submit dengan pesan kurang dari 10 karakter menampilkan pesan "Pesan terlalu pendek".
- Submit dengan semua input valid menampilkan pesan "Pesan berhasil dikirim" dan form dikosongkan.

---

### FR-07: AJAX (Fetch API)

**Deskripsi:** JavaScript mengambil data dari `data.json` secara asynchronous lalu menampilkannya di halaman.

**Detail:**
- Fungsi `initSkillAjax()` dipanggil saat halaman Tentang Kami dibuka.
- `fetch("data.json")` mengambil file JSON dari server.
- Jika berhasil, data di-parse lalu fungsi `tampilkanSkill()` membuat elemen HTML untuk tiap skill.
- Jika gagal (file tidak ditemukan atau CORS error), muncul pesan error ramah yang mengingatkan pengguna untuk membuka lewat local server.

**Kriteria Penerimaan:**
- Halaman Tentang Kami menampilkan daftar skill dari `data.json` tanpa reload halaman.
- Jika `data.json` tidak ditemukan, muncul pesan "Maaf, data skill gagal dimuat. Pastikan website dibuka lewat local server."
- Fetch dilakukan hanya di halaman Tentang Kami, tidak di halaman lain.

---

### FR-08: Navigasi Antar Halaman

**Deskripsi:** Menu navigasi di header memungkinkan pengguna berpindah antar halaman.

**Detail:**
- Navbar berisi link ke `index.html` (Beranda), `about.html` (Tentang Kami), dan `contact.html` (Kontak).
- Link aktif diberi class `active` dengan background biru.
- Navigasi responsif: di mobile, menu disusun vertikal atau wrap ke baris baru.

**Kriteria Penerimaan:**
- Klik menu "Beranda" membuka `index.html`.
- Klik menu "Tentang Kami" membuka `about.html`.
- Klik menu "Kontak" membuka `contact.html`.
- Link aktif diberi highlight visual (background biru).

---

### FR-09: Dark Mode Toggle

**Deskripsi:** Pengguna dapat mengubah tema halaman antara light mode dan dark mode.

**Detail:**
- Tombol dark mode di navbar memiliki ikon bulan (🌙) saat light mode, ikon matahari (☀️) saat dark mode.
- Klik tombol mengganti tema, pilihan disimpan di `localStorage`.
- Saat halaman dibuka lagi, tema yang terakhir dipilih otomatis aktif.

**Kriteria Penerimaan:**
- Klik tombol "Dark Mode" mengubah background menjadi hitam dan teks menjadi putih.
- Klik tombol "Light Mode" mengembalikan ke background putih dan teks hitam.
- Refresh halaman tidak mereset pilihan tema.

---

### FR-10: README dan SRS

**Deskripsi:** Dokumentasi tertulis menjelaskan cara melihat website, struktur HTML, desain CSS, fungsionalitas JavaScript, dan kebutuhan sistem.

**Detail:**
- `README.md` berisi: judul project, nama & NIM, deskripsi, cara melihat website (link GitHub Pages + cara lokal), struktur HTML, desain CSS, fungsionalitas JavaScript, struktur folder, cara validasi, cara aktifkan GitHub Pages.
- `SRS.md` berisi: pendahuluan (tujuan, ruang lingkup), deskripsi umum (pengguna, batasan), kebutuhan fungsional (FR-01 sampai FR-10), kebutuhan non-fungsional (NFR-01 sampai NFR-05).

**Kriteria Penerimaan:**
- README menjelaskan elemen HTML yang dipakai dan alasannya.
- README menjelaskan teknik CSS yang dipakai (Flexbox, Grid, media queries, animasi).
- README menjelaskan letak kode dan cara kerja 5 fitur JavaScript.
- SRS menjelaskan kebutuhan fungsional bernomor (FR-01, FR-02, dst.) dan kebutuhan non-fungsional (NFR-01, dst.).

---

## 4. Kebutuhan Non-Fungsional

Kebutuhan non-fungsional menjelaskan kualitas dan performa yang harus dipenuhi website.

### NFR-01: Aksesibilitas

**Deskripsi:** Website harus dapat diakses oleh pengguna dengan disabilitas.

**Detail:**
- Semua `<img>` memiliki atribut `alt` yang deskriptif.
- Label form dihubungkan dengan input melalui `for` dan `id`.
- Tombol dan link memiliki area klik minimal 44x44px (sesuai WCAG).
- Keyboard navigation berfungsi (outline focus-visible terlihat jelas).
- Kontras warna teks dan background memenuhi WCAG AA (minimal 4.5:1).

**Kriteria Penerimaan:**
- Screen reader dapat membaca seluruh konten halaman.
- Navigasi dengan keyboard (Tab, Enter, Space) berfungsi dengan baik.
- Kontras warna lolos cek kontras WCAG AA.

---

### NFR-02: Performa

**Deskripsi:** Website harus cepat dimuat dan responsif saat interaksi pengguna.

**Detail:**
- Ukuran file CSS maksimal 20KB, file JavaScript maksimal 15KB.
- Gambar foto profil dioptimalkan (maksimal 100KB).
- Tidak ada library eksternal yang memperlambat loading.
- Transisi dan animasi CSS berjalan smooth (60fps).

**Kriteria Penerimaan:**
- Halaman dimuat dalam waktu kurang dari 2 detik di koneksi 4G.
- Tidak ada lag saat klik tombol atau scroll halaman.
- File `data.json` dimuat kurang dari 100ms.

---

### NFR-03: Kompatibilitas Browser

**Deskripsi:** Website harus berjalan dengan baik di browser modern.

**Detail:**
- Mendukung Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.
- JavaScript menggunakan sintaks ES6 (arrow function, let/const, template literal) yang didukung browser modern.
- CSS menggunakan Flexbox dan Grid yang didukung semua browser modern.

**Kriteria Penerimaan:**
- Website diuji di minimal 3 browser dan berfungsi tanpa error.
- Layout tidak rusak di browser apapun.

---

### NFR-04: Responsivitas

**Deskripsi:** Website harus responsif di berbagai ukuran layar tanpa horizontal scroll.

**Detail:**
- Breakpoint: desktop (>768px), tablet (480-768px), mobile (<480px).
- Grid card menyesuaikan jumlah kolom otomatis.
- Navbar berubah layout vertikal di mobile.
- Tidak ada teks terpotong atau elemen keluar viewport.

**Kriteria Penerimaan:**
- Website diuji di layar 1920px (desktop), 768px (tablet), 375px (mobile) dan terlihat baik di semua ukuran.
- Tidak ada horizontal scroll di device apapun.

---

### NFR-05: Keamanan (Client-Side)

**Deskripsi:** Website tidak memiliki celah keamanan yang umum di sisi client.

**Detail:**
- Input form tidak di-execute sebagai script (meskipun tidak dikirim ke server, tetap aman dari XSS lokal).
- Data skill di `data.json` hanya berisi string dan angka, tidak ada kode executable.
- Tidak ada inline script atau eval() yang berbahaya.

**Kriteria Penerimaan:**
- Input form tidak menjalankan script jika pengguna memasukkan `<script>alert('xss')</script>`.
- Tidak ada warning keamanan di console browser.

---

## 5. Antarmuka Pengguna (UI)

### 5.1 Halaman Beranda (index.html)

**Komponen:**
- Page header: judul "Beranda" + deskripsi singkat.
- Hero section: foto profil + nama + intro + 3 tombol CTA.
- Project cards: grid 3 card portofolio dengan tag teknologi.

**Navigasi:**
- Navbar di atas dengan link ke Beranda, Tentang Kami, Kontak, dan tombol dark mode.

---

### 5.2 Halaman Tentang Kami (about.html)

**Komponen:**
- Page header: judul "Tentang Saya" + deskripsi singkat.
- About section: foto profil + biodata (nama, NIM, jurusan, hobi) + daftar skill (dimuat lewat AJAX) + tautan media sosial.
- Tombol sembunyikan/tampilkan foto di bawah foto profil.

**Navigasi:**
- Navbar sama seperti Beranda.

---

### 5.3 Halaman Kontak (contact.html)

**Komponen:**
- Page header: judul "Hubungi Saya" + deskripsi singkat.
- Contact section: formulir kontak (nama, email, pesan) + card info kontak (email langsung, status akademik, media sosial).
- Pesan status di bawah tombol submit (muncul setelah validasi).

**Navigasi:**
- Navbar sama seperti Beranda.

---

## 6. Batasan Implementasi

- Tidak boleh menggunakan framework atau library eksternal (Bootstrap, Tailwind, jQuery, React, npm package).
- Hanya HTML, CSS, dan JavaScript murni.
- File baru yang boleh dibuat hanya: `README.md`, `SRS.md`, dan `data.json`.
- Tidak boleh menambah halaman baru selain yang sudah ada (index, about, contact).
- Gaya kode harus sederhana: `function` biasa, `let`/`const`, `if`/`for`. Tanpa `class`, `module`, atau trik sulit dibaca.
- Tiap function dan blok CSS penting harus diberi komentar singkat berbahasa Indonesia.

---

## 7. Penutup

Dokumen SRS ini menjelaskan seluruh kebutuhan fungsional dan non-fungsional website profil pribadi Pileyo Hananim Zamonokhi Bate'e yang dibuat sebagai tugas UTS Pemrograman Web. Implementasi website harus memenuhi seluruh kebutuhan yang tercantum di dokumen ini agar lolos penilaian.

**Referensi:**
- Soal UTS Pemrograman Web (ringkasan resmi dari dosen).
- W3C HTML Validator: https://validator.w3.org/
- W3C CSS Validator: https://jigsaw.w3.org/css-validator/
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

**Pembuat Dokumen:** Pileyo Hananim Zamonokhi Bate'e - NIM 25091397045  
**Tanggal:** 13 Oktober 2026  
**Versi:** 1.0 (Final)
