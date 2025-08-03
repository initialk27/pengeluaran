// 🧠 Format input Rp pakai titik otomatis
const rupiahInput = document.getElementById('rupiah');
rupiahInput.addEventListener('input', function () {
  let angka = this.value.replace(/[^\d]/g, ''); // hanya angka
  this.value = angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
});

// ✅ Saat halaman dimuat, cek apakah nomor WA sudah disimpan
window.addEventListener('DOMContentLoaded', () => {
  const savedNumber = localStorage.getItem('userPhone');
  if (savedNumber) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainForm').style.display = 'block';
    document.getElementById('gantiNomorWrapper').style.display = 'block'; // tampilkan tombol ganti nomor
  }

  isiTanggalHariOtomatis();
});

// ✅ Simpan nomor WA ketika klik tombol masuk
document.getElementById('masukBtn').addEventListener('click', function () {
  const nomorInput = document.getElementById('userPhone').value.trim();

  if (!/^08\d{8,13}$/.test(nomorInput)) {
    alert('Nomor tidak valid. Gunakan format seperti: 081234567890');
    return;
  }

  localStorage.setItem('userPhone', nomorInput);
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainForm').style.display = 'block';
  document.getElementById('gantiNomorWrapper').style.display = 'block'; // tampilkan tombol ganti nomor
});

// 🔄 Reset form
document.getElementById('resetBtn').addEventListener('click', function () {
  document.getElementById('pengeluaran-form').reset();
  isiTanggalHariOtomatis(); // isi ulang tanggal setelah reset
});

// 📩 Kirim ke WhatsApp
document.getElementById('pengeluaran-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const hari = document.getElementById('hari').value.trim();
  const tanggal = document.getElementById('tanggal').value.trim();
  const bulan = document.getElementById('bulan').value.trim();
  const tahun = document.getElementById('tahun').value.trim();
  const rupiah = document.getElementById('rupiah').value.trim();
  const keterangan = document.getElementById('keterangan').value.trim();

  // Validasi dasar
  if (!/^[a-zA-Z\s]+$/.test(hari)) {
    alert('Kolom Hari hanya boleh huruf.');
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(bulan)) {
    alert('Kolom Bulan hanya boleh huruf.');
    return;
  }

  if (!/^\d+$/.test(tanggal) || !/^\d+$/.test(tahun)) {
    alert('Tanggal dan Tahun hanya boleh angka.');
    return;
  }

  if (!/^\d{1,3}(\.\d{3})*$/.test(rupiah)) {
    alert('Format Rupiah tidak valid.');
    return;
  }

  // Ambil nomor dari localStorage
  const nomorWA = localStorage.getItem('userPhone');
  if (!nomorWA) {
    alert("Nomor WhatsApp tidak ditemukan.");
    return;
  }

  // Format pesan WhatsApp
  const message = `Hari ${hari}, Tanggal ${tanggal}, Bulan ${bulan}, Tahun ${tahun}

Rp ${rupiah}

${keterangan}`;

  const waUrl = `https://wa.me/${nomorWA.replace(/^0/, '62')}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
});

// 📅 Auto isi hari & tanggal saat halaman dibuka
function isiTanggalHariOtomatis() {
  const now = new Date();

  const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulanList = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  document.getElementById('hari').value = hariList[now.getDay()];
  document.getElementById('tanggal').value = now.getDate();
  document.getElementById('bulan').value = bulanList[now.getMonth()];
  document.getElementById('tahun').value = now.getFullYear();
}

// 🧹 Ganti Nomor WhatsApp (hapus localStorage)
document.getElementById('gantiNomorBtn').addEventListener('click', function () {
  const konfirmasi = confirm("Yakin ingin mengganti nomor WhatsApp?");
  if (konfirmasi) {
    localStorage.removeItem('userPhone');
    document.getElementById('mainForm').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('gantiNomorWrapper').style.display = 'none'; // sembunyikan tombol ganti nomor
  }
});


// =============================
// 📄 TAMPILKAN RIWAYAT & TOTAL
// =============================
// function tampilkanRiwayat() {
//   const list = document.getElementById('riwayat-list');
//   const totalText = document.getElementById('total-hari-ini');
//   const data = JSON.parse(localStorage.getItem('riwayatPengeluaran')) || [];

//   list.innerHTML = '';
//   let total = 0;

//   data.forEach(item => {
//     const li = document.createElement('li');
//     li.textContent = `${item.tanggal}/${item.bulan}/${item.tahun} - ${item.kategori}: Rp ${item.rupiah} (${item.keterangan})`;
//     list.appendChild(li);

//     total += parseInt(item.rupiah.replace(/\./g, '')) || 0;
//   });

//   totalText.textContent = `Total: Rp ${formatRupiah(String(total))}`;
// }


// localStorage.clear();

// const data = localStorage.getItem('riwayatPengeluaran') || '';
// const sizeInBytes = new Blob([data]).size;
// console.log(`Ukuran: ${sizeInBytes} byte`);

