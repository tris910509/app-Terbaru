document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    // Helper functions to handle localStorage
    const getProducts = () => {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
    };

    const saveProducts = (products) => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    const addProduct = (product) => {
        const products = getProducts();
        products.push(product);
        saveProducts(products);
    };

    const getAllProducts = () => {
        const products = getProducts();
        renderProducts(products);
    };

    const updateProduct = (id, updatedProduct) => {
        const products = getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            saveProducts(products);
        }
    };

    const deleteProduct = (id) => {
        const products = getProducts();
        const filteredProducts = products.filter((p) => p.id !== id);
        saveProducts(filteredProducts);
    };

    const renderProducts = (products) => {
        productTable.innerHTML = '';
        products.forEach((product, index) => {
            const row = productTable.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <button class="btn btn-primary" onclick="editProduct(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="removeProduct(${product.id})">Delete</button>
                </td>
            `;
        });
    };

    const addProductFromForm = (e) => {
        e.preventDefault();
        const id = Date.now().toString(); // Generate unique ID
        const name = productNameInput.value;
        const price = productPriceInput.value;

        if (name && price) {
            addProduct({ id, name, price });
            productNameInput.value = '';
            productPriceInput.value = '';
            getAllProducts();
        }
    };

    const editProduct = (index) => {
        const products = getProducts();
        const product = products[index];
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productForm.setAttribute('data-edit-id', product.id);
    };

    const updateProductFromForm = (e) => {
        e.preventDefault();
        const id = productForm.getAttribute('data-edit-id');
        const name = productNameInput.value;
        const price = productPriceInput.value;

        if (name && price && id) {
            updateProduct(id, { name, price });
            productNameInput.value = '';
            productPriceInput.value = '';
            productForm.removeAttribute('data-edit-id');
            getAllProducts();
        }
    };

    const removeProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
            getAllProducts();
        }
    };

    // Event listeners
    productForm.addEventListener('submit', function(e) {
        if (productForm.getAttribute('data-edit-id')) {
            updateProductFromForm(e);
        } else {
            addProductFromForm(e);
        }
    });

    // Initial load
    getAllProducts();
});
