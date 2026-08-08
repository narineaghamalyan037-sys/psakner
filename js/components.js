document.addEventListener("DOMContentLoaded", function () {


const header =
    document.getElementById("header");

const footer =
    document.getElementById("footer");


/* =========================
   HEADER
========================= */

if (header) {

    fetch("components/header.html")

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Header-ը չհաջողվեց բեռնել"
                );

            }

            return response.text();

        })

        .then(function (data) {

            header.innerHTML = data;

            updateCartCount();

            activateHeaderSearch();

        })

        .catch(function (error) {

            console.error(
                "Header-ի սխալ՝",
                error
            );

        });

}


/* =========================
   FOOTER
========================= */

if (footer) {

    fetch("components/footer.html")

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Footer-ը չհաջողվեց բեռնել"
                );

            }

            return response.text();

        })

        .then(function (data) {

            footer.innerHTML = data;

        })

        .catch(function (error) {

            console.error(
                "Footer-ի սխալ՝",
                error
            );

        });

}


/* =========================
   HEADER SEARCH
========================= */

function activateHeaderSearch() {

    const searchInput =
        document.getElementById(
            "headerSearchInput"
        );


    const searchButton =
        document.getElementById(
            "headerSearchButton"
        );


    if (!searchInput) {

        return;

    }


    function searchProducts() {

        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();


        if (searchText === "") {

            window.location.href =
                "products.html";

            return;

        }


        window.location.href =
            "products.html?search=" +
            encodeURIComponent(
                searchText
            );

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchProducts
        );

    }


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                searchProducts();

            }

        }
    );

}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "cart"
            )
        ) || [];


    let count = 0;


    cart.forEach(
        function (item) {

            count +=
                Number(
                    item.quantity
                ) || 0;

        }
    );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}

});
