var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/admin/category/GetAll",
            "type": "GET",
            "datatype":"json"
        },
        "columns": [
            { "data": "name", "width": "60%" },
            { "data": "displayOrder", "width": "10%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Admin/category/Upsert/${data}" class='btn btn-success text-white' style='cursor:pointer; width:100px;'>
                                    <i class='far fa-edit'></i> Sửa
                                </a>
                                &nbsp;
                                <a onclick=Delete("/Admin/category/Delete/${data}") class='btn btn-danger text-white' style='cursor:pointer; width:100px;'>
                                    <i class='far fa-trash-alt'></i> Xóa
                                </a>
                            </div>
                            `;
                }, "width": "30%"
            }
        ],
        "language": {
            "emptyTable": "Không có dữ liệu",
            "paginate": {
                "previous": "Lùi",
                "next": "Tới"
            },
            "sSearch": "Tìm kiếm:",
            //"info": "Đang hiện _START_ đến _END_ của _TOTAL_ mẫu tin",
            "info": "Tổng _TOTAL_ mẫu tin",
            "sLengthMenu": "Hiện _MENU_ mẫu tin",
        },
        "width":"100%"
    });
}

function Delete(url) {
    swal({
        title: "Bạn có chắc chắn muốn xóa không?",
        text: "Bạn sẽ không thể khôi phục lại nó!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý!",
        cancelButtonText: "Hủy",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function (data) {
                if (data.success) {
                    toastr.success(data.message);
                    dataTable.ajax.reload();

                }
                else {
                    toastr.error(data.message);
                }
            }
        });
    });
}

