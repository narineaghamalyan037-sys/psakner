/* =========================================================
   CHECKOUT.JS
   Order → Order Number → Email → Receipt → Thank You
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const checkoutForm =
        document.getElementById("checkoutForm");

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutSubtotal =
        document.getElementById("checkoutSubtotal");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    const submitOrder =
        document.getElementById("submitOrder");

    const deliveryPriceElement =
        document.getElementById("deliveryPrice");


    /* =====================================================
       EMAILJS CONFIGURATION
       ===================================================== */

    const EMAILJS_PUBLIC_KEY =
        "YOUR_PUBLIC_KEY";

    const EMAILJS_SERVICE_ID =
        "YOUR_SERVICE_ID";

    const EMAILJS_TEMPLATE_ID =
        "YOUR_TEMPLATE_ID";


    /* =====================================================
       INITIALIZE EMAILJS
       ===================================================== */

    if (
        typeof emailjs !== "undefined" &&
        EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
    ) {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    }


    /* =====================================================
       CART
       ===================================================== */

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    /* =====================================================
       FORMAT PRICE
       ===================================================== */

    function formatPrice(price) {

        return new Intl.NumberFormat("hy-AM")
            .format(Number(price) || 0)
            + " ֏";

    }


    /* =====================================================
       ORDER NUMBER
       ===================================================== */

    function generateOrderNumber() {

        const now = new Date();

        const year =
            now.getFullYear();

        const month =
            String(now.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(now.getDate())
                .padStart(2, "0");

        const random =
            Math.floor(
                1000 + Math.random() * 9000
            );

        return `ORD-${year}${month}${day}-${random}`;

    }


    /* =====================================================
       CALCULATE SUBTOTAL
       ===================================================== */

    function calculateSubtotal() {

        return cart.reduce(
            function (total, item) {

                return total +
                    Number(item.price || 0) *
                    Number(item.quantity || 0);

            },
            0
        );

    }


    /* =====================================================
       DELIVERY
       ===================================================== */

    function calculateDelivery() {

        /*
         * Այստեղ կարող ենք հետագայում ավելացնել
         * քաղաքի / հասցեի հիման վրա առաքման գին։
         *
         * Այս պահին՝ անվճար / կճշտվի։
         */

        return 0;

    }


    /* =====================================================
       TOTAL
       ===================================================== */

    function calculateTotal() {

        return (
            calculateSubtotal() +
            calculateDelivery()
        );

    }


    /* =====================================================
       DISPLAY CART
       ===================================================== */

    function displayCheckoutItems() {

        if (!checkoutItems) {
            return;
        }


        if (!cart.length) {

            checkoutItems.innerHTML = `
                <div class="checkout-empty">

                    <i class="bi bi-bag-x"></i>

                    <h3>
                        Զամբյուղը դատարկ է
                    </h3>

                    <p>
                        Ավելացրեք ապրանք և վերադարձեք
                        պատվերի ձևակերպման էջ։
                    </p>

                </div>
            `;

            return;
        }


        checkoutItems.innerHTML =
            cart.map(function (item) {

                const quantity =
                    Number(item.quantity || 1);

                const itemTotal =
                    Number(item.price || 0) *
                    quantity;


                return `
                    <div class="checkout-item">

                        <div class="checkout-item-image">

                            <img
                                src="${item.image || ""}"
                                alt="${item.name || "Ապրանք"}"
                            >

                        </div>


                        <div class="checkout-item-info">

                            <h3>
                                ${item.name || "Ապրանք"}
                            </h3>

                            <p>
                                ${quantity} ×
                                ${formatPrice(item.price)}
                            </p>

                        </div>


                        <div class="checkout-item-price">

                            ${formatPrice(itemTotal)}

                        </div>

                    </div>
                `;

            }).join("");

    }


    /* =====================================================
       UPDATE SUMMARY
       ===================================================== */

    function updateSummary() {

        const subtotal =
            calculateSubtotal();

        const delivery =
            calculateDelivery();

        const total =
            subtotal + delivery;


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                formatPrice(subtotal);

        }


        if (deliveryPriceElement) {

            deliveryPriceElement.textContent =
                delivery > 0
                    ? formatPrice(delivery)
                    : "Անվճար";

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatPrice(total);

        }

    }


    /* =====================================================
       PAYMENT METHOD
       ===================================================== */

    function getPaymentMethod() {

        const selected =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (!selected) {
            return "Չի ընտրվել";
        }


        if (selected.value === "cash") {
            return "Կանխիկ";
        }


        if (selected.value === "transfer") {
            return "Բանկային փոխանցում";
        }


        return selected.value;

    }


    /* =====================================================
       PAYMENT RECEIPT
       ===================================================== */

    function getReceiptFile() {

        const receiptInput =
            document.getElementById(
                "paymentReceipt"
            );


        if (
            !receiptInput ||
            !receiptInput.files ||
            !receiptInput.files.length
        ) {

            return null;

        }


        return receiptInput.files[0];

    }


    /* =====================================================
       VALIDATE RECEIPT
       ===================================================== */

    function validateReceipt() {

        const paymentMethod =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (
            paymentMethod &&
            paymentMethod.value === "transfer"
        ) {

            const receipt =
                getReceiptFile();


            if (!receipt) {

                showCheckoutMessage(
                    "Խնդրում ենք կցել վճարման կտրոնը։",
                    "error"
                );

                return false;

            }


            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp",
                "application/pdf"
            ];


            if (
                !allowedTypes.includes(
                    receipt.type
                )
            ) {

                showCheckoutMessage(
                    "Կտրոնը պետք է լինի JPG, PNG, WEBP կամ PDF։",
                    "error"
                );

                return false;

            }


            /*
             * 5 MB maximum
             */

            if (
                receipt.size >
                5 * 1024 * 1024
            ) {

                showCheckoutMessage(
                    "Վճարման կտրոնը չպետք է գերազանցի 5 MB-ը։",
                    "error"
                );

                return false;

            }

        }


        return true;

    }


    /* =====================================================
       MESSAGE
       ===================================================== */

    function showCheckoutMessage(
        message,
        type
    ) {

        let box =
            document.getElementById(
                "checkoutMessage"
            );


        if (!box) {

            box =
                document.createElement(
                    "div"
                );

            box.id =
                "checkoutMessage";

            box.className =
                "checkout-message";

            checkoutForm.prepend(box);

        }


        box.className =
            "checkout-message " +
            type;

        box.textContent =
            message;


        box.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =====================================================
       COLLECT ORDER DATA
       ===================================================== */

    function collectOrderData(
        orderNumber
    ) {

        const fullName =
            document.getElementById(
                "fullName"
            )?.value.trim() || "";


        const phone =
            document.getElementById(
                "phone"
            )?.value.trim() || "";


        const city =
            document.getElementById(
                "city"
            )?.value.trim() || "";


        const address =
            document.getElementById(
                "address"
            )?.value.trim() || "";


        const deliveryDate =
            document.getElementById(
                "deliveryDate"
            )?.value || "";


        const deliveryTime =
            document.getElementById(
                "deliveryTime"
            )?.value || "";


        const ribbonText =
            document.getElementById(
                "ribbonText"
            )?.value.trim() || "";


        const orderNote =
            document.getElementById(
                "orderNote"
            )?.value.trim() || "";


        return {

            orderNumber,

            fullName,

            phone,

            city,

            address,

            deliveryDate,

            deliveryTime,

            ribbonText,

            paymentMethod:
                getPaymentMethod(),

            orderNote,

            subtotal:
                calculateSubtotal(),

            delivery:
                calculateDelivery(),

            total:
                calculateTotal(),

            cart

        };

    }


    /* =====================================================
       BUILD PRODUCTS TEXT
       ===================================================== */

    function buildProductsText() {

        if (!cart.length) {
            return "Պատվեր չկա";
        }


        return cart.map(
            function (item) {

                const quantity =
                    Number(
                        item.quantity || 1
                    );


                const total =
                    Number(item.price || 0) *
                    quantity;


                return (
                    `${item.name} — ` +
                    `${quantity} հատ × ` +
                    `${formatPrice(item.price)} = ` +
                    `${formatPrice(total)}`
                );

            }
        ).join("\n");

    }


    /* =====================================================
       BUILD EMAIL VARIABLES
       ===================================================== */

    function prepareEmailFields(
        order
    ) {

        /*
         * Hidden fields կարող են լինել
         * checkout.html-ում։
         */

        setHiddenField(
            "emailOrderNumber",
            order.orderNumber
        );

        setHiddenField(
            "emailCustomerName",
            order.fullName
        );

        setHiddenField(
            "emailPhone",
            order.phone
        );

        setHiddenField(
            "emailCity",
            order.city
        );

        setHiddenField(
            "emailAddress",
            order.address
        );

        setHiddenField(
            "emailDeliveryDate",
            order.deliveryDate
        );

        setHiddenField(
            "emailDeliveryTime",
            order.deliveryTime
        );

        setHiddenField(
            "emailRibbonText",
            order.ribbonText || "Չի նշվել"
        );

        setHiddenField(
            "emailPaymentMethod",
            order.paymentMethod
        );

        setHiddenField(
            "emailOrderNote",
            order.orderNote || "Չկա"
        );

        setHiddenField(
            "emailProducts",
            buildProductsText()
        );

        setHiddenField(
            "emailSubtotal",
            formatPrice(order.subtotal)
        );

        setHiddenField(
            "emailDelivery",
            order.delivery > 0
                ? formatPrice(order.delivery)
                : "Անվճար"
        );

        setHiddenField(
            "emailTotal",
            formatPrice(order.total)
        );

        setHiddenField(
            "emailTime",
            new Date().toLocaleString(
                "hy-AM"
            )
        );

    }


    /* =====================================================
       CREATE HIDDEN FIELD
       ===================================================== */

    function setHiddenField(
        name,
        value
    ) {

        let field =
            checkoutForm.querySelector(
                `[name="${name}"]`
            );


        if (!field) {

            field =
                document.createElement(
                    "input"
                );

            field.type =
                "hidden";

            field.name =
                name;

            checkoutForm.appendChild(
                field
            );

        }


        field.value =
            value ?? "";

    }


    /* =====================================================
       SEND EMAIL
       ===================================================== */

    async function sendOrderEmail(
        order
    ) {

        if (
            typeof emailjs === "undefined"
        ) {

            throw new Error(
                "EmailJS-ը չի բեռնվել։"
            );

        }


        if (
            EMAILJS_PUBLIC_KEY ===
            "YOUR_PUBLIC_KEY" ||
            EMAILJS_SERVICE_ID ===
            "YOUR_SERVICE_ID" ||
            EMAILJS_TEMPLATE_ID ===
            "YOUR_TEMPLATE_ID"
        ) {

            throw new Error(
                "EmailJS-ի տվյալները դեռ չեն լրացվել։"
            );

        }


        prepareEmailFields(
            order
        );


        /*
         * sendForm-ը ավտոմատ վերցնում է
         * form-ի բոլոր name/value դաշտերը
         * և կարող է ուղարկել file attachment։
         */

        return emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            checkoutForm
        );

    }


    /* =====================================================
       SAVE ORDER LOCALLY
       ===================================================== */

    function saveOrder(
        order
    ) {

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );


        /*
         * Պահպանում ենք նաև պատվերների պատմությունը։
         */

        const orders =
            JSON.parse(
                localStorage.getItem(
                    "orders"
                )
            ) || [];


        orders.push(order);


        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

    }


    /* =====================================================
       CLEAR CART
       ===================================================== */

    function clearCart() {

        localStorage.removeItem(
            "cart"
        );


        /*
         * Եթե header-ում cart count կա
         */

        const cartCount =
            document.getElementById(
                "cartCount"
            );


        if (cartCount) {
            cartCount.textContent = "0";
        }


        const miniCartCount =
            document.getElementById(
                "miniCartCount"
            );


        if (miniCartCount) {
            miniCartCount.textContent = "0";
        }

    }


    /* =====================================================
       REDIRECT
       ===================================================== */

    function goToThankYou(
        order
    ) {

        const params =
            new URLSearchParams({

                order:
                    order.orderNumber,

                total:
                    String(order.total)

            });


        window.location.href =
            "thank-you.html?" +
            params.toString();

    }


    /* =====================================================
       SUBMIT
       ===================================================== */

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /*
                 * Cart-ը դատարկ է
                 */

                if (!cart.length) {

                    showCheckoutMessage(
                        "Ձեր զամբյուղը դատարկ է։",
                        "error"
                    );

                    return;

                }


                /*
                 * HTML required fields
                 */

                if (
                    !checkoutForm.checkValidity()
                ) {

                    checkoutForm.reportValidity();

                    return;

                }


                /*
                 * Payment receipt
                 */

                if (
                    !validateReceipt()
                ) {

                    return;

                }


                /*
                 * Generate order number
                 */

                const orderNumber =
                    generateOrderNumber();


                const order =
                    collectOrderData(
                        orderNumber
                    );


                /*
                 * Prevent double submit
                 */

                if (submitOrder) {

                    submitOrder.disabled =
                        true;


                    submitOrder.dataset.originalText =
                        submitOrder.innerHTML;


                    submitOrder.innerHTML = `
                        <span>
                            Ուղարկվում է...
                        </span>

                        <i class="bi bi-arrow-repeat"></i>
                    `;

                }


                try {

                    /*
                     * Send order to EmailJS
                     */

                    await sendOrderEmail(
                        order
                    );


                    /*
                     * Save order
                     */

                    saveOrder(
                        order
                    );


                    /*
                     * Clear cart ONLY
                     * after successful email.
                     */

                    clearCart();


                    /*
                     * Go to thank-you
                     */

                    goToThankYou(
                        order
                    );


                } catch (error) {

                    console.error(
                        "ORDER ERROR:",
                        error
                    );


                    showCheckoutMessage(
                        "Պատվերը չհաջողվեց ուղարկել։ Խնդրում ենք փորձել կրկին։",
                        "error"
                    );


                    if (submitOrder) {

                        submitOrder.disabled =
                            false;


                        submitOrder.innerHTML =
                            submitOrder.dataset
                                .originalText ||
                            `
                                <span>
                                    Հաստատել պատվերը
                                </span>

                                <i class="bi bi-arrow-right"></i>
                            `;

                    }

                }

            }
        );

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    displayCheckoutItems();

    updateSummary();


    /* =====================================================
       PAYMENT CHANGE
       ===================================================== */

    document
        .querySelectorAll(
            'input[name="paymentMethod"]'
        )
        .forEach(
            function (radio) {

                radio.addEventListener(
                    "change",
                    function () {

                        updateSummary();

                    }
                );

            }
        );

});

