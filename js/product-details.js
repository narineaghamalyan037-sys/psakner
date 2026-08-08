const detailsContainer = document.getElementById(
"productDetailsContainer"
);

const urlParameters = new URLSearchParams(
window.location.search
);

const productId = Number(
urlParameters.get("id")
);

const selectedProduct = products.find(
product => product.id === productId
);

function formatProductPrice(price) {


return new Intl.NumberFormat(
    "hy-AM"
).format(price) + " ֏";

}

if (!selectedProduct) {


detailsContainer.innerHTML = `

    <div class="product-not-found">

        <i class="bi bi-exclamation-circle"></i>

        <h1>
            Ապրանքը չի գտնվել
        </h1>

        <p>
            Հնարավոր է՝ ընտրված ապրանքը գոյություն չունի։
        </p>

        <a
            href="products.html"
            class="back-to-products"
        >

            <i class="bi bi-arrow-left"></i>

            Վերադառնալ տեսականուն

        </a>

    </div>

`;


} else {


document.title =
    selectedProduct.name +
    " | Ծաղկեպսակներ";


detailsContainer.innerHTML = `

    <div class="row align-items-center g-5">


        <!-- PRODUCT IMAGE -->

        <div class="col-lg-6">

            <div class="details-image">

                <img
                    src="${selectedProduct.image}"
                    alt="${selectedProduct.name}"
                >

            </div>

        </div>



        <!-- PRODUCT INFORMATION -->

        <div class="col-lg-6">

            <div class="details-info">


                <span class="details-category">

                    ${selectedProduct.category}

                </span>


                <h1>

                    ${selectedProduct.name}

                </h1>


                <p class="details-description">

                    ${selectedProduct.description}

                </p>


                <div class="details-price">

                    ${formatProductPrice(
                        selectedProduct.price
                    )}

                </div>



                <div class="details-features">


                    <div>

                        <i class="bi bi-flower1"></i>

                        <span>
                            Որակյալ ծաղիկներ
                        </span>

                    </div>


                    <div>

                        <i class="bi bi-truck"></i>

                        <span>
                            Արագ առաքում
                        </span>

                    </div>


                    <div>

                        <i class="bi bi-heart"></i>

                        <span>
                            Անհատական մոտեցում
                        </span>

                    </div>


                </div>



                <div class="details-actions">


                    <button
                        type="button"
                        class="order-btn add-to-cart"
                        data-id="${selectedProduct.id}"
                    >

                        <i class="bi bi-cart-plus"></i>

                        Ավելացնել զամբյուղ

                    </button>



                    <a
                        href="products.html"
                        class="back-to-products"
                    >

                        <i class="bi bi-arrow-left"></i>

                        Վերադառնալ տեսականուն

                    </a>


                </div>


            </div>

        </div>


    </div>

`;


}
