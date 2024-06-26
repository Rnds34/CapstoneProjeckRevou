// TOGGLE BUTTON SIDEBAR
// Ambil tombol toggle dan sidebar
const toggleButton = document.querySelector(".toggle-button");
const sidebar = document.querySelector(".sidebar");

// Tambahkan event listener pada tombol toggle
toggleButton.addEventListener("click", function () {
  // Periksa apakah sidebar memiliki kelas 'active'
  const isSidebarActive = sidebar.classList.contains("active");

  // Jika sidebar aktif pada tampilan mobile atau tablet, tambahkan atau hapus kelas 'active'
  if (isSidebarActive && isMobileOrTablet()) {
    sidebar.classList.remove("active");
  } else if (!isSidebarActive && isMobileOrTablet()) {
    sidebar.classList.add("active");
  }
});

// Fungsi untuk mengecek apakah tampilan saat ini adalah mobile atau tablet
function isMobileOrTablet() {
  return window.innerWidth <= 1024; // Ubah ukuran sesuai dengan breakpoint CSS Anda
}

