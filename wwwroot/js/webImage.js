var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/admin/webimage/GetAll",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "50%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Admin/webimage/Upsert/${data}" class='btn btn-success text-white' style='cursor:pointer; width:100px;'>
                                    <i class='far fa-edit'></i> Edit
                                </a>
                                &nbsp;
                                <a onclick=Delete("/Admin/webimage/Delete/${data}") class='btn btn-danger text-white' style='cursor:pointer; width:100px;'>
                                    <i class='far fa-trash-alt'></i> Delete
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
        title: "Bạn thật sự muốn xóa hay không?",
        text: "Bạn sẽ không thể khôi phục lại nó!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        closeOnconfirm: true
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

