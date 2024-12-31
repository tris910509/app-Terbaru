let products = [
    { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },
    { id: 2, name: 'Product 2', price: 150, category: 'Category 2' },
    { id: 3, name: 'Product 3', price: 200, category: 'Category 1' },
];

let cartItems = [];
let transactions = [];

function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Price: $${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });

    const posProductSelect = document.getElementById('posProduct');
    products.forEach(product => {
        posProductSelect.innerHTML += `<option value="${product.id}">${product.name} - $${product.price}</option>`;
    });
}

function addToCart() {
    const productId = parseInt(document.getElementById('posProduct').value);
    const quantity = parseInt(document.getElementById('posQuantity').value);
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ id: productId, name: product.name, price: product.price, quantity });
        }
        updateCart();
    }
}

function updateCart() {
    const cartTable = document.getElementById('cartTable').querySelector('tbody');
    cartTable.innerHTML = '';
    cartItems.forEach(item => {
        const total = item.price * item.quantity;
        cartTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${total}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    });
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
}

function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const paymentStatus = document.getElementById('paymentStatus').value;
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    transactions.push({ id: Date.now(), items: [...cartItems], totalAmount, paymentStatus });
    alert('Checkout completed!');
    cartItems = [];
    updateCart();
    loadTransactionHistory();
}

function loadTransactionHistory() {
    const tbody = document.getElementById('transactionHistoryTable').querySelector('tbody');
    tbody.innerHTML = '';
    transactions.forEach(transaction => {
        const items = JSON.parse(transaction.items.map(item => JSON.stringify(item)));
        items.forEach(item => {
            tbody.innerHTML += `
                <tr>
                    <td>${transaction.id}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${transaction.totalAmount}</td>
                    <td>${transaction.paymentStatus}</td>
                </tr>
            `;
        });
    });
}

function generateTransactionReport(filterType) {
    const ctx = document.getElementById('reportChart').getContext('2d');
    let labels = [];
    let data = [];

    switch (filterType) {
        case 'daily':
            labels = ['2024-12-01', '2024-12-02', '2024-12-03'];
            data = [10, 20, 30]; // Example daily data
            break;
        case 'monthly':
            labels = ['December', 'November', 'October'];
            data = [500, 1000, 1500]; // Example monthly data
            break;
        case 'yearly':
            labels = ['2024', '2023', '2022'];
            data = [5000, 10000, 15000]; // Example yearly data
            break;
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Transaction Report',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateProfile() {
    alert('Profile updated successfully!');
}

window.onload = function() {
    loadProducts();
    loadTransactionHistory();
}
