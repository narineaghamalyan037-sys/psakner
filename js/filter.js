document.addEventListener("DOMContentLoaded", function () {


const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const priceFilter =
    document.getElementById("priceFilter");


if (
    !searchInput ||
    !categoryFilter ||
    !priceFilter
) {

    console.error(
        "Ֆիլտրերի տարրերը չեն գտնվել"
    );

    return;

}


function filterProducts() {

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const selectedPrice =
        priceFilter.value;


    const filteredProducts =
        products.filter(function (product) {


            /* =====================
               ՈՐՈՆՈՒՄ
            ===================== */

            const productName =
                product.name
                    .toLowerCase();


            const productDescription =
                product.description
                    .toLowerCase();


            const productCategory =
                product.category
                    .toLowerCase();


            const matchesSearch =

                productName.includes(
                    searchText
                )

                ||

                productDescription.includes(
                    searchText
                )

                ||

                productCategory.includes(
                    searchText
                );


            /* =====================
               ԿԱՏԵԳՈՐԻԱ
            ===================== */

            const matchesCategory =

                selectedCategory === "all"

                ||

                product.category ===
                selectedCategory;


            /* =====================
               ԳԻՆ
            ===================== */

            let matchesPrice = true;


            if (
                selectedPrice === "30000"
            ) {

                matchesPrice =
                    product.price <= 30000;

            }


            else if (
                selectedPrice === "50000"
            ) {

                matchesPrice =

                    product.price > 30000

                    &&

                    product.price <= 50000;

            }


            else if (
                selectedPrice === "50001"
            ) {

                matchesPrice =
                    product.price > 50000;

            }


            /* =====================
               ՎԵՐՋՆԱԿԱՆ ԱՐԴՅՈՒՆՔ
            ===================== */

            return (

                matchesSearch

                &&

                matchesCategory

                &&

                matchesPrice

            );

        });


    displayProducts(
        filteredProducts
    );

}


/* =====================
   ՈՐՈՆՈՒՄ
===================== */

searchInput.addEventListener(
    "input",
    filterProducts
);


/* =====================
   ԿԱՏԵԳՈՐԻԱ
===================== */

categoryFilter.addEventListener(
    "change",
    filterProducts
);


/* =====================
   ԳԻՆ
===================== */

priceFilter.addEventListener(
    "change",
    filterProducts
);


/* =====================
   HEADER-ԻՑ ՈՐՈՆՈՒՄ
===================== */

const parameters =
    new URLSearchParams(
        window.location.search
    );


const headerSearch =
    parameters.get("search");


if (headerSearch) {

    searchInput.value =
        headerSearch;

    filterProducts();

}


});
