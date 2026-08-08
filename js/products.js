```javascript
/* =========================================================
   PRODUCTS.JS
   Product Cards + Order Now
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


                    <!-- NAME -->

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


                    <!-- ACTIONS -->

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
   ORDER NOW
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
            "Պատվիրել կոճակի product ID-ն բացակայում է։"
        );

        return;
    }


    const product = products.find(
        item => Number(item.id) === productId
    );


    if (!product) {

        console.error(
            "Ապրանքը չի գտնվել։ ID:",
            productId
        );

        return;
    }


    /* GET CURRENT CART */

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    /* CHECK EXISTING PRODUCT */

    const existingProduct = cart.find(
        item => Number(item.id) === productId
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


    /* GO TO CART */

    window.location.href =
        "cart.html";

});


/* =========================================================
   INITIAL DISPLAY
   ========================================================= */

displayProducts(products);
```
