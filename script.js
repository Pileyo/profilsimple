
document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    initAboutFoto();
    initContactForm();
    initSkillAjax();
});


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

function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateDarkModeButton(isDark);
}

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

function emailValid(email) {
    const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pola.test(email);
}

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

    if (valNama === "" || valEmail === "" || valPesan === "") {
        statusDiv.className = "error fade-in";
        statusDiv.textContent = "Error: Semua kolom (nama, email, dan pesan) wajib diisi!";

        inputNama.classList.toggle("input-error", valNama === "");
        inputEmail.classList.toggle("input-error", valEmail === "");
        inputPesan.classList.toggle("input-error", valPesan === "");
        return false;
    }

    if (!emailValid(valEmail)) {
        statusDiv.className = "error fade-in";
        statusDiv.textContent = "Error: Format email tidak valid (contoh: nama@domain.com).";
        inputEmail.classList.add("input-error");
        return false;
    }

    if (valPesan.length < 10) {
        statusDiv.className = "error fade-in";
        statusDiv.textContent = "Error: Pesan terlalu pendek, minimal 10 karakter.";
        inputPesan.classList.add("input-error");
        return false;
    }

    inputNama.classList.remove("input-error");
    inputEmail.classList.remove("input-error");
    inputPesan.classList.remove("input-error");

    statusDiv.className = "sukses fade-in";
    statusDiv.textContent = "Pesan berhasil dikirim. Terima kasih, " + valNama + "!";

    if (formPesan) {
        formPesan.reset();
    }

    return false;
}


function initSkillAjax() {
    const daftarSkill = document.getElementById("daftar-skill");
    if (!daftarSkill) return;

    fetch("data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Gagal memuat data (status " + response.status + ")");
            }
            return response.json();
        })
        .then((data) => {
            tampilkanSkill(data, daftarSkill);
        })
        .catch((error) => {
            daftarSkill.innerHTML = "";
            const li = document.createElement("li");
            li.className = "skill-error";
            li.textContent = "Maaf, data skill gagal dimuat. Pastikan website dibuka lewat local server. (" + error.message + ")";
            daftarSkill.appendChild(li);
        });
}

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
    }
}
