function updateMiniCart(){


let cart =
JSON.parse(localStorage.getItem("cart")) || [];



let count = 0;

let total = 0;



cart.forEach(item=>{


count += item.quantity;


total += item.price * item.quantity;


});



document.getElementById("miniCartCount").innerHTML=count;


document.getElementById("miniCartTotal").innerHTML =
total.toLocaleString()+" ֏";



}



updateMiniCart();