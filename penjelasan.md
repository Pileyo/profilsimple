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

Di bawah ini adalah **penjelasan per blok kode** yang ada di file `script.js` supaya lebih mudah dipahami dari nol. Bagian ini menjelaskan **alur, tujuan, dan kenapa sintaks itu ditulis** seperti itu.

### 4.1 Pintu Masuk: `DOMContentLoaded`

```js
document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    initAboutFoto();
    initContactForm();
    initSkillAjax();
});
```

- **`document.addEventListener`** = "pasang telinga ke halaman web".
- **`"DOMContentLoaded"`** = event yang **terpicu ketika struktur HTML selesai dimuat** (tapi belum tentu gambar/stylesheet selesai).
- Tanda **`(event) => { ... }`** = **arrow function** (fungsi singkat). Di sini tidak ada parameter karena kita tidak butuh objek event-nya.
- Isinya memanggil **4 fungsi inisialisasi** yang masing-masing mengurus fitur tertentu.
- **Kenapa harus dibungkus ini?** Karena kalau JavaScript dijalankan **sebelum** HTML siap, `document.getElementById(...)` akan mengembalikan `null` (elemen belum ada). Dengan menunggu `DOMContentLoaded`, kita **jamin semua elemen sudah ada** sebelum diproses.

---

### 4.2 Inisialisasi Dark Mode: `initDarkMode()`

```js
function initDarkMode() {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    updateDarkModeButton(isDark);

    const btnDarkMode = document.getElementById("btn-dark-mode");
    if (btnDarkMode) {
        btnDarkMode.addEventListener("click", toggleDarkMode);
    }

    window.addEventListener("storage", (event) => { ... });
}
```

**Penjelasan baris demi baris:**

1. **`const savedTheme = localStorage.getItem("theme");`**
   - `localStorage` = tempat menyimpan data **di browser** (tidak hilang setelah refresh/ditutup).
   - `.getItem("theme")` = ambil nilai dengan kunci `"theme"`. Hasilnya string (`"dark"`, `"light"`) atau `null` kalau belum pernah disimpan.
2. **`const isDark = savedTheme === "dark";`**
   - Membandingkan string. **Hasilnya boolean** (`true` atau `false`).
3. **`if (isDark) { document.body.classList.add("dark-mode"); }`**
   - `classList.add("dark-mode")` = **tambah class** `dark-mode` ke elemen `<body>`. Di CSS, body dengan class ini warnanya jadi hitam/putih.
4. **`updateDarkModeButton(isDark);`**
   - Memanggil fungsi pembantu untuk **mengubah tampilan tombol** (ikon + teks) sesuai tema.
5. **`document.getElementById("btn-dark-mode")`**
   - Mengambil elemen tombol dari HTML berdasarkan `id="btn-dark-mode"`.
6. **`if (btnDarkMode) { ... }`**
   - Pengecekan keamanan: kalau tombol **tidak ada** di halaman, jangan pasang listener (biar tidak error).
7. **`btnDarkMode.addEventListener("click", toggleDarkMode);`**
   - Kalau tombol diklik, jalankan fungsi `toggleDarkMode`.
   - Kita **cuma menulis nama fungsi** (tanpa `()`) supaya yang dikirim ke listener adalah **referensi**, bukan hasil panggilannya.
8. **`window.addEventListener("storage", (event) => { ... })`**
   - `storage` = event yang **terpicu di tab lain** ketika `localStorage` berubah.
   - Jadi kalau kamu buka 2 tab dan ganti tema di tab A, **tab B otomatis ikut** tanpa refresh.

---

### 4.3 Toggle Dark Mode: `toggleDarkMode()`

```js
function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateDarkModeButton(isDark);
}
```

- **`classList.toggle("dark-mode")`** = pintar: kalau class **belum ada** → ditambah, kalau **sudah ada** → dihapus. Sekaligus **mengembalikan boolean** (`true` jika baru ditambahkan, `false` jika baru dihapus).
- **`localStorage.setItem("theme", ...)`** = simpan tema baru ke localStorage.
- **`isDark ? "dark" : "light"`** = **ternary operator** (cara singkat `if/else`). Jika `isDark` true, simpan `"dark"`, jika false simpan `"light"`.
- **`updateDarkModeButton(isDark)`** = perbarui tampilan tombol.

