document.addEventListener("DOMContentLoaded", function () {

    const galleryLinks =
        document.querySelectorAll(".gallery-link");


    const lightbox =
        document.getElementById("lightbox");


    const lightboxImage =
        document.getElementById("lightboxImage");


    const closeButton =
        document.getElementById("lightboxClose");


    if (
        !galleryLinks.length ||
        !lightbox ||
        !lightboxImage ||
        !closeButton
    ) {

        console.error(
            "Gallery Lightbox-ի տարրերը չեն գտնվել"
        );

        return;

    }


    galleryLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const imagePath =
                    this.dataset.image ||
                    this.getAttribute("href");


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


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );


        lightboxImage.src = "";


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


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


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }

        }
    );

});