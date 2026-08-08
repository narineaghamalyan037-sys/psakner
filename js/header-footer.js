document.addEventListener("DOMContentLoaded", function () {

    /* HEADER */

    const header =
        document.getElementById("header");


    if (header) {

        fetch("components/header.html")

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        "header.html-ը չի գտնվել"
                    );

                }

                return response.text();

            })

            .then(function (data) {

                header.innerHTML = data;

                updateHeaderCartCount();

            })

            .catch(function (error) {

                console.error(
                    "Header-ի սխալ՝",
                    error
                );

            });

    }


    /* FOOTER */

    const footer =
        document.getElementById("footer");


    if (footer) {

        fetch("components/footer.html")

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        "footer.html-ը չի գտնվել"
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

});


/* ԶԱՄԲՅՈՒՂԻ ՔԱՆԱԿ */

function updateHeaderCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity +=
            Number(item.quantity) || 0;

    });


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}