let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let OptionSnackHTML = document.querySelector('.OptionSnack');
let listCartHTML = document. querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let OptionSnack = [];
let carts =[];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    OptionSnackHTML.innerHTML = '';
    if(OptionSnack.length > 0){
        OptionSnack.forEach(product=> {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}.00</div>
                <button class="addCart">
                    Add To Cart
                </button>
                `;
                OptionSnackHTML.appendChild(newProduct);
        })
    }
}
let listCart = [];

function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

function addCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    if(!listCart[$idProduct]){
        let dataProduct = ProductCopy.filter(
            product => product.id == $idProduct
        )[0];
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity=1;
    }else{
        listcart[$idProduct].quantity++;
    }

    let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart"+JSON.stringify(listCart)+"; "+timeSave+"; path=/;";
}

checkCart();

 OptionSnackHTML.addEventListener('click', (event) => {
    let positionClick =event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
 })

 const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity +1;
    }

    addCartToHTML();
    addCartToMemory();

 }

 const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

 const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length >0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = OptionSnack.findIndex((value) => value.id == cart.product_id);
            let info = OptionSnack[positionProduct];
            newCart.innerHTML = `<div class="image">
            <img src="${info.image}" alt="">
        </div>
        <div class="name">
            ${info.name}
        </div>
        <div class="totalPrice">
            ${info.price * cart.quantity}.00
        </div>
        <div class="quantity">
            <span class="minus"><</span>
            <span>${cart.quantity}</span>
            <span class="plus">></span>
        </div>
        `;
        listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
 }

 listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
 })

const changeQuantity = (product_id, type) => {
    let positiionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positiionItemInCart >= 0){
        switch (type){
            case 'plus':
                carts[positiionItemInCart].quantity = carts[positiionItemInCart].quantity + 1;
                break;

                default:
                    let valueChange = carts[positiionItemInCart].quantity - 1;
                    if(valueChange >0){
                        carts[positiionItemInCart].quantity = valueChange;
                    }else{
                        carts.splice(positiionItemInCart, 1);
                    }
                    break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

const initApp = () => {
    fetch('Snacks.json')
    .then(response => response.json())
    .then(data => {
        OptionSnack = data;
        addDataToHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();