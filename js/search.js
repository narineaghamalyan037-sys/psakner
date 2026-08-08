document.addEventListener(
"DOMContentLoaded",
function () {


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {

        return;

    }


    /* =========================
       HEADER-ԻՑ ՈՐՈՆՈՒՄ
    ========================= */

    const parameters =
        new URLSearchParams(
            window.location.search
        );


    const searchValue =
        parameters.get("search");


    if (searchValue) {

        searchInput.value =
            searchValue;

    }


    /* =========================
       ԱՊՐԱՆՔՆԵՐԻ ՖԻԼՏՐՈՒՄ
    ========================= */

    function searchProducts() {

        const text =
            searchInput.value
                .trim()
                .toLowerCase();


        const filteredProducts =
            products.filter(
                function (product) {

                    const name =
                        product.name
                            .toLowerCase();


                    const description =
                        product.description
                            .toLowerCase();


                    const category =
                        product.category
                            .toLowerCase();


                    return (

                        name.includes(text)

                        ||

                        description.includes(text)

                        ||

                        category.includes(text)

                    );

                }
            );


        displayProducts(
            filteredProducts
        );

    }


    /* =========================
       ՈՐՈՆՈՒՄ ԳՐԵԼՈՒ ԺԱՄԱՆԱԿ
    ========================= */

    searchInput.addEventListener(
        "input",
        searchProducts
    );


    /* =========================
       ԷՋ ԲԱՑՎԵԼԻՍ
    ========================= */

    if (searchValue) {

        searchProducts();

    }

}


);
