document.addEventListener("DOMContentLoaded",()=>{


/* =========================
   HEADER SCROLL EFFECT
========================= */


const header=document.querySelector(".main-header");


window.addEventListener("scroll",()=>{


if(window.scrollY>50){

header.style.boxShadow=
"0 5px 20px rgba(0,0,0,.15)";


}else{


header.style.boxShadow=
"0 3px 15px rgba(0,0,0,.08)";


}


});





/* =========================
   ACTIVE MENU
========================= */


let currentPage=
window.location.pathname.split("/").pop();


document
.querySelectorAll(".nav-link")
.forEach(link=>{


let href=
link.getAttribute("href");


if(href===currentPage){

link.classList.add("active");

}


});






/* =========================
   SEARCH
========================= */


const searchInput=
document.getElementById(
"headerSearchInput"
);


const searchButton=
document.getElementById(
"headerSearchButton"
);



if(searchButton){


searchButton.addEventListener(
"click",
()=>{


let text=
searchInput.value.trim();



if(text!==""){


window.location.href=
"products.html?search="+
encodeURIComponent(text);



}



});


}



/* Enter key search */


if(searchInput){


searchInput.addEventListener(
"keypress",
(e)=>{


if(e.key==="Enter"){

searchButton.click();

}


});


}





/* =========================
 CART COUNT
========================= */


let cart=
JSON.parse(
localStorage.getItem("cart")
)
||[];



let count=
cart.reduce(
(sum,item)=>sum+item.quantity,
0
);



let cartCount=
document.getElementById(
"cartCount"
);



if(cartCount){

cartCount.innerHTML=count;

}





/* =========================
 MOBILE MENU CLOSE
========================= */


document
.querySelectorAll(".nav-link")
.forEach(link=>{


link.addEventListener(
"click",
()=>{


let menu=
document.getElementById(
"mainMenu"
);



if(
menu.classList.contains("show")
){


let bsCollapse=
bootstrap.Collapse
.getInstance(menu);


if(bsCollapse){

bsCollapse.hide();

}


}


});


});



});