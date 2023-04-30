toastr.options.closeButton = true;
toastr.options.timeout = 2000;
toastr.options.progressBar = true;
toastr.options.positionClass = 'toast-top-right';
toastr.options.extendedTimeOut = 1000;
function deleteProduct(id) {
    const flag = confirm("Are you sure you want to delete this product?");
    if (flag) {
        $.ajax({
            url: "/admin/product/" + id,
            type: "DELETE",
            success: function (res) {
                setTimeout(() => {
                    toastr.success('Product deleted successfully', 'Success')
                }, 1000);
                window.location.reload()
            },
            error: function (err) {
                console.log(err);
                toastr.error('Something went wrong', 'Error')
            }
        })
    }
}