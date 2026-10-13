# Penjelasan Lengkap Kodingan Website Profil

Berikut penjelasan masing-masing bagian kode (HTML, CSS, JavaScript) dan fungsi-fungsi penting yang digunakan. Setiap konsep dijelaskan sekali saja agar tidak berulang.

---

## 1. HTML – Struktur & Elemen

| Elemen / Atribut | Penjelasan |
|------------------|------------|
| `<!DOCTYPE html>` | Memberitahu browser bahwa dokumen ini adalah HTML5. |
| `<html lang="id">` | Menetapkan bahasa halaman sebagai Bahasa Indonesia (untuk aksesibilitas & SEO). |
| `<header>` | Bagian atas halaman yang berisi navigasi dan tombol tema. |
| `<nav>` | Kelompok tautan navigasi (Beranda, Tentang Kami, Kontak). |
| `<main>` | Kontainer utama konten halaman; setiap halaman hanya boleh memiliki satu `<main>`. |
| `<section>` | Membagi konten menjadi blok logis (mis. `#profil`, `#projects`, `#about-section`). |
| `<footer>` | Bagian bawah halaman, biasanya berisi hak cipta. |
| `<form>` | Formulir untuk mengirim pesan di `contact.html`. |
| `<label>` | Menyambungkan teks label dengan input melalui atribut `for` yang cocok dengan `id` input. Klik label otomatis fokus ke input terkait. |
| `<input>` / `<textarea>` | Tempat pengguna mengetik data (nama, email, pesan). |
| `<button type="submit">` | Tombol untuk mengirimkan data form. |
| `<img src="foto.jpg" alt="...">` | Menampilkan gambar. Atribut `alt` memberikan teks alternatif untuk aksesibilitas dan SEO. |
| `id="..."` | Identifier unik pada elemen, banyak digunakan oleh JavaScript via `getElementById`. |
| `class="..."` | Kelas yang dapat digunakan oleh banyak elemen sekaligus, biasanya untuk styling via CSS. |
| `href="..."` | Menentukan tujuan tautan; navigasi memakai `href="index.html"`, `href="about.html"`, `href="contact.html"`. |
| `aria-label="..."` | Teks deskripsi untuk teknologi pembaca layar (aksesibilitas). |

---

## 2. CSS – Desain, Tata Letak & Animasi

### Variabel Dasar (`:root`)
```css
:root {
  --primary: #2563eb;
  --bg: #f8fafc;
  /* ... */
}
```
Menyimpan nilai yang dapat di‑reuse di seluruh stylesheet (mis. warna utama, background). Mengubah satu variabel akan memperbarui semua penggunaannya.

### Reset Dasar
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- `box-sizing: border-box` memastikan lebar/tinggi elemen sudah mencakup padding dan border, sehingga tidak meluber.
- Menghapus margin dan padding bawaan browser agar tampilan konsisten di semua perangkat.

### Margin vs Padding
- **Margin**: ruang di **luar** elemen, menjarakkan elemen dari elemen tetangga (contoh: `margin-bottom: 12px`).
- **Padding**: ruang di **dalam** elemen, antara konten dan border (contoh: `padding: 24px` pada `.card`).

### Tipografi
- `font-family`: jenis font (disini memakai font bawaan sistem untuk cepat dan tidak terkesan “AI‑generated”).
- `font-size`: ukuran teks.
- `font-weight`: ketebalan teks (400 normal, 700 bold).
- `line-height`: tinggi baris (mis. 1.6 × ukuran font).
- `text-align`: perataan teks (left, center, right).

### Layout dengan Flexbox
```css
display: flex;
align-items: center;
justify-content: space-between;
gap: 12px;
```
- `display: flex` membuat elemen menjadi flex container.
- `align-items: center` menyusun item secara vertikal di tengah.
- `justify-content: space-between` menyebarkan item sehingga ujung kiri & kanan rapat.
- `gap` memberi jarak antar item.
Digunakan di navbar, hero, tombol grup, form, foto‑wrapper, dan contact‑info‑card.

