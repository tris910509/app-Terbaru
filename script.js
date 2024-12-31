// Load data dari LocalStorage saat halaman dimuat
        document.addEventListener('DOMContentLoaded', loadUsers);

        const userForm = document.getElementById('userForm');
        const userTable = document.getElementById('userTable').querySelector('tbody');

        // Fungsi validasi input
        function validateForm(user) {
            if (!user.id || !user.name || !user.email || !user.phone || !user.address || !user.status) {
                alert('Semua field wajib diisi.');
                return false;
            }

            // Validasi format email
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(user.email)) {
                alert('Format email tidak valid.');
                return false;
            }

            // Validasi nomor handphone (harus berupa angka)
            if (isNaN(user.phone)) {
                alert('No handphone hanya boleh berisi angka.');
                return false;
            }

            return true;
        }

        // Event listener untuk menyimpan user
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const user = {
                id: document.getElementById('userId').value,
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                phone: document.getElementById('userPhone').value,
                address: document.getElementById('userAddress').value,
                status: document.getElementById('userStatus').value
            };

            if (!validateForm(user)) return; // Validasi form sebelum menyimpan

            if (userForm.dataset.index !== undefined) {
                updateUser(user, userForm.dataset.index);
            } else {
                saveUser(user);
            }
            
            userForm.reset();
            userForm.removeAttribute('data-index'); // Hapus data index setelah selesai
            loadUsers();
        });

        // Fungsi untuk menyimpan user ke LocalStorage
        function saveUser(user) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Fungsi untuk memuat data user ke tabel
        function loadUsers() {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            userTable.innerHTML = ''; // Kosongkan tabel
            users.forEach((user, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.address}</td>
                    <td>${user.status}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Hapus</button>
                    </td>
                `;
                userTable.appendChild(row);
            });
        }

        // Fungsi untuk menghapus user
        function deleteUser(index) {
            if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                users.splice(index, 1);
                localStorage.setItem('users', JSON.stringify(users));
                loadUsers();
            }
        }

        // Fungsi untuk mengedit user
        function editUser(index) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users[index];

            document.getElementById('userId').value = user.id;
            document.getElementById('userName').value = user.name;
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userPhone').value = user.phone;
            document.getElementById('userAddress').value = user.address;
            document.getElementById('userStatus').value = user.status;

            userForm.dataset.index = index; // Tambahkan data index untuk mengetahui user yang di-edit
        }

        // Fungsi untuk memperbarui user
        function updateUser(user, index) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users[index] = user; // Update data berdasarkan index
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Fungsi untuk mengurutkan tabel
        function sortTable(column, order) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.sort((a, b) => {
                if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
                if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
                return 0;
            });
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
        }

        // Fungsi untuk filter berdasarkan status
        function filterUsers(status) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            userTable.innerHTML = ''; // Kosongkan tabel
            users.filter(user => !status || user.status === status).forEach((user, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.address}</td>
                    <td>${user.status}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Hapus</button>
                    </td>
                `;
                userTable.appendChild(row);
            });
        }
