const productContainer = document.getElementById("productContainer");


function formatPrice(price) {

    return new Intl.NumberFormat("hy-AM").format(price) + " ֏";

}


function displayProducts(productList) {

    if (!productContainer) return;


    if (productList.length === 0) {

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



                <!-- PRODUCT INFO -->

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



                    <!-- PRODUCT ACTIONS -->

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


displayProducts(products);
