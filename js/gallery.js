document.addEventListener("DOMContentLoaded", function () {

    const galleryLinks =
        document.querySelectorAll(".gallery-link");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeButton =
        document.getElementById("lightboxClose");


    /*
     * Եթե տվյալ էջում Gallery չկա,
     * JavaScript-ը պարզապես կանգնում է։
     */

    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton
    ) {
        console.log(
            "Lightbox-ը այս էջում չկա։"
        );

        return;
    }


    /*
     * GALLERY LINKS
     */

    galleryLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const imagePath =
                    this.dataset.image ||
                    this.getAttribute("href");


                if (!imagePath) {
                    return;
                }


                lightboxImage.src =
                    imagePath;


                lightbox.classList.add(
                    "active"
                );


                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    /*
     * CLOSE LIGHTBOX
     */

    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        lightboxImage.src = "";


        document.body.style.overflow =
            "";

    }


    /*
     * CLOSE BUTTON
     */

    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    /*
     * CLICK OUTSIDE IMAGE
     */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /*
     * ESC KEY
     */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

            }

        }
    );

});