### Layout dengan Grid
```css
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 24px;
```
- `display: grid` membuat elemen menjadi grid container.
- `grid-template-columns` mendefinisikan jumlah dan lebar kolom (3 kolom sama lebar).
- `minmax(0, 1fr)` mencegah kolom meluap jika kontennya panjang.
- `gap` memberi jarak antar sel grid.
Digunakan pada `.projects-grid`, `.skill-list`, `.biodata-grid`, dan `#contact-section`.

### Posisisi Sticky
```css
position: sticky;
top: 0;
z-index: 10;
```
- `position: sticky` membuat elemen “menempel” di layar saat discroll.
- `top: 0` menempel pada posisi paling atas viewport.
- `z-index` menentukan urutan tumpukan; nilai lebih tinggi = berada di depan.

### Pseudo‑element `::after`
```css
h2::after {
  content: '';
  /* styling garis bawah */
}
```
Menambahkan elemen palsu setelah konten; digunakan untuk membuat garis pendek di bawah setiap `<h2>`.

### Transisi & Animasi
- `transition: all 0.2s ease` – perubahan properti (warna, transform, shadow) berjalan selama 0.2 detik dengan kurva easing.
- `transform: translateY(-4px)` – menggeser elemen ke atas 4 px (efek “angkat” saat hover).
- `@keyframes fadeIn` – mendefinisikan animasi dari opacity 0 menjadi opacity 1 + sedikit gerak naik.
- `animation: fadeIn 0.4s ease forwards` – menjalankan animasi fadeIn selama 0.4 detik dan mempertahankan keadaan akhir.

### Responsif (Media Query)
```css
@media (max-width: 768px) { /* tata letak untuk tablet */ }
@media (max-width: 480px)  { /* tata letak untuk ponsel */ }
```
Mengubah jumlah kolom grid, menyusun navbar menjadi vertikal, dan mengurangi padding agar tampilan nyaman pada layar kecil.

### Dark Mode
```css
body.dark-mode {
  background-color: #000000;
  color: #ffffff;
}
/* overriden warna untuk card, form, tombol, dll ketika body memiliki class dark-mode */
```
Kelas `dark-mode` ditambahkan/ dihapus oleh JavaScript pada `<body>`. Selektor turunan lalu mengganti warna latar, teks, border, dan bayangan agar sesuai tema gelap.

---

## 3. JavaScript – Interaktivitas

### `document.addEventListener("DOMContentLoaded", ...)`
Menunggu sampai seluruh struktur HTML ter‑parse sebelum menjalankan kode, sehingga pemanggilan seperti `getElementById` tidak akan menghasilkan `null`.

### Mengambil Elemen
- `document.getElementById("nama")` – Mengambil elemen berdasarkan atribut `id` unik.
- `document.querySelector(".nav-menu a.active")` – Mengambil elemen pertama yang cocok dengan selector CSS (lebih fleksibel).

### Event Listener
```js
element.addEventListener("click", fungsi);
```
Mendaftarkan fungsi yang akan dipanggil ketika terjadi peristiwa (klik, submit, input, storage, dll).

### Mencegah Perilaku Default
```js
event.preventDefault();
```
Dalam formulir, mencegah halaman merefresh saat tombol submit diklik agar kita bisa menangani data dengan AJAX atau validasi.

### Manipulasi Kelas (`classList`)
- `.add("kelas")` – Menambahkan kelas.
- `.remove("kelas")` – Menghapus kelas.
- `.toggle("kelas")` – Tambah jika belum ada, hapus jika sudah ada.
- `.contains("kelas")` – Mengecek keberadaan kelas.
Digunakan untuk menambahkan/ menghapus kelas seperti `dark-mode`, `input-error`, atau `fade-in`.

### Penyimpanan Lokal (`localStorage`)
```js
localStorage.setItem("key", "value");   // menyimpan
localStorage.getItem("key");            // membaca
localStorage.removeItem("key");         // menghapus
```
Menyimpan data di browser sehingga tetap ada setelah halaman di‑refresh. Pada project ini digunakan untuk menyimpan preferensi tema (`"dark"` atau `"light"`).

### Sinkronisasi Antar Tab (`storage` event)
```js
window.addEventListener("storage", (e) => {
  if (e.key === "theme") {
    // perbarui tema sesuai nilai baru dari localStorage
  }
});
```
Memantau perubahan `localStorage` yang berasal dari tab lain; sehingga ketika satu tab mengubah tema, tab lain otomatis mengikuti.

### Mengganti Tampilan Inline
```js
element.style.display = "none";   // menyembunyikan
element.style.display = "block";  // menampilkan
```
Digunakan untuk menyembunyikan/ menampilkan foto profil pada halaman about.html.

### Mengubah Atribut & Konten
```js
element.setAttribute("aria-label", "Beralih ke Light Mode");
element.innerHTML = '<span class="material-symbols-outlined">light_mode</span> Light';
element.textContent = "Pesan berhasil dikirim";
```
- `setAttribute` mengubah atribut HTML (mis. `aria-label` untuk aksesibilitas).
- `innerHTML` menyisipkan markup HTML (ikon Material Symbols + teks).
- `textContent` hanya menyisipkan teks murni tanpa tag (untuk menghindari XSS).

### Membuat Elemen Baru
```js
const li = document.createElement("li");
li.className = "skill-item fade-in";
li.appendChild(judul);
li.appendChild(tingkat);
li.appendChild(deskripsi);
wadah.appendChild(li);
```
Membuat elemen dari nol (`li`, `h4`, `span`, `p`), menyiapkan kelas dan konten, kemudian menambahkannya ke dalam wadah (mis. `<ul id="daftar-skill">`).

