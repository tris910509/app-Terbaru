document.addEventListener("DOMContentLoaded", function () {
    const entities = ["customers", "suppliers", "categories", "products", "transactions"];
    entities.forEach((entity) => {
        loadData(entity);
    });

    const formModal = new bootstrap.Modal(document.getElementById("formModal"));
    let currentEntity = "";

    // Show Form
    window.showForm = function (entity) {
        currentEntity = entity;
        document.getElementById("data-name").value = "";
        document.getElementById("formModalLabel").innerText = `Add ${entity}`;
        formModal.show();
    };

    // Save Data
    document.getElementById("dataForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("data-name").value;
        const data = JSON.parse(localStorage.getItem(currentEntity)) || [];
        data.push({ id: Date.now(), name });
        localStorage.setItem(currentEntity, JSON.stringify(data));
        loadData(currentEntity);
        formModal.hide();
    });

    // Load Data
    window.loadData = function (entity) {
        const listElement = document.getElementById(`${entity}-list`);
        const data = JSON.parse(localStorage.getItem(entity)) || [];
        let html = "<table class='table table-bordered'><tr><th>#</th><th>Name</th><th>Actions</th></tr>";
        data.forEach((item, index) => {
            html += `<tr>
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>
                            <button class='btn btn-warning btn-sm' onclick='editData("${entity}", ${item.id})'>Edit</button>
                            <button class='btn btn-danger btn-sm' onclick='deleteData("${entity}", ${item.id})'>Delete</button>
                        </td>
                     </tr>`;
        });
        html += "</table>";
        listElement.innerHTML = html;
    };

    // Edit Data
    window.editData = function (entity, id) {
        const data = JSON.parse(localStorage.getItem(entity)) || [];
        const item = data.find((d) => d.id === id);
        if (item) {
            currentEntity = entity;
            document.getElementById("data-name").value = item.name;
            document.getElementById("formModalLabel").innerText = `Edit ${entity}`;
            formModal.show();
            data.splice(data.indexOf(item), 1); // Remove old data
            localStorage.setItem(entity, JSON.stringify(data));
        }
    };

    // Delete Data
    window.deleteData = function (entity, id) {
        let data = JSON.parse(localStorage.getItem(entity)) || [];
        data = data.filter((d) => d.id !== id);
        localStorage.setItem(entity, JSON.stringify(data));
        loadData(entity);
    };

    // Generate Report
    window.generateReport = function () {
        const reportsElement = document.getElementById("reports-list");
        let reportHtml = "<ul>";
        entities.forEach((entity) => {
            const data = JSON.parse(localStorage.getItem(entity)) || [];
            reportHtml += `<li>${entity}: ${data.length} records</li>`;
        });
        reportHtml += "</ul>";
        reportsElement.innerHTML = reportHtml;
    };
});
