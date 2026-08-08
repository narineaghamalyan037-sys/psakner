
document.addEventListener("DOMContentLoaded", () => {


updateCartCount();


});

document.addEventListener("click", (event) => {


const button = event.target.closest(".add-to-cart");

if (!button) return;


event.preventDefault();


const productId = Number(
    button.dataset.id
);


if (!productId) return;


const product = products.find(
    product => product.id === productId
);


if (!product) {

    console.error(
        "Ապրանքը չի գտնվել։ ID:",
        productId
    );

    return;

}


let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


const existingProduct = cart.find(
    item => item.id === productId
);


if (existingProduct) {

    existingProduct.quantity += 1;

} else {

    cart.push({

        id: product.id,

        name: product.name,

        price: Number(product.price),

        image: product.image,

        quantity: 1

    });

}


localStorage.setItem(

    "cart",

    JSON.stringify(cart)

);


updateCartCount();


showAddedMessage(button);


});

function showAddedMessage(button) {


if (button.dataset.loading === "true") {

    return;

}


button.dataset.loading = "true";


const originalContent =

    button.innerHTML;


button.innerHTML = `

    <i class="bi bi-check-circle-fill"></i>

    Ավելացվեց ✓

`;


button.classList.add(

    "added-to-cart"

);


button.disabled = true;


setTimeout(() => {


    button.innerHTML =

        originalContent;


    button.classList.remove(

        "added-to-cart"

    );


    button.disabled = false;


    button.dataset.loading =

        "false";


}, 1800);

}

function updateCartCount() {


const cart = JSON.parse(

    localStorage.getItem("cart")

) || [];


const totalQuantity = cart.reduce(

    (total, item) => {

        return total +

            Number(item.quantity || 0);

    },

    0

);


const totalPrice = cart.reduce(

    (total, item) => {

        return total +

            Number(item.price || 0) *

            Number(item.quantity || 0);

    },

    0

);


const cartCount = document.getElementById(

    "cartCount"

);


if (cartCount) {

    cartCount.textContent =

        totalQuantity;

}


const miniCartCount = document.getElementById(

    "miniCartCount"

);


if (miniCartCount) {

    miniCartCount.textContent =

        totalQuantity;

}


const miniCartTotal = document.getElementById(

    "miniCartTotal"

);


if (miniCartTotal) {

    miniCartTotal.textContent =

        new Intl.NumberFormat(

            "hy-AM"

        ).format(totalPrice)

        + " ֏";

}

}
