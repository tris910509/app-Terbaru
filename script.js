let userIdCounter = 1;

function addUser() {
    const idUser = document.getElementById('idUser').value.trim();
    const namaUser = document.getElementById('namaUser').value.trim();
    const emailUser = document.getElementById('emailUser').value.trim();
    const noHpUser = document.getElementById('noHpUser').value.trim();
    const alamatUser = document.getElementById('alamatUser').value.trim();
    const statusUser = document.getElementById('statusUser').value.trim();

    if (namaUser && emailUser && noHpUser && alamatUser && statusUser) {
        const tbody = document.getElementById('tableUser').querySelector('tbody');
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${userIdCounter++}</td>
            <td>${namaUser}</td>
            <td>${emailUser}</td>
            <td>${noHpUser}</td>
            <td>${alamatUser}</td>
            <td>${statusUser}</td>
        `;

        document.getElementById('formUser').reset();
    } else {
        alert('Please fill in all fields!');
    }
}



let kategoriIdCounter = 1;

function addKategori() {
    const idKategori = document.getElementById('idKategori').value.trim();
    const namaKategori = document.getElementById('namaKategori').value.trim();

    if (namaKategori) {
        const tbody = document.getElementById('tableKategoriBarang').querySelector('tbody');
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${kategoriIdCounter++}</td>
            <td>${namaKategori}</td>
        `;

        document.getElementById('formKategoriBarang').reset();
    } else {
        alert('Please enter a category name!');
    }
}



let supplierIdCounter = 1;

function addSupplier() {
    const idSupplier = document.getElementById('idSupplier').value.trim();
    const namaSupplier = document.getElementById('namaSupplier').value.trim();
    const noHpSupplier = document.getElementById('noHpSupplier').value.trim();
    const namaPerusahaan = document.getElementById('namaPerusahaan').value.trim();
    const alamatSupplier = document.getElementById('alamatSupplier').value.trim();

    if (namaSupplier && noHpSupplier && namaPerusahaan && alamatSupplier) {
        const tbody = document.getElementById('tableSupplier').querySelector('tbody');
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${supplierIdCounter++}</td>
            <td>${namaSupplier}</td>
            <td>${noHpSupplier}</td>
            <td>${namaPerusahaan}</td>
            <td>${alamatSupplier}</td>
        `;

        document.getElementById('formSupplier').reset();
    } else {
        alert('Please fill in all fields!');
    }
}




let produkIdCounter = 1;

function addProduk() {
    const idProduk = document.getElementById('idProduk').value.trim();
    const namaProduk = document.getElementById('namaProduk').value.trim();
    const namaKategoriProduk = document.getElementById('namaKategoriProduk').value.trim();
    const namaSupplierProduk = document.getElementById('namaSupplierProduk').value.trim();
    const stokProduk = document.getElementById('stokProduk').value.trim();
    const hargaProduk = document.getElementById('hargaProduk').value.trim();
    const statusProduk = document.getElementById('statusProduk').value.trim();
    const keteranganProduk = document.getElementById('keteranganProduk').value.trim();

    if (namaProduk && namaKategoriProduk && namaSupplierProduk && stokProduk && hargaProduk && statusProduk) {
        const tbody = document.getElementById('tableProduk').querySelector('tbody');
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${produkIdCounter++}</td>
            <td>${namaProduk}</td>
            <td>${namaKategoriProduk}</td>
            <td>${namaSupplierProduk}</td>
            <td>${stokProduk}</td>
            <td>${hargaProduk}</td>
            <td>${statusProduk}</td>
            <td>${keteranganProduk}</td>
        `;

        document.getElementById('formProduk').reset();
    } else {
        alert('Please fill in all fields!');
    }
}





let transaksiIdCounter = 1;

function addTransaksi() {
    const idTransaksi = document.getElementById('idTransaksi').value.trim();
    const namaPelangganTransaksi = document.getElementById('namaPelangganTransaksi').value.trim();
    const namaProdukTransaksi = document.getElementById('namaProdukTransaksi').value.trim();
    const namaKategoriTransaksi = document.getElementById('namaKategoriTransaksi').value.trim();
    const jumlahTransaksi = document.getElementById('jumlahTransaksi').value.trim();
    const diskonTransaksi = document.getElementById('diskonTransaksi').value.trim();
    const statusTransaksi = document.getElementById('statusTransaksi').value.trim();

    const hargaProduk = 100; // Mock harga produk (ubah sesuai dengan logika data produk)
    const totalTransaksi = jumlahTransaksi * hargaProduk - diskonTransaksi;
    const kembalianTransaksi = totalTransaksi; // Asumsi pembayaran penuh

    if (namaPelangganTransaksi && namaProdukTransaksi && namaKategoriTransaksi && jumlahTransaksi && statusTransaksi) {
        const tbody = document.getElementById('tableTransaksiPOS').querySelector('tbody');
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${transaksiIdCounter++}</td>
            <td>${namaPelangganTransaksi}</td>
            <td>${namaProdukTransaksi}</td>
            <td>${namaKategoriTransaksi}</td>
            <td>${jumlahTransaksi}</td>
            <td>${diskonTransaksi}</td>
            <td>${totalTransaksi}</td>
            <td>${kembalianTransaksi}</td>
            <td>${statusTransaksi}</td>
        `;

        document.getElementById('formTransaksiPOS').reset();
    } else {
        alert('Please fill in all fields!');
    }
}




let pembayaranIdCounter = 1;

function konfirmasiPesanan() {
    const idPembayaranPesanan = document.getElementById('idPembayaranPesanan').value.trim();
    const namaPelangganPembayaran = document.getElementById('namaPelangganPembayaran').value.trim();
    const detailTransaksiPembayaran = document.getElementById('detailTransaksiPembayaran').value.trim();
    const konfirmasiPembayaran = document.getElementById('konfirmasiPembayaran').value.trim();
    const buktiPembayaran = document.getElementById('buktiPembayaran').files[0];

    if (namaPelangganPembayaran && detailTransaksiPembayaran && konfirmasiPembayaran && buktiPembayaran) {
        const tbody = document.getElementById('tableKonfirmasiPesanan').querySelector('tbody');
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${pembayaranIdCounter++}</td>
            <td>${namaPelangganPembayaran}</td>
            <td>${detailTransaksiPembayaran}</td>
            <td>${konfirmasiPembayaran}</td>
            <td><img src="${URL.createObjectURL(buktiPembayaran)}" alt="Bukti Pembayaran" width="100"></td>
        `;

        document.getElementById('formKonfirmasiPesanan').reset();
    } else {
        alert('Please fill in all fields!');
    }
}



