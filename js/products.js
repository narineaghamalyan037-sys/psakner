
const productContainer = document.getElementById("productContainer");

function formatPrice(price) {
    return new Intl.NumberFormat("hy-AM").format(Number(price)) + " ֏";
}

function displayProducts(productList) {

    if (!productContainer) {
        return;
    }

    if (!productList || productList.length === 0) {

        productContainer.innerHTML =
            '<div class="col-12">' +
                '<div class="no-products">' +
                    '<i class="bi bi-search"></i>' +
                    '<h3>Ապրանք չի գտնվել</h3>' +
                    '<p>Փոխեք որոնման կամ ֆիլտրի պայմանները։</p>' +
                '</div>' +
            '</div>';

        return;
    }

    productContainer.innerHTML = productList.map(function(product) {

        return (
            '<div class="col-lg-3 col-md-6">' +

                '<article class="product-card">' +

                    '<a href="product-details.html?id=' + product.id + '"' +
                       ' class="product-image"' +
                       ' aria-label="' + product.name + '">' +

                        '<img src="' + product.image + '"' +
                             ' alt="' + product.name + '"' +
                             ' loading="lazy">' +

                    '</a>' +

                    '<div class="product-info">' +

                        '<span class="product-category">' +
                            product.category +
                        '</span>' +

                        '<h3>' +

                            '<a href="product-details.html?id=' +
                                product.id +
                            '">' +

                                product.name +

                            '</a>' +

                        '</h3>' +

                        '<p>' +
                            product.description +
                        '</p>' +

                        '<div class="price">' +
                            formatPrice(product.price) +
                        '</div>' +

                        '<div class="product-actions">' +

                            '<a href="product-details.html?id=' +
                                product.id +
                            '"' +
                            ' class="details-btn">' +

                                '<i class="bi bi-eye"></i>' +
                                ' Մանրամասն' +

                            '</a>' +

                            '<button type="button"' +
                                ' class="order-btn add-to-cart"' +
                                ' data-id="' + product.id + '">' +

                                '<i class="bi bi-cart-plus"></i>' +
                                ' Ավելացնել' +

                            '</button>' +

                            '<button type="button"' +
                                ' class="order-btn order-now"' +
                                ' data-id="' + product.id + '">' +

                                '<i class="bi bi-bag-check"></i>' +
                                ' Պատվիրել' +

                            '</button>' +

                        '</div>' +

                    '</div>' +

                '</article>' +

            '</div>'
        );

    }).join("");
}


/* ==========================================
   ORDER NOW
   ========================================== */

document.addEventListener("click", function(event) {

    var button = event.target.closest(".order-now");

    if (!button) {
        return;
    }

    event.preventDefault();

    var productId = Number(button.dataset.id);

    if (!productId) {
        console.error("Պատվիրել կոճակի ID-ն բացակայում է։");
        return;
    }

    var product = products.find(function(item) {
        return Number(item.id) === productId;
    });

    if (!product) {

        console.error(
            "Ապրանքը չի գտնվել։ ID:",
            productId
        );

        return;
    }

    var cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    var existingProduct = cart.find(function(item) {
        return Number(item.id) === productId;
    });

    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 0) + 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    window.location.href = "cart.html";

});


/* ==========================================
   DISPLAY PRODUCTS
   ========================================== */

displayProducts(products);
