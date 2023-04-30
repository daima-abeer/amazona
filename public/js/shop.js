toastr.options.closeButton = true;
toastr.options.timeout = 2000;
toastr.options.progressBar = true;
toastr.options.positionClass = 'toast-top-right';
toastr.options.extendedTimeOut = 1000;
function addToCart(product_id) {
    const cart = JSON.stringify({
        "productId": product_id
    });
    $.ajax({
        url: '/cart/add',
        type: 'POST',
        data: cart,
        contentType: 'application/json',
        success: function () {
            toastr.success('Successfully Added to Cart', 'Success');
        },
        error: function () {
            toastr.error('Failed to Add to Cart', 'Failed');
        }
    });
}

function removeFromCart(product_id) {
    const cart = JSON.stringify({
        "productId": product_id
    });
    $.ajax({
        url: '/cart/remove',
        type: 'POST',
        data: cart,
        contentType: 'application/json',
        success: function (data) {
            location.reload();
            toastr.success('Successfully Removed from Cart', 'Success');
        },
        error: function () {
            toastr.error('Failed to Remove from Cart', 'Failed');
        }
    });
}

function updateCart(cartItems) {
    let productsToUpdate = [];

    cartItems.forEach((item) => {
        const quantity = $(`#cart-item-quantity-${item.id}`).val();
        if (quantity !== item.quantity) {
            productsToUpdate.push({productId: item.id, quantity: quantity});
        }
    });

    if (productsToUpdate.length <= 0) {
        toastr.info('No changes made to cart', 'Information');
        return;
    }

    Promise.all(
        productsToUpdate.map(item => {
            const cart = JSON.stringify({
                "productId": item.productId,
                "quantity": item.quantity
            });

            return $.ajax({
                url: '/cart/update',
                type: 'POST',
                data: cart,
                contentType: 'application/json'
            });
        })
    ).then(() => {
        toastr.success('Successfully Updated Cart', 'Success');
        location.reload();
    }).catch(() => {
        toastr.error('Failed to Update Cart', 'Failed');
    });

}

function updateQuantity(product_id, quantity) {
    const cartItemQuantity = $(`#cart-item-quantity-${product_id}`);
    const newQuantity = parseInt(cartItemQuantity.val()) + parseInt(quantity);
    (newQuantity > 0) ? cartItemQuantity.val(newQuantity) : toastr.error('Quantity must be greater than 0', 'Failed');
}