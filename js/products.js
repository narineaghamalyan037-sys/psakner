```javascript
/* =========================================================
   PRODUCTS.JS
   Products display + Add to Cart + Order Now
   ========================================================= */


/* =========================================================
   PRODUCT CONTAINER
   ========================================================= */

const productContainer =
    document.getElementById("productContainer");


/* =========================================================
   PRICE FORMAT
   ========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("hy-AM").format(
        Number(price)
    ) + " ֏";

}


/* =========================================================
   DISPLAY PRODUCTS
   ========================================================= */

function displayProducts(productList) {

    if (!productContainer) return;


    /* EMPTY SEARCH RESULT */

    if (!productList || productList.length === 0) {

        productContainer.innerHTML = `

            <div class="col-12">

                <div class="no-products">

                    <i class="bi bi-search"></i>

                    <h3>
                        Ապրանք չի գտնվել
                    </h3>

                    <p>
                        Փոխեք որոնման կամ ֆիլտրի պայմանները։
                    </p>

                </div>

            </div>

        `;

        return;
    }


    /* PRODUCT CARDS */

    productContainer.innerHTML = productList.map(product => `

        <div class="col-lg-3 col-md-6">

            <article class="product-card">


                <!-- PRODUCT IMAGE -->

                <a
                    href="product-details.html?id=${product.id}"
                    class="product-image"
                    aria-label="${product.name}"
                >

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </a>


                <!-- PRODUCT INFORMATION -->

                <div class="product-info">


                    <!-- CATEGORY -->

                    <span class="product-category">

                        ${product.category}

                    </span>


                    <!-- PRODUCT NAME -->

                    <h3>

                        <a
                            href="product-details.html?id=${product.id}"
                        >

                            ${product.name}

                        </a>

                    </h3>


                    <!-- DESCRIPTION -->

                    <p>

                        ${product.description}

                    </p>


                    <!-- PRICE -->

                    <div class="price">

                        ${formatPrice(product.price)}

                    </div>


                    <!-- ACTION BUTTONS -->

                    <div class="product-actions">


                        <!-- DETAILS -->

                        <a
                            href="product-details.html?id=${product.id}"
                            class="details-btn"
                        >

                            <i class="bi bi-eye"></i>

                            Մանրամասն

                        </a>


                        <!-- ADD TO CART -->

                        <button
                            type="button"
                            class="order-btn add-to-cart"
                            data-id="${product.id}"
                        >

                            <i class="bi bi-cart-plus"></i>

                            Ավելացնել

                        </button>


                        <!-- ORDER NOW -->

                        <button
                            type="button"
                            class="order-btn order-now"
                            data-id="${product.id}"
                        >

                            <i class="bi bi-bag-check"></i>

                            Պատվիրել

                        </button>


                    </div>


                </div>

            </article>

        </div>

    `).join("");

}


/* =========================================================
   ADD PRODUCT TO CART
   ========================================================= */

function addProductToCart(productId) {

    const numericId = Number(productId);

    if (!numericId) {

        console.error(
            "Ապրանքի ID-ն սխալ է:",
            productId
        );

        return false;
    }


    /* FIND PRODUCT */

    const product = products.find(
        item => Number(item.id) === numericId
    );


    if (!product) {

        console.error(
            "Ապրանքը չի գտնվել։ ID:",
            numericId
        );

        return false;
    }


    /* GET CART */

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    /* FIND EXISTING PRODUCT */

    const existingProduct = cart.find(
        item => Number(item.id) === numericId
    );


    /* INCREASE QUANTITY */

    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 0) + 1;

    }

    /* ADD NEW PRODUCT */

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            image: product.image,

            quantity: 1

        });

    }


    /* SAVE CART */

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    /* UPDATE HEADER */

    updateCartCount();


    return true;

}


/* =========================================================
   ADD TO CART BUTTON
   ========================================================= */

document.addEventListener("click", function (event) {

    const button =
        event.target.closest(".add-to-cart");


    if (!button) return;


    event.preventDefault();


    const productId =
        Number(button.dataset.id);


    if (!productId) return;


    const added =
        addProductToCart(productId);


    if (!added) return;


    /* VISUAL FEEDBACK */

    showAddedMessage(button);

});


/* =========================================================
   ORDER NOW BUTTON
   ========================================================= */

document.addEventListener("click", function (event) {

    const button =
        event.target.closest(".order-now");


    if (!button) return;


    event.preventDefault();


    const productId =
        Number(button.dataset.id);


    if (!productId) {

        console.error(
            "Պատվերի կոճակի ID-ն բացակայում է։"
        );

        return;
    }


    /* ADD PRODUCT TO CART */

    const added =
        addProductToCart(productId);


    if (!added) return;


    /* GO DIRECTLY TO CART */

    window.location.href =
        "cart.html";

});


/* =========================================================
   ADDED TO CART MESSAGE
   ========================================================= */

function showAddedMessage(button) {

    if (
        button.dataset.loading === "true"
    ) {

        return;
    }


    button.dataset.loading = "true";


    const originalContent =
        button.innerHTML;


    button.innerHTML = `

        <i class="bi bi-check-circle-fill"></i>

        Ավելացվեց ✓

    `;


    button.classList.add(
        "added-to-cart"
    );


    button.disabled = true;


    setTimeout(function () {

        button.innerHTML =
            originalContent;


        button.classList.remove(
            "added-to-cart"
        );


        button.disabled = false;


        button.dataset.loading =
            "false";

    }, 1800);

}


/* =========================================================
   UPDATE CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    /* TOTAL QUANTITY */

    const totalQuantity =
        cart.reduce(

            function (total, item) {

                return total +
                    Number(
                        item.quantity || 0
                    );

            },

            0

        );


    /* TOTAL PRICE */

    const totalPrice =
        cart.reduce(

            function (total, item) {

                return total +

                    Number(
                        item.price || 0
                    ) *

                    Number(
                        item.quantity || 0
                    );

            },

            0

        );


    /* HEADER CART COUNT */

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    /* MINI CART COUNT */

    const miniCartCount =
        document.getElementById(
            "miniCartCount"
        );


    if (miniCartCount) {

        miniCartCount.textContent =
            totalQuantity;

    }


    /* MINI CART TOTAL */

    const miniCartTotal =
        document.getElementById(
            "miniCartTotal"
        );


    if (miniCartTotal) {

        miniCartTotal.textContent =

            new Intl.NumberFormat(
                "hy-AM"
            ).format(totalPrice)

            + " ֏";

    }

}


/* =========================================================
   INITIALIZE CART COUNT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

    }
);


/* =========================================================
   INITIAL DISPLAY
   ========================================================= */

displayProducts(products);
```
