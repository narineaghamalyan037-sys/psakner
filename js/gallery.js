document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       GALLERY LINKS
       ========================================== */

    const galleryLinks =
        document.querySelectorAll(".gallery-link");


    /*
       Եթե տվյալ էջում Gallery չկա,
       ոչինչ չենք անում։
       Console-ում error չենք գրում։
    */

    if (!galleryLinks.length) {
        return;
    }


    /* ==========================================
       LIGHTBOX ELEMENTS
       ========================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeButton =
        document.getElementById("lightboxClose");


    /*
       Եթե Gallery link կա, բայց Lightbox-ի
       HTML տարրերը բացակայում են,
       նույնպես անվտանգ ավարտում ենք։
    */

    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton
    ) {
        return;
    }


    /* ==========================================
       OPEN LIGHTBOX
       ========================================== */

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


    /* ==========================================
       CLOSE LIGHTBOX
       ========================================== */

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


    /* ==========================================
       CLOSE BUTTON
       ========================================== */

    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    /* ==========================================
       CLOSE BY BACKDROP
       ========================================== */

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


    /* ==========================================
       CLOSE BY ESCAPE
       ========================================== */

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
