toastr.options.closeButton = true;
toastr.options.timeout = 2000;
toastr.options.progressBar = true;
toastr.options.positionClass = 'toast-top-right';
toastr.options.extendedTimeOut = 1000;

document.querySelectorAll('.form-control').forEach(selectElement => {
    selectElement.addEventListener('change', function() {
        const status = this.value;
        const orderID = this.getAttribute('data-order-id');

        $.ajax({
            url: '/admin/orders/update',
            method: 'POST',
            data: JSON.stringify({ orderID, status }),
            contentType: 'application/json',
            success: function(response) {
                toastr.success('Order status updated successfully', 'Success')
                setTimeout(function() {
                    location.reload();
                }, 1000);
            },
            error: function(xhr, status, error) {
                toastr.error('Something went wrong', 'Error')
            }
        });
    });
});