---

### 4.4 Update Tombol: `updateDarkModeButton(isDark)`

```js
function updateDarkModeButton(isDark) {
    const btnDarkMode = document.getElementById("btn-dark-mode");
    if (!btnDarkMode) return;

    if (isDark) {
        btnDarkMode.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">light_mode</span> Light';
        btnDarkMode.setAttribute("aria-label", "Beralih ke Light Mode");
    } else {
        btnDarkMode.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">dark_mode</span> Dark';
        btnDarkMode.setAttribute("aria-label", "Beralih ke Dark Mode");
    }
}
```

- **`if (!btnDarkMode) return;`** = kalau tombol tidak ditemukan, **langsung berhenti** (early return). Ini mencegah error.
- **`innerHTML = "..."`** = **ganti seluruh isi HTML** tombol. Di sini kita sisipkan `<span>` dengan class Material Symbols untuk menampilkan **ikon** (bulan/sun).
- **`setAttribute("aria-label", "...")`** = ubah atribut `aria-label` untuk **screen reader** (pembaca layar tunanetra).
- **Logika kebalikan**: ketika tema **dark**, tombol menampilkan ikon `light_mode` (artinya "klik untuk pindah ke light"). Sebaliknya untuk light.

---

### 4.5 Inisialisasi Tombol Foto: `initAboutFoto()`

```js
function initAboutFoto() {
    const btnSembunyi = document.getElementById("btn-sembunyi");
    const btnTampil = document.getElementById("btn-tampil");

    if (btnSembunyi) {
        btnSembunyi.addEventListener("click", sembunyikanFoto);
    }

    if (btnTampil) {
        btnTampil.addEventListener("click", tampilkanFoto);
    }
}
```

- Mengambil 2 tombol: `#btn-sembunyi` dan `#btn-tampil`.
- Setiap tombol **dicek dulu** (`.if`), lalu dipasang event klik.
- Pengecekan `if (btnSembunyi)` = `if (btnSembunyi !== null)`, karena **`null` adalah falsy**.
- Ini pola aman supaya fungsi tidak error di halaman yang **tidak punya tombol tersebut** (mis. `index.html` tidak punya `#btn-sembunyi`).

---

### 4.6 Fungsi Tampil/Sembunyi Foto

```js
function sembunyikanFoto() {
    const foto = document.getElementById("foto-profil");
    if (foto) {
        foto.style.display = "none";
    }
}

function tampilkanFoto() {
    const foto = document.getElementById("foto-profil");
    if (foto) {
        foto.style.display = "block";
    }
}
```

- **`foto.style.display = "none"`** = `display:none` di CSS artinya **elemen hilang total** (tidak makan tempat di layout).
- **`"block"`** = tampil sebagai **blok** (pindah baris). Untuk `<img>`, nilai defaultnya `inline-block`, jadi `"block"` cukup untuk menampilkannya kembali.
- `if (foto)` lagi-lagi pengecekan defensif.

---

### 4.7 Inisialisasi Form Kontak: `initContactForm()`

```js
function initContactForm() {
    const formPesan = document.getElementById("form-pesan");
    if (formPesan) {
        formPesan.addEventListener("submit", handleKirimPesan);
    }

    const inputIds = ["nama", "email", "pesan"];
    inputIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", () => {
                if (el.value.trim() !== "") {
                    el.classList.remove("input-error");
                }
            });
        }
    });
}
```

