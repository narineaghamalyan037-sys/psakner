document.addEventListener("click", function(e){


const button =
e.target.closest(".add-to-cart");


if(!button){

return;

}



const id =
Number(button.dataset.id);



let cart =
JSON.parse(localStorage.getItem("cart")) || [];



const product =
products.find(item=>item.id===id);



const exist =
cart.find(item=>item.id===id);



if(exist){


exist.quantity++;


}else{


cart.push({

...product,

quantity:1

});


}



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



updateCartBadge();



alert(
product.name + " ավելացվեց զամբյուղում 🛒"
);



});