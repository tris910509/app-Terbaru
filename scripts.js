$(document).ready(function () {
    // Load data from JSON file
    function loadData(endpoint) {
        $.getJSON(`data/${endpoint}.json`, function (data) {
            renderTable(data, endpoint);
        });
    }

    // Render table
    function renderTable(data, endpoint) {
        let tableHtml = `<table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>`;

        $.each(data, function (index, item) {
            tableHtml += `<tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-primary btn-edit" data-id="${item.id}">Edit</button>
                    <button class="btn btn-danger btn-delete" data-id="${item.id}">Delete</button>
                </td>
            </tr>`;
        });

        tableHtml += `</tbody></table>`;
        $('#crud-content').html(tableHtml);
    }

    // Event listeners for nav links
    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        const endpoint = $(this).attr('id').replace('nav-', '');
        loadData(endpoint);
    });

    // Edit and Delete button actions
    $('#crud-content').on('click', '.btn-edit', function () {
        const id = $(this).data('id');
        alert(`Edit item with ID: ${id}`); // Implement edit functionality here
    });

    $('#crud-content').on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        alert(`Delete item with ID: ${id}`); // Implement delete functionality here
    });
});
