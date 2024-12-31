// Load data dari LocalStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadUsers);

const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').querySelector('tbody');

// Event listener untuk menyimpan user
userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const user = {
        id: document.getElementById('userId').value,
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        address: document.getElementById('userAddress').value,
        status: document.getElementById('userStatus').value
    };

    saveUser(user);
    userForm.reset();
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
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
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

    deleteUser(index); // Hapus data sementara untuk diupdate
}
