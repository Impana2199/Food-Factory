let carts = document.querySelectorAll('.shop-item-button');

let products = [
    {
        name: 'Hot and Sour Soup',
        tag: 'hotandsoursoup',
        price: 150,
        inCart: 0
    },
    {
        name: 'Wonton Soup',
        tag: 'wontonsoup',
        price: 250,
        inCart: 0
    },
    {
        name: 'Egg Drop Soup',
        tag: 'eggdropsoup',
        price: 100,
        inCart: 0
    },
    {
        name: 'Chicken Noodle Soup',
        tag: 'chickennoodlesoup',
        price: 190,
        inCart: 0
    },
    {
        name: 'Egg Roll',
        tag: 'eggroll',
        price: 210,
        inCart: 0
    },
    {
        name: 'Pot Stickers',
        tag: 'potstickers',
        price: 150,
        inCart: 0
    },
    {
        name: 'Scallion-pancake',
        tag: 'scallianpancake',
        price: 250,
        inCart: 0
    },
    {
        name: 'Sweet Bun',
        tag: 'sweetbun',
        price: 90,
        inCart: 0
    },
    {
        name: 'Terikai Tofu Rice Bowl',
        tag: 'terikaitofu',
        price: 230,
        inCart: 0
    },
    {
        name: 'Steamed Mixed Vegetables',
        tag: 'steamedmixedvegetables',
        price: 160,
        inCart: 0
    },
    {
        name: 'Bubble Tea',
        tag: 'bubbletea',
        price: 110,
        inCart: 0
    },
    {
        name: 'Jiuniang',
        tag: 'jiuniang',
        price: 230,
        inCart: 0
    }

];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if( productNumbers ) {
        document.querySelector('.menu-itemsss span').textContent = productNumbers;
    }
}

function cartNumbers(product)  {
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    if( productNumbers ){
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector('.menu-itemsss span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.menu-itemsss span').textContent = 1;
    }

    setItems(product);
    
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product){
    //console.log("The products price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is" , cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost" , cartCost + product.price);
    }else{
        localStorage.setItem("totalCost" , product.price);
    }

    
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    
    console.log(cartItems);
    if( cartItems && productContainer){
        productContainer.innerHTML = '' ;
        Object.values(cartItems).map(item =>
        {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon> 
                
                <span>${item.name}</span>
            </div>

            <div class="price">${item.price}</div>
            <div class="quantity">
                <ion-icon name="arrow-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle"></ion-icon>
            </div>
            `
        });
    }
}

onLoadCartNumbers();
displayCart();