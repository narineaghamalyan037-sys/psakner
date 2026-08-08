/* ==================================================

   PREMIUM CHECKOUT JS

   Ծաղկեպսակներ Online Shop

================================================== */


/* ==========================
   LOAD CART
========================== */


document.addEventListener("DOMContentLoaded",()=>{


loadCheckoutCart();


setupPayment();


setupRibbonExamples();


});







/* ==========================
   CART DATA
========================== */


function loadCheckoutCart(){


const cart =
JSON.parse(localStorage.getItem("cart")) || [];



const container =
document.getElementById("checkoutItems");


const totalElement =
document.getElementById("checkoutTotal");


const itemsTotal =
document.getElementById("itemsTotal");



if(!container)
return;



let total = 0;



container.innerHTML="";



if(cart.length===0){


container.innerHTML=`

<div class="text-center">

<i class="bi bi-cart-x fs-1"></i>

<p>
Զամբյուղը դատարկ է
</p>

</div>

`;


return;

}





cart.forEach(product=>{


let price =
Number(product.price);



let quantity =
product.quantity || 1;



let subtotal =
price * quantity;



total += subtotal;




container.innerHTML += `


<div class="summary-product mb-3">


<strong>

${product.name}

</strong>


<div>

${quantity} x ${price.toLocaleString()} ֏

</div>


</div>


`;



});





if(itemsTotal)

itemsTotal.innerText =
total.toLocaleString()+" ֏";





if(totalElement)

totalElement.innerText =
total.toLocaleString()+" ֏";




}





/* ==========================
   PAYMENT SWITCH
========================== */


function setupPayment(){


const bankRadio =
document.getElementById("bankPayment");


const bankCard =
document.getElementById("bankCard");



if(!bankRadio || !bankCard)

return;



bankCard.style.display="none";



document
.querySelectorAll('input[name="payment"]')
.forEach(payment=>{


payment.addEventListener("change",()=>{


if(bankRadio.checked){


bankCard.style.display="block";


}

else{


bankCard.style.display="none";


}



});


});



}









/* ==========================
   COPY CARD NUMBER
========================== */


function copyCardNumber(){



const card =
document.getElementById("cardNumber")
.innerText;



navigator.clipboard.writeText(card);



alert(
"Քարտի համարը պատճենվեց"
);



}








/* ==========================
   RIBBON QUICK TEXT
========================== */


function setupRibbonExamples(){



const buttons =
document.querySelectorAll(".example-btn");


const textarea =
document.getElementById("ribbonText");



if(!textarea)

return;



buttons.forEach(button=>{


button.addEventListener("click",()=>{


textarea.value =
button.innerText;



});


});


}









/* ==========================
   WHATSAPP ORDER
========================== */


const whatsappButton =
document.getElementById("whatsappOrder");



if(whatsappButton){


whatsappButton.addEventListener("click",()=>{



const name =
document.getElementById("customerName")?.value;



const phone =
document.getElementById("customerPhone")?.value;



const address =
document.getElementById("address")?.value;



const ribbon =
document.getElementById("ribbonText")?.value;



const total =
document.getElementById("checkoutTotal")?.innerText;




if(!name || !phone){


alert(
"Խնդրում ենք լրացնել անունը և հեռախոսը"
);


return;


}





let message = `

🌹 Նոր պատվեր | Ծաղկեպսակներ


👤 Պատվիրատու՝
${name}


📞 Հեռախոս՝
${phone}


📍 Հասցե՝
${address}


🎗 Ժապավենի գրություն՝
${ribbon}


💰 Ընդհանուր՝
${total}


`;





const whatsappNumber =
"374XXXXXXXX";



const url =
"https://wa.me/"
+ whatsappNumber
+
"?text="
+
encodeURIComponent(message);



window.open(url,"_blank");



});


}









/* ==========================
   FORM VALIDATION
========================== */


document
.querySelectorAll("input[required], textarea[required]")
.forEach(field=>{


field.addEventListener("blur",()=>{


if(!field.value.trim()){


field.classList.add("is-invalid");


}

else{


field.classList.remove("is-invalid");


}



});


});