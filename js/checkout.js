toastr.options.closeButton = true;
toastr.options.timeout = 2000;
toastr.options.progressBar = true;
toastr.options.positionClass = 'toast-top-right';
toastr.options.extendedTimeOut = 1000;
function checkout() {
    const checkOutBtn = document.querySelector('#checkout-btn');
    checkOutBtn.classList.add('disabled');
    const form = new FormData(document.querySelector('form#checkout'));

    const isShipping = form.get('isShipping');

    const billingAddress = {};
    const shippingData = {};

    let hasError = false;

    for (const [name, value] of form.entries()) {
        const input = document.querySelector(`[name="${name}"]`);
        if (isShipping && name.startsWith('shipping_')) {
            if (!value) {
                hasError = true;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                const shippingName = name.replace('shipping_', '');
                shippingData[shippingName] = value;
            }
        } else if (name.startsWith('billing_')) {
            if (!value) {
                hasError = true;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                const billingName = name.replace('billing_', '');
                billingAddress[billingName] = value;
            }
        }
    }

    if (hasError) {
        checkOutBtn.classList.remove('disabled');
        return;
    }

    const shippingAddress = isShipping ? shippingData : {...billingAddress, type: 'shipping'};

    $.ajax({
        url: '/checkout/add-address',
        method: 'POST',
        data: JSON.stringify(shippingAddress),
        contentType: 'application/json',
        success: function (response) {
            $.ajax({
                url: '/checkout/add-address',
                method: 'POST',
                data: JSON.stringify(billingAddress),
                contentType: 'application/json',
                success: function (response) {
                    $.ajax({
                        url: '/checkout',
                        method: 'POST',
                        data: JSON.stringify({}),
                        contentType: 'application/json',
                        success: function (response) {
                            document.open();
                            document.write(response);
                            document.close();
                        },
                        error: function (error) {
                            toastr.error(error, "An Error Occured!");
                            checkOutBtn.classList.remove('disabled');
                        }
                    })
                },
                error: function (xhr, status, error) {
                    checkOutBtn.classList.remove('disabled');
                    toastr.error(error, "An Error Occured!");
                }
            });
        },
        error: function (xhr, status, error) {
            checkOutBtn.classList.remove('disabled');
            toastr.error(error, "An Error Occured!");
        }
    });
}
