```javascript
document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    const header =
        document.querySelector(".main-header");


    /*
       Header-ը տվյալ էջում չկա։
       Այդ դեպքում scroll effect չենք միացնում։
    */

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {

                header.style.boxShadow =
                    "0 5px 20px rgba(0,0,0,.15)";

            } else {

                header.style.boxShadow =
                    "0 3px 15px rgba(0,0,0,.08)";

            }

        });

    }


    /* =========================
       ACTIVE MENU
    ========================= */

    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    /*
       Եթե բացվում է գլխավոր էջը առանց
       index.html-ի, համարում ենք index.html։
    */

    if (
        currentPage === "" ||
        currentPage === "/"
    ) {

        currentPage = "index.html";

    }


    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (
            href &&
            href === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /* =========================
       SEARCH
    ========================= */

    const searchInput =
        document.getElementById(
            "headerSearchInput"
        );


    const searchButton =
        document.getElementById(
            "headerSearchButton"
        );


    /*
       Search button
    */

    if (
        searchButton &&
        searchInput
    ) {

        searchButton.addEventListener(
            "click",
            function () {

                const text =
                    searchInput.value.trim();


                if (text !== "") {

                    window.location.href =
                        "products.html?search=" +
                        encodeURIComponent(text);

                }

            }
        );

    }


    /* =========================
       ENTER KEY SEARCH
    ========================= */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();


                    if (searchButton) {

                        searchButton.click();

                    }

                }

            }
        );

    }


    /* =========================
       CART COUNT
    ========================= */

    let cart = [];

    try {

        cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

    } catch (error) {

        cart = [];

    }


    const count =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    Number(item.quantity || 0)
                );

            },
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }


    /* =========================
       MOBILE MENU CLOSE
    ========================= */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                const menu =
                    document.getElementById(
                        "mainMenu"
                    );


                if (
                    !menu ||
                    !menu.classList.contains("show")
                ) {

                    return;

                }


                /*
                   Bootstrap-ը կարող է դեռ
                   չլինել տվյալ պահին։
                */

                if (
                    typeof bootstrap ===
                    "undefined"
                ) {

                    return;

                }


                const bsCollapse =
                    bootstrap.Collapse
                        .getInstance(menu);


                if (bsCollapse) {

                    bsCollapse.hide();

                }

            }
        );

    });


});
```
