document.addEventListener("DOMContentLoaded", function () {
    const entities = ["customers", "suppliers", "categories", "products", "transactions"];
    let currentEntity = "";
    const formModal = new bootstrap.Modal(document.getElementById("formModal"));
    const transactionModal = new bootstrap.Modal(document.getElementById("transactionModal"));

    // Load all entities
    entities.forEach((entity) => loadData(entity));

    // Show CRUD form
    window.showForm = function (entity) {
        currentEntity = entity;
        document.getElementById("data-name").value = "";
        document.getElementById("data-quantity").value = "";
        document.getElementById("formModalLabel").innerText = `Add ${entity}`;
        formModal.show();
    };

    // Save CRUD Data
    document.getElementById("dataForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("data-name").value.trim();
        const quantity = parseInt(document.getElementById("data-quantity").value) || null;

        if (!name) {
            alert("Name is required.");
            return;
        }

        const data = JSON.parse(localStorage.getItem(currentEntity)) || [];
        data.push({ id: Date.now(), name, quantity });
        localStorage.setItem(currentEntity, JSON.stringify(data));
        loadData(currentEntity);
        formModal.hide();
    });

    // Load Data
    window.loadData = function (entity) {
        const listElement = document.getElementById(`${entity}-list`);
        const data = JSON.parse(localStorage.getItem(entity)) || [];
        let html = `<table class="table table-bordered">
            <thead><tr><th>#</th><th>Name</th><th>Actions</th></tr></thead><tbody>`;

        data.forEach((item, index) => {
            html += `<tr>
                <td>${index + 1}</td>
                <td>${item.name} ${item.quantity ? `(${item.quantity})` : ""}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick='editData("${entity}", ${item.id})'>Edit</button>
                    <button class="btn btn-danger btn-sm" onclick='deleteData("${entity}", ${item.id})'>Delete</button>
                </td>
            </tr>`;
        });

        html += "</tbody></table>";
        listElement.innerHTML = html;
    };

    // Edit and Delete Data
    window.editData = function (entity, id) {
        // Implementation for editing
    };

    window.deleteData = function (entity, id) {
        // Implementation for deleting
    };

    // Show Transaction Form
    window.showTransactionForm = function () {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const productSelect = document.getElementById("product-select");
        productSelect.innerHTML = products.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
        transactionModal.show();
    };

    // Save Transaction
    document.getElementById("transactionForm").addEventListener("submit", function (e) {
        e.preventDefault();
        // Implementation for saving transactions and updating stock
    });

    // Generate Report
    window.generateReport = function () {
        // Implementation for generating reports
    };
});
