/**
 * Tugas UTS Pemrograman Web - JavaScript
 * Lima fitur JavaScript yang diimplementasikan:
 * 1. Event Handling   : klik tombol dark mode, tombol sembunyikan/tampilkan foto, submit form.
 * 2. DOM Manipulation : mengubah isi tombol, membuat daftar skill, menampilkan pesan status.
 * 3. Style & Animation: menambah/menghapus class (dark-mode, input-error, fade-in) dan animasi CSS.
 * 4. Form Validation  : memvalidasi nama, email, dan pesan pada contact.html.
 * 5. AJAX             : mengambil data.json dengan fetch() lalu menampilkannya di about.html.
 */

// Jalankan semua fitur setelah struktur HTML selesai dimuat.
document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    initAboutFoto();
    initContactForm();
    initSkillAjax();
});

/* ==========================================================================
   1. FITUR DARK MODE - Event Handling + Style (Semua Halaman)
   ========================================================================== */

// Menyiapkan tema saat halaman pertama dibuka.
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
        // Event handling: tombol diklik lalu tema berganti.
        btnDarkMode.addEventListener("click", toggleDarkMode);
    }

    // Sinkronisasi tema antar tab browser yang terbuka.
    window.addEventListener("storage", (event) => {
        if (event.key === "theme") {
            const newTheme = event.newValue;
            const isDarkNow = newTheme === "dark";
            if (isDarkNow) {
                document.body.classList.add("dark-mode");
            } else {
                document.body.classList.remove("dark-mode");
            }
            updateDarkModeButton(isDarkNow);
        }
    });
}

// Mengganti tema gelap/terang saat tombol diklik.
function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateDarkModeButton(isDark);
}

// DOM manipulation: mengubah teks tombol sesuai tema aktif.
function updateDarkModeButton(isDark) {
    const btnDarkMode = document.getElementById("btn-dark-mode");
    if (!btnDarkMode) return;

    if (isDark) {
        btnDarkMode.textContent = "Light";
        btnDarkMode.setAttribute("aria-label", "Beralih ke Light Mode");
    } else {
        btnDarkMode.textContent = "Dark";
        btnDarkMode.setAttribute("aria-label", "Beralih ke Dark Mode");
    }
}

/* ==========================================================================
   2. FITUR FOTO PROFIL - Event Handling + Style (Halaman Tentang Kami)
   ========================================================================== */

// Menghubungkan tombol dengan fungsi sembunyikan/tampilkan foto.
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

// Style manipulation: mengubah properti display foto menjadi none.
function sembunyikanFoto() {
    const foto = document.getElementById("foto-profil");
    if (foto) {
        foto.style.display = "none";
    }
}

// Style manipulation: mengembalikan foto agar terlihat lagi.
function tampilkanFoto() {
    const foto = document.getElementById("foto-profil");
    if (foto) {
        foto.style.display = "block";
    }
}

/* ==========================================================================
   3. FITUR FORM KONTAK - Form Validation + DOM Manipulation (Halaman Kontak)
   ========================================================================== */

// Menyiapkan event submit dan membersihkan tanda error saat pengguna mengetik.
function initContactForm() {
    const formPesan = document.getElementById("form-pesan");
    if (formPesan) {
        formPesan.addEventListener("submit", handleKirimPesan);
    }

    // Hapus style error secara real-time saat pengguna mengisi input.
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

// Memeriksa format email sederhana memakai pola teks.
function emailValid(email) {
    const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pola.test(email);
}

// Validasi form lalu tampilkan pesan sukses atau error.
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

    const valNama = inputNama.value.trim();
    const valEmail = inputEmail.value.trim();
    const valPesan = inputPesan.value.trim();

    // Validasi 1: semua kolom wajib diisi.
    if (valNama === "" || valEmail === "" || valPesan === "") {
        statusDiv.className = "error fade-in";
        statusDiv.textContent = "Error: Semua kolom (nama, email, dan pesan) wajib diisi!";

        inputNama.classList.toggle("input-error", valNama === "");
        inputEmail.classList.toggle("input-error", valEmail === "");
        inputPesan.classList.toggle("input-error", valPesan === "");
        return false;
    }

    // Validasi 2: format email harus benar.
    if (!emailValid(valEmail)) {
        statusDiv.className = "error fade-in";
        statusDiv.textContent = "Error: Format email tidak valid (contoh: nama@domain.com).";
        inputEmail.classList.add("input-error");
        return false;
    }

    // Validasi 3: pesan minimal 10 karakter.
    if (valPesan.length < 10) {
        statusDiv.className = "error fade-in";
        statusDiv.textContent = "Error: Pesan terlalu pendek, minimal 10 karakter.";
        inputPesan.classList.add("input-error");
        return false;
    }

    // Semua valid: hilangkan tanda error pada input.
    inputNama.classList.remove("input-error");
    inputEmail.classList.remove("input-error");
    inputPesan.classList.remove("input-error");

    // DOM manipulation + animasi fade-in: tampilkan notifikasi sukses.
    statusDiv.className = "sukses fade-in";
    statusDiv.textContent = "Pesan berhasil dikirim. Terima kasih, " + valNama + "!";

    // Kosongkan form setelah berhasil divalidasi.
    if (formPesan) {
        formPesan.reset();
    }

    return false;
}

/* ==========================================================================
   4. FITUR AJAX - fetch() data.json (Halaman Tentang Kami)
   ========================================================================== */

// Mengambil data skill dari data.json lalu menampilkannya di halaman.
function initSkillAjax() {
    const daftarSkill = document.getElementById("daftar-skill");
    if (!daftarSkill) return; // Hanya berjalan di halaman yang punya elemen ini.

    // fetch() mengambil file JSON dari server.
    fetch("data.json")
        .then((response) => {
            // Jika file tidak ditemukan atau server error, lempar error.
            if (!response.ok) {
                throw new Error("Gagal memuat data (status " + response.status + ")");
            }
            return response.json();
        })
        .then((data) => {
            tampilkanSkill(data, daftarSkill);
        })
        .catch((error) => {
            // Penanganan error: tampilkan pesan ramah jika fetch gagal.
            daftarSkill.innerHTML = "";
            const li = document.createElement("li");
            li.className = "skill-error";
            li.textContent = "Maaf, data skill gagal dimuat. Pastikan website dibuka lewat local server. (" + error.message + ")";
            daftarSkill.appendChild(li);
        });
}

// DOM manipulation: membuat elemen daftar skill dari data JSON.
function tampilkanSkill(data, wadah) {
    wadah.innerHTML = "";

    if (!data || data.length === 0) {
        const li = document.createElement("li");
        li.className = "skill-loading";
        li.textContent = "Belum ada data skill.";
        wadah.appendChild(li);
        return;
    }

    // Perulangan membuat satu kartu skill untuk tiap data.
    for (let i = 0; i < data.length; i++) {
        const skill = data[i];

        const li = document.createElement("li");
        li.className = "skill-item fade-in"; // class fade-in memicu animasi CSS.

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
    }
}