function generateLaporan() {
    const tanggal = document.getElementById('laporanTanggal').value.trim();
    const bulan = document.getElementById('laporanBulan').value.trim();
    const tahun = document.getElementById('laporanTahun').value.trim();

    // Mock data (ganti dengan logika data sebenarnya)
    const laporanData = [
        {
            namaPelanggan: 'John Doe',
            namaUser: 'Admin',
            pesanan: 'Produk A x 2',
            status: 'Lunas',
            pembayaran: 'Cash',
            buktiPembayaran: '', // Link bukti pembayaran
            kategori: 'Kategori A',
            supplier: 'Supplier A'
        }
    ];

    const tbody = document.getElementById('tableLaporanTransaksi').querySelector('tbody');
    tbody.innerHTML = ''; // Clear previous data

    laporanData.forEach(laporan => {
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${laporan.namaPelanggan}</td>
            <td>${laporan.namaUser}</td>
            <td>${laporan.pesanan}</td>
            <td>${laporan.status}</td>
            <td>${laporan.pembayaran}</td>
            <td>${laporan.buktiPembayaran ? `<img src="${laporan.buktiPembayaran}" alt="Bukti Pembayaran" width="100">` : '-'}</td>
            <td>${laporan.kategori}</td>
            <td>${laporan.supplier}</td>
        `;
    });
}






function generateGrafik() {
    const laporanData = [
        { tanggal: '2024-01-01', jumlahPesanan: 10 },
        { tanggal: '2024-01-02', jumlahPesanan: 15 },
        // Mock data for grafik
    ];

    const dates = laporanData.map(d => d.tanggal);
    const counts = laporanData.map(d => d.jumlahPesanan);

    const ctx = document.getElementById('grafikLaporan').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Jumlah Pesanan',
                data: counts,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        }
    });
}






let penggunaIdCounter = 1;

function addPengguna() {
    const idPengguna = document.getElementById('idPengguna').value.trim();
    const namaPengguna = document.getElementById('namaPengguna').value.trim();
    const tanggalLahirPengguna = document.getElementById('tanggalLahirPengguna').value.trim();
    const noHpPengguna = document.getElementById('noHpPengguna').value.trim();
    const alamatPengguna = document.getElementById('alamatPengguna').value.trim();

    if (namaPengguna && tanggalLahirPengguna && noHpPengguna && alamatPengguna) {
        const tbody = document.getElementById('tablePengguna').querySelector('tbody');
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${penggunaIdCounter++}</td>
            <td>${namaPengguna}</td>
            <td>${tanggalLahirPengguna}</td>
            <td>${noHpPengguna}</td>
            <td>${alamatPengguna}</td>
        `;

        document.getElementById('formPengguna').reset();
    } else {
        alert('Please fill in all fields!');
    }
}







let pesananPenggunaIdCounter = 1;

function addPesananPengguna() {
    const idPesananPelanggan = document.getElementById('idPesananPelanggan').value.trim();
    const namaPenggunaPesanan = document.getElementById('namaPenggunaPesanan').value.trim();
    const namaProdukPesanan = document.getElementById('namaProdukPesanan').value.trim();
    const jumlahProdukPesanan = document.getElementById('jumlahProdukPesanan').value.trim();
    const statusPesananPengguna = document.getElementById('statusPesananPengguna').value.trim();

    if (namaPenggunaPesanan && namaProdukPesanan && jumlahProdukPesanan && statusPesananPengguna) {
        const tbody = document.getElementById('tablePesananPengguna').querySelector('tbody');
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${pesananPenggunaIdCounter++}</td>
            <td>${namaPenggunaPesanan}</td>
            <td>${namaProdukPesanan}</td>
            <td>${jumlahProdukPesanan}</td>
            <td>${statusPesananPengguna}</td>
        `;

        document.getElementById('formPesananPengguna').reset();
    } else {
        alert('Please fill in all fields!');
    }
}






