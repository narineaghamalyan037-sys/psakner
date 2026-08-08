function updateCartBadge(){


const badge =
document.getElementById("cartBadge");



if(!badge){

return;

}



let cart =
JSON.parse(localStorage.getItem("cart")) || [];



let count = 0;



cart.forEach(item=>{

count += item.quantity;

});



badge.innerHTML=count;


}



updateCartBadge();