### AJAX Modern dengan `fetch()`
```js
fetch("data.json")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => tampilkanSkill(data, daftarSkill))
  .catch(error => {
    // tampilkan pesan ramah
  });
```
- Mengambil file JSON dari server (diperlukan lokal server karena fitur fetch memblokir file://).
- `.then` pertama menangani respons HTTP dan mengubahnya menjadi objek JavaScript (`response.json()`).
- `.then` kedua menerima data dan memanggil fungsi untuk menampilkannya.
- `.catch` menangani kegagalan (mis. file tidak ditemukan atau offline).

### JSON Parsing (implisit)
`response.json()` secara otomatis mengubah teks JSON menjadi array/objek JavaScript, setara dengan `JSON.parse(text)`.

### Perulangan Array
```js
for (let i = 0; i < data.length; i++) {
  const skill = data[i];
  // proses tiap skill
}
```
Mengiterasi setiap objek dalam array `data` untuk menghasilkan satu kartu skill per item.

### Validasi Form
```js
if (valNama === "" || valEmail === "" || valPesan === "") { /* error */ }
if (!emailValid(valEmail)) { /* error format email */ }
if (valPesan.length < 10) { /* error panjang pesan */ }
```
- `.trim()` menghapus spasi di awal/akhir sebelum pengecekan.
- Regex sederhana `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` memastikan format email memiliki `@` dan titik di belakangnya.
- Memeriksa panjang minimal pesan (10 karakter) agar tidak terlalu pendek.

### Mengosongkan Form
```js
formPesan.reset();
```
Mengembalikan semua input form ke nilai kosong setelah pengiriman berhasil.

---

## 4. Penjelasan Fungsi‑Fungsi di `script.js`

| Fungsi | Fungsi & Implementasi (ringkas) |
|--------|--------------------------------|
| `initDarkMode()` | Membaca tema dari `localStorage`, menambahkan/menghapus kelas `dark-mode` pada `<body>`, memperbarui tampilan tombol, mengikat klik tombol ke `toggleDarkMode()`, serta menambahkan listener `storage` untuk sinkronisasi tema antar tab. |
| `toggleDarkMode()` | Mengganti kelas `dark-mode` pada `<body>` dengan `.toggle()`, menyimpan nilai baru (`"dark"` atau `"light"`) ke `localStorage`, lalu memperbarui tampilan tombol melalui `updateDarkModeButton()`. |
| `updateDarkModeButton(isDark)` | **DOM manipulation**: mengubah `innerHTML` tombol sehingga menampilkan ikon Material Symbols (`light_mode` atau `dark_mode`) dan teks “Light”/“Dark”. Mengubah `aria-label` untuk aksesibilitas. |
| `initAboutFoto()` | Mencari tombol `#btn-sembunyi` dan `#btn-tampil`, mengikat klik masing‑masing ke fungsi `sembunyikanFoto()` dan `tampilkanFoto()`. |
| `sembunyikanFoto()` / `tampilkanFoto()` | **Style manipulation**: mengubah properti `style.display` elemen foto profil menjadi `"none"` (sembunyikan) atau `"block"` (tampilkan). |
| `initContactForm()` | Mengikat event `submit` pada form ke `handleKirimPesan()`. Selain itu, menambahkan event `input` pada tiap field (nama, email, pesan) agar kelas `input-error` dihapus saat pengguna mulai mengetik (validasi real‑time). |
| `emailValid(email)` | Mengembalikan `true` bila string sesuai pola `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, yaitu format email sederhana yang valid. |
| `handleKirimPesan(event)` | Mencegah reload halaman (`preventDefault()`), mengambil nilai input, melakukan tiga tahap validasi (kosong, format email, panjang pesan ≥10). Jika error: menampilkan pesan error dengan kelas `error fade-in` dan menandai input yang bermasalah. Jika berhasil: menampilkan pesan sukses dengan kelas `sukses fade-in`, mengosongkan form, dan menambahkan animasi fade‑in. |
| `initSkillAjax()` | Mengecek keberadaan elemen `#daftar-skill` (hanya ada di about.html). Mengambil `data.json` lewat `fetch()`. Jika berhasil, menjalankan `tampilkanSkill(data, daftarSkill)`; jika gagal, menampilkan pesan error ramah di elemen tersebut. |
| `tampilkanSkill(data, wadah)` | Mengosongkan isi wadah. Jika data kosong, menampilkan pesan “Belum ada data skill”. Jika ada, membuat untuk tiap objek skill: `<li class="skill-item fade-in">` berisi `<h4>` (nama skill), `<span class="skill-tingkat">` (tingkat), dan `<p>` (deskripsi). Semua elemen ini dibuat via `document.createElement()` dan ditambahkan ke wadah dengan `appendChild()`. Kelas `fade-in` memicu animasi CSS saat muncul. |

---

## 5. Cara Menguji Secara Lokal

1. Pastikan kamu memiliki Python ter‑instal.
2. Buka terminal / command prompt dan pindah ke folder proyek:
   ```bash
   cd C:/javascript
   ```
3. Jalankan server sederhana:
   ```bash
   python -m http.server 8000
   ```
4. Buka browser dan akses `http://localhost:8000/index.html`.
5. Uji fitur:
   - Tombol Dark/Light mengubah tema dan mensinkronkan antar tab.
   - Klik “Sembunyikan Foto” / “Tampilkan Foto” pada halaman Tentang Kami.
   - Isi formulir Kontak; validasi nama, email (format @ dan .), pesan minimal 10 karakter.
   - Biarkan halaman tentang‑kami men‑load skill dari `data.json` lewat AJAX (harus terlihat daftar skill dengan animasi fade‑in).

Setelah puash, kamu dapat menyimpan perubahan dan meng‑push ke GitHub (sudah dilakukan sebelumnya). Website akan otomatis ter‑publish di GitHub Pages di alamat:

```
https://pileyo.github.io/profilsimple/
```

---

*File `penjelasan.md` ini dibuat agar kamu memiliki dokumentasi offline yang menjelaskan setiap bagian kode dengan detail namun tanpa redundansi. Semoga membantu dalam memahami dan mempresentasikan tugas UTS Pemrograman Web.*  