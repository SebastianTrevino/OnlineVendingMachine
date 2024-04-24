let listCartHTML = [];

const checkCart = () =>{
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCartHTML = jSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();
addCartToHTML();

const addCartToHTML = () =>{
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML = '';
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;

    if(listCartHTML){
        listCartHTML.forEach(initApp => {
            if(initApp){
                newP = document.createElement('div');
                newP.classList.add('item');
                newP.innerHTML = `
                <img src="${snacks.image}" alt="">
                        <div class="info">
                            <div class="name">${snacks.name}</div>
                            <div class="price">$${snacks.price}</div>
                        </div>
                        <div class="quantity">1</div>
                        <div class="returnPrice">$${snacks.price * snacks.quantity}</div>
                `;
                listCartHTML.appendChild(newP);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = "$" +totalPrice;
}