- **Submit listener**: saat form di-submit (tombol Kirim atau tekan Enter), jalankan `handleKirimPesan`. Di sana nanti ada `event.preventDefault()` agar halaman **tidak reload**.
- **Array `["nama", "email", "pesan"]`**: daftar id input.
- **`.forEach((id) => { ... })`**: untuk **setiap id**, ambil elemen dan pasang listener. Ini lebih ringkas daripada nulis `getElementById` 3 kali.
- **Event `"input"`** vs `"change"`: `"input"` terpicu **setiap kali pengguna mengetik** karakter. Kita pakai ini untuk **menghapus border merah** (`input-error`) begitu user mulai memperbaiki input.
- **`.trim() !== ""`**: `.trim()` menghapus spasi di awal/akhir. Jadi kalau user cuma ngetik spasi, tetap dianggap kosong.
- **Arrow function `() => { ... }`**: fungsi anonim (tanpa nama) yang langsung didefinisikan di tempat. Dipakai karena kita **tidak perlu memanggilnya dari tempat lain**.

---

### 4.8 Validasi Email: `emailValid(email)`

```js
function emailValid(email) {
    const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pola.test(email);
}
```

- **`const pola = /.../`** = **regular expression** (regex), pola pencocokan teks. Diapit tanda `/` di awal-akhir.
- **Penjelasan pola per bagian:**
  - **`^`** = harus mulai dari awal string.
  - **`[^\s@]+`** = **satu atau lebih** karakter yang **bukan** whitespace (`\s`) dan **bukan** `@`.
  - **`@`** = literal tanda `@` (harus ada).
  - **`[^\s@]+`** = lagi, satu atau lebih karakter (bukan spasi, bukan @).
  - **`\.`** = literal tanda **titik** (backslash `\` membuat titik jadi karakter biasa, tanpa `\` titik artinya "kecuali karakter apapun").
  - **`[^\s@]+`** = lagi, satu atau lebih karakter (bagian domain, mis. `com`).
  - **`$`** = harus sampai akhir string.
- **Contoh yang lolos:** `budi@gmail.com`, `nama.panjang@sub.domain.co.id`.
- **Contoh yang gagal:** `budi`, `budi@`, `@gmail.com`, `budi@gmail` (tanpa titik).
- **`pola.test(email)`** = method regex yang mengembalikan `true` kalau cocok, `false` kalau tidak.
- **`return`**: `emailValid` selalu mengembalikan **nilai boolean** (true/false).

---

### 4.9 Proses Kirim Pesan: `handleKirimPesan(event)`

Ini adalah **fungsi terpanjang** di script.js, jadi kita pecah:

#### 4.9.1 Mencegah Reload & Ambil Elemen

```js
function handleKirimPesan(event) {
    if (event) {
        event.preventDefault();
    }

    const inputNama = document.getElementById("nama");
    const inputEmail = document.getElementById("email");
    const inputPesan = document.getElementById("pesan");
    const statusDiv = document.getElementById("status-pesan");
    const formPesan = document.getElementById("form-pesan");

    if (!inputNama || !inputEmail || !inputPesan || !statusDiv) return false;
}
```

- **`event.preventDefault()`**: form HTML secara default **akan reload halaman** saat di-submit. `preventDefault()` **membatalkan perilaku default** itu, supaya kita bisa memproses data dengan JavaScript murni.
- **`if (event)`** = kalau fungsi dipanggil manual (tanpa event), `event` akan `undefined`. Pengecekan ini mencegah error.
- **Mengambil 5 elemen** sekaligus dari HTML.
- **Pengecekan akhir** `if (!inputNama || !inputEmail || ...)`: kalau salah satu tidak ada, **hentikan fungsi** dengan `return false`.

#### 4.9.2 Ambil Nilai Input

```js
const valNama = inputNama.value.trim();
const valEmail = inputEmail.value.trim();
const valPesan = inputPesan.value.trim();
```

- **`.value`**: properti yang berisi **teks yang sedang diketik** user di input/textarea.
- **`.trim()`**: hapus spasi di awal/akhir. Tanpa `.trim()`, input `"   "` (cuma spasi) akan dianggap terisi.

#### 4.9.3 Validasi 1: Cek Kosong

```js
if (valNama === "" || valEmail === "" || valPesan === "") {
    statusDiv.className = "error fade-in";
    statusDiv.textContent = "Error: Semua kolom (nama, email, dan pesan) wajib diisi!";

    inputNama.classList.toggle("input-error", valNama === "");
    inputEmail.classList.toggle("input-error", valEmail === "");
    inputPesan.classList.toggle("input-error", valPesan === "");
    return false;
}
```

- **`||`** = operator **OR** (atau). Kalau salah satu kosong, kondisi jadi `true`.
- **`statusDiv.className = "error fade-in"`**: ganti **semua class** di `<div>` status menjadi `"error fade-in"`. Ini:
  - `error` = class CSS yang memberi warna merah.
  - `fade-in` = class yang memicu animasi fade.
- **`textContent`**: isi **teks murni** ke div (tanpa tag HTML). Lebih aman dari `innerHTML` untuk mencegah injeksi tag.
- **`classList.toggle("input-error", valNama === "")`**: **bentuk 2-argumen** dari toggle. Arti: kalau `valNama === ""` true, **tambah** class. Kalau false, **hapus** class. Lebih ringkas dari `if/else`.
- **`return false`**: hentikan fungsi (jangan lanjut ke validasi berikutnya).

#### 4.9.4 Validasi 2: Cek Format Email

```js
if (!emailValid(valEmail)) {
    statusDiv.className = "error fade-in";
    statusDiv.textContent = "Error: Format email tidak valid (contoh: nama@domain.com).";
    inputEmail.classList.add("input-error");
    return false;
}
```

- **`!emailValid(valEmail)`** = "bukan email valid" → kalau `emailValid` mengembalikan `false`, `!false` jadi `true`, masuk blok.
- **`classList.add("input-error")`**: tambah class untuk border merah.
- Note: kita **tidak menghapus** class `input-error` di sini, tapi **real-time listener** di `initContactForm` akan menghapusnya saat user mulai mengetik.

#### 4.9.5 Validasi 3: Cek Panjang Pesan

```js
if (valPesan.length < 10) {
    statusDiv.className = "error fade-in";
    statusDiv.textContent = "Error: Pesan terlalu pendek, minimal 10 karakter.";
    inputPesan.classList.add("input-error");
    return false;
}
```

- **`.length`**: properti string yang berisi **jumlah karakter**.
- Minimal 10 karakter agar pesan tidak terlalu singkat.

#### 4.9.6 Sukses

```js
inputNama.classList.remove("input-error");
inputEmail.classList.remove("input-error");
inputPesan.classList.remove("input-error");

statusDiv.className = "sukses fade-in";
statusDiv.textContent = "Pesan berhasil dikirim. Terima kasih, " + valNama + "!";

if (formPesan) {
    formPesan.reset();
}

return false;
```

- **Hapus semua class error** dari 3 input.
- **Ganti class status** ke `sukses` (CSS: hijau) + `fade-in` (animasi muncul).
- **Tampilkan pesan sukses** dengan menyisipkan nama user.
- **`formPesan.reset()`**: **method bawaan form HTML** yang mengosongkan semua input. Cepat & bersih.
- **`return false`**: tetap kembalikan `false` agar form tidak submit ke server (sesuai logika preventDefault).

---

### 4.10 Inisialisasi AJAX Skill: `initSkillAjax()`

```js
function initSkillAjax() {
    const daftarSkill = document.getElementById("daftar-skill");
    if (!daftarSkill) return;

    fetch("data.json")
        .then((response) => { ... })
        .then((data) => { ... })
        .catch((error) => { ... });
}
```

- **Cek `#daftar-skill`**: hanya ada di `about.html`. Kalau tidak ada, **fungsi berhenti lebih awal** (return). Jadi di `index.html`/`contact.html`, AJAX **tidak pernah dipanggil** dan tidak error.
- **`fetch("data.json")`**: ambil file `data.json` dari server. Mengembalikan **Promise** (objen yang merepresentasikan hasil yang akan datang).
- **`.then(...)`**: jalankan fungsi ini **kalau Promise sukses**.
- **`.catch(...)`**: jalankan fungsi ini **kalau Promise gagal**.

#### Isi `.then` Pertama

```js
.then((response) => {
    if (!response.ok) {
        throw new Error("Gagal memuat data (status " + response.status + ")");
    }
    return response.json();
})
```

- **`response.ok`**: boolean. `true` kalau status HTTP 200-299.
- **`throw new Error(...)`**: **melempar error** secara manual. Alih-alih lanjut, eksekusi langsung loncat ke `.catch`.
- **`response.json()`**: **parsing** body respons dari teks JSON menjadi **array/objek JavaScript**. Ini juga mengembalikan Promise.

#### Isi `.then` Kedua

```js
.then((data) => {
    tampilkanSkill(data, daftarSkill);
})
```

- `data` di sini adalah array of object skill.
- Panggil `tampilkanSkill` untuk **me-render** setiap skill jadi elemen HTML.

#### Isi `.catch`

```js
.catch((error) => {
    daftarSkill.innerHTML = "";
    const li = document.createElement("li");
    li.className = "skill-error";
    li.textContent = "Maaf, data skill gagal dimuat. Pastikan website dibuka lewat local server. (" + error.message + ")";
    daftarSkill.appendChild(li);
});
```

- **`innerHTML = ""`**: kosongkan isi `<ul>` dulu (mis. ada loading text sebelumnya).
- **Buat elemen `<li>` baru** untuk pesan error.
- **`error.message`**: pesan error asli (mis. `"Gagal memuat data (status 404)"`).
- **Pesan yang ditampilkan** ramah: memberitahu user untuk **buka lewat local server** kalau masalahnya CORS/file://.

---

### 4.11 Render Skill: `tampilkanSkill(data, wadah)`

```js
function tampilkanSkill(data, wadah) {
    wadah.innerHTML = "";

    if (!data || data.length === 0) {
        const li = document.createElement("li");
        li.className = "skill-loading";
        li.textContent = "Belum ada data skill.";
        wadah.appendChild(li);
        return;
    }

    for (let i = 0; i < data.length; i++) {
        const skill = data[i];
        // ... buat li + h4 + span + p
    }
}
```

- **Kosongkan dulu** `wadah` (`<ul id="daftar-skill">`). Supaya data lama hilang.
- **Cek data kosong**: kalau `null`/`undefined` atau array kosong, tampilkan pesan "Belum ada data skill".
- **`.length`**: jumlah item dalam array.
- **`!data`**: cek apakah `data` `null`/`undefined`.

#### Loop Buat Tiap Skill

```js
const li = document.createElement("li");
li.className = "skill-item fade-in";

const judul = document.createElement("h4");
judul.textContent = skill.nama;

const tingkat = document.createElement("span");
tingkat.className = "skill-tingkat";
tingkat.textContent = skill.tingkat;

const deskripsi = document.createElement("p");
deskripsi.textContent = skill.deskripsi;

li.appendChild(judul);
li.appendChild(tingkat);
li.appendChild(deskripsi);
wadah.appendChild(li);
```

- **Perulangan `for` klasik**: dari `i=0` sampai `i < data.length`. Tiap iterasi proses 1 skill.
- **`document.createElement("li")`**: buat **elemen baru** sesuai tag.
- **`.className`**: set/ubah atribut `class`.
- **`.textContent`**: isi teks (aman dari XSS, **tidak memproses tag HTML**).
- **`.appendChild(judul)`**: **tempelkan** elemen child ke parent. Urutan append = urutan tampil.
- **Akhir loop**: `wadah.appendChild(li)` → tempelkan `<li>` ke `<ul>`.

#### Bentuk Data di `data.json`

```json
[
  { "nama": "HTML", "tingkat": "Pemula", "deskripsi": "Bisa membuat halaman web semantik." },
  { "nama": "CSS",  "tingkat": "Pemula", "deskripsi": "Bisa styling dan layout responsif." }
]
```

- Saat `response.json()` parsing, JSON di atas menjadi **array of object** di JavaScript.
- Tiap objek punya **properti `nama`, `tingkat`, `deskripsi`** yang diakses via `skill.nama`, dll.

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