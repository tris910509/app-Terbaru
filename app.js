document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    // Helper function to retrieve products from localStorage
    const getProducts = () => {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
    };

    // Helper function to save products to localStorage
    const saveProducts = (products) => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    // Function to render products in the table
    const renderProducts = () => {
        const products = getProducts();
        productTable.innerHTML = '';
        products.forEach((product, index) => {
            const row = productTable.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <button class="btn btn-primary" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
                </td>
            `;
        });
    };

    // Function to add a new product
    const addProduct = (product) => {
        const products = getProducts();
        products.push(product);
        saveProducts(products);
        renderProducts();
    };

    // Function to update a product
    const updateProduct = (id, updatedProduct) => {
        const products = getProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            saveProducts(products);
        }
    };

    // Function to delete a product
    const deleteProduct = (id) => {
        const products = getProducts();
        const updatedProducts = products.filter((product) => product.id !== id);
        saveProducts(updatedProducts);
        renderProducts();
    };

    // Function to edit a product
    const editProduct = (id) => {
        const products = getProducts();
        const product = products.find((product) => product.id === id);
        if (product) {
            productNameInput.value = product.name;
            productPriceInput.value = product.price;
            productForm.setAttribute('data-edit-id', id);
        }
    };

    // Event listener for form submission
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = productForm.getAttribute('data-edit-id');
        const name = productNameInput.value.trim();
        const price = productPriceInput.value.trim();

        if (name && price) {
            if (id) {
                updateProduct(id, { name, price });
                productForm.removeAttribute('data-edit-id');
            } else {
                const newProduct = { id: Date.now().toString(), name, price };
                addProduct(newProduct);
            }

            productNameInput.value = '';
            productPriceInput.value = '';
        }
    });

    // Initial load
    renderProducts();
});
