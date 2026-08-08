const products = [
{
id: 1,
name: "Սպիտակ վարդերի պսակ",
description: "Նրբաճաշակ և դասական ձևավորում",
price: 25000,
category: "Վարդեր",
image: "images/product-1.jpg"
},
{
id: 2,
name: "Կարմիր վարդերի պսակ",
description: "Հարգանքի և հիշողության խորհրդանիշ",
price: 30000,
category: "Վարդեր",
image: "images/product-2.jpg"
},
{
id: 3,
name: "Խառը ծաղիկների պսակ",
description: "Բնական գույների գեղեցիկ համադրություն",
price: 35000,
category: "Խառը",
image: "images/product-3.jpg"
},
{
id: 4,
name: "Նուրբ սպիտակ պսակ",
description: "Էլեգանտ և հանգիստ ձևավորում",
price: 28000,
category: "Դասական",
image: "images/product-4.jpg"
},
{
id: 5,
name: "Վարդագույն ծաղկեպսակ",
description: "Նուրբ և գեղեցիկ տեսք",
price: 27000,
category: "Խառը",
image: "images/product-5.jpg"
},
{
id: 6,
name: "Շքեղ ծաղկեպսակ",
description: "Պրեմիում դասի ծաղկային ձևավորում",
price: 45000,
category: "Դասական",
image: "images/product-6.jpg"
},
{
id: 7,
name: "Բնական ոճի պսակ",
description: "Կանաչ և սպիտակ երանգների համադրություն",
price: 32000,
category: "Խառը",
image: "images/product-7.jpg"
},
{
id: 8,
name: "Մեծ ծաղկեպսակ",
description: "Հատուկ պատվերների համար",
price: 55000,
category: "Դասական",
image: "images/product-8.jpg"
},
{
id: 9,
name: "Սպիտակ շուշանների պսակ",
description: "Նուրբ և հանդիսավոր ծաղկային ձևավորում",
price: 38000,
category: "Դասական",
image: "images/product-9.jpg"
},
{
id: 10,
name: "Կարմիր և սպիտակ վարդեր",
description: "Գույների գեղեցիկ և ներդաշնակ համադրություն",
price: 40000,
category: "Վարդեր",
image: "images/product-10.jpg"
},
{
id: 11,
name: "Դասական ծաղկեպսակ",
description: "Ավանդական և գեղեցիկ ձևավորում",
price: 30000,
category: "Դասական",
image: "images/product-11.jpg"
},
{
id: 12,
name: "Սպիտակ քրիզանթեմների պսակ",
description: "Հանգիստ և նրբաճաշակ տեսք",
price: 33000,
category: "Դասական",
image: "images/product-12.jpg"
},
{
id: 13,
name: "Վարդերի շքեղ կոմպոզիցիա",
description: "Հատուկ օրերի համար գեղեցիկ տարբերակ",
price: 50000,
category: "Վարդեր",
image: "images/product-13.jpg"
},
{
id: 14,
name: "Սպիտակ և կանաչ պսակ",
description: "Բնական երանգներով նուրբ ձևավորում",
price: 36000,
category: "Խառը",
image: "images/product-14.jpg"
},
{
id: 15,
name: "Կարմիր ծաղիկների պսակ",
description: "Խոր և արտահայտիչ գունային համադրություն",
price: 42000,
category: "Վարդեր",
image: "images/product-15.jpg"
},
{
id: 16,
name: "Նուրբ վարդագույն պսակ",
description: "Թեթև և գեղեցիկ ծաղկային լուծում",
price: 35000,
category: "Խառը",
image: "images/product-16.jpg"
},
{
id: 17,
name: "Պրեմիում ծաղկեպսակ",
description: "Շքեղ և մեծածավալ ձևավորում",
price: 60000,
category: "Դասական",
image: "images/product-17.jpg"
},
{
id: 18,
name: "Դեղին ծաղիկների պսակ",
description: "Վառ և ջերմ գույների համադրություն",
price: 34000,
category: "Խառը",
image: "images/product-18.jpg"
},
{
id: 19,
name: "Սպիտակ վարդերի մեծ պսակ",
description: "Մեծ և նրբաճաշակ ծաղկային ձևավորում",
price: 52000,
category: "Վարդեր",
image: "images/product-19.jpg"
},
{
id: 20,
name: "Հիշատակի դասական պսակ",
description: "Զուսպ և գեղեցիկ ձևավորում",
price: 37000,
category: "Դասական",
image: "images/product-20.jpg"
},
{
id: 21,
name: "Վարդերի նուրբ պսակ",
description: "Թարմ ծաղիկներով գեղեցիկ տարբերակ",
price: 39000,
category: "Վարդեր",
image: "images/product-21.jpg"
},
{
id: 22,
name: "Սպիտակ ծաղիկների կոմպոզիցիա",
description: "Նրբագեղ և հանգիստ գունային լուծում",
price: 41000,
category: "Խառը",
image: "images/product-22.jpg"
},
{
id: 23,
name: "Շքեղ հիշատակի պսակ",
description: "Պրեմիում ծաղիկներով մեծ ձևավորում",
price: 65000,
category: "Դասական",
image: "images/product-23.jpg"
},
{
id: 24,
name: "Կարմիր վարդերի կոմպոզիցիա",
description: "Արտահայտիչ և գեղեցիկ ծաղկային լուծում",
price: 48000,
category: "Վարդեր",
image: "images/product-24.jpg"
},
{
id: 25,
name: "Գունավոր ծաղկեպսակ",
description: "Տարբեր ծաղիկների գեղեցիկ համադրություն",
price: 43000,
category: "Խառը",
image: "images/product-25.jpg"
},
{
id: 26,
name: "Դասական մեծ պսակ",
description: "Ավանդական ոճով մեծածավալ ձևավորում",
price: 58000,
category: "Դասական",
image: "images/product-26.jpg"
},
{
id: 27,
name: "Սպիտակ վարդերի կոմպոզիցիա",
description: "Մաքուր և նուրբ ծաղկային ձևավորում",
price: 44000,
category: "Վարդեր",
image: "images/product-27.jpg"
},
{
id: 28,
name: "Բնական ծաղկային պսակ",
description: "Կանաչ և բաց գույների ներդաշնակություն",
price: 46000,
category: "Խառը",
image: "images/product-28.jpg"
},
{
id: 29,
name: "Հատուկ պատվերի պսակ",
description: "Անհատական ձևավորմամբ մեծ ծաղկեպսակ",
price: 70000,
category: "Դասական",
image: "images/product-29.jpg"
},
{
id: 30,
name: "Պրեմիում վարդերի պսակ",
description: "Շքեղ և բացառիկ ծաղկային ձևավորում",
price: 75000,
category: "Վարդեր",
image: "images/product-30.jpg"
}
];
