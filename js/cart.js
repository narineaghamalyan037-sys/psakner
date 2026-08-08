const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(
localStorage.getItem("cart")
) || [];

function formatPrice(price){


return new Intl.NumberFormat(
    "hy-AM"
).format(price) + " ֏";


}

function renderCart(){


if(cart.length === 0){


    cartItems.innerHTML = `

    <div class="empty-cart">


        <i class="bi bi-cart-x fs-1"></i>


        <h3>
            Զամբյուղը դատարկ է
        </h3>


        <a href="products.html">

            Դիտել ապրանքները

        </a>


    </div>

    `;


    cartTotal.textContent = "0 ֏";

    cartCount.textContent = "0";


    updateHeaderCart();

    return;

}



let total = 0;

let count = 0;



cartItems.innerHTML = cart.map(item => {


    total += 
        Number(item.price) *
        Number(item.quantity);


    count += 
        Number(item.quantity);



    return `


    <div class="cart-card">


        <img 
        src="${item.image}"
        alt="${item.name}">



        <div class="cart-info">


            <h3>

                ${item.name}

            </h3>



            <div class="cart-price">

                ${formatPrice(item.price)}

            </div>



            <div class="quantity-box">


                <button onclick="changeQuantity(${item.id},-1)">

                    -

                </button>



                <strong>

                    ${item.quantity}

                </strong>



                <button onclick="changeQuantity(${item.id},1)">

                    +

                </button>


            </div>



        </div>




        <button
        class="remove-btn"
        onclick="removeItem(${item.id})">


            <i class="bi bi-trash"></i>


        </button>



    </div>


    `;


}).join("");



cartTotal.textContent =
    formatPrice(total);


cartCount.textContent =
    count;



updateHeaderCart();


}

function changeQuantity(id,value){


const product =
    cart.find(
        item => item.id === id
    );



if(!product) return;



product.quantity += value;



if(product.quantity <= 0){

    removeItem(id);

    return;

}


saveCart();


}

function removeItem(id){


cart =
    cart.filter(
        item => item.id !== id
    );


saveCart();


}

function saveCart(){


localStorage.setItem(

    "cart",

    JSON.stringify(cart)

);


renderCart();


}

function updateHeaderCart(){


const headerCount =
    document.getElementById(
        "cartCount"
    );


if(headerCount){


    const total =
    cart.reduce(

        (sum,item)=>
        sum + item.quantity,

        0

    );


    headerCount.textContent =
        total;


}


}

// CHECKOUT WITHOUT ALERT

const checkoutBtn =
document.querySelector(".checkout-btn");

if(checkoutBtn){

checkoutBtn.addEventListener(
    "click",
    function(e){


        if(cart.length === 0){


            e.preventDefault();


            cartItems.innerHTML = `


            <div class="empty-message">


                <i class="bi bi-cart-x"></i>


                <p>
                Նախ ավելացրեք ապրանք զամբյուղում
                </p>


            </div>


            `;


        }


    }
);


}

renderCart();
