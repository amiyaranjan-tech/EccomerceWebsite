
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.shop-item-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartClicked);
    });

    const cartItems = document.querySelector('.cart-items');
    const removeCartItemButtons = cartItems.querySelectorAll('.btn-danger');
    removeCartItemButtons.forEach(button => {
        button.addEventListener('click', removeCartItem);
    });

    const quantityInputs = cartItems.querySelectorAll('.cart-quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', quantityChanged);
    });

    const purchaseButton = document.querySelector('.btn-purchase');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', purchaseClicked);
    }
});

function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.querySelector('.shop-item-title').innerText;
    const price = parseFloat(shopItem.querySelector('.shop-item-price').innerText.replace('Rs.', ''));
    const imageSrc = shopItem.querySelector('.shop-item-image').src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    const cartItems = document.querySelector('.cart-items');
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (const cartItemName of cartItemNames) {
        if (cartItemName.innerText === title) {
            alert('This item is already added to the cart');
            return;
        }
    }

    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
}

function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {
    const cartItems = document.querySelector('.cart-items');
    const cartRows = cartItems.getElementsByClassName('cart-row');
    let total = 0;
    for (const cartRow of cartRows) {
        const priceElement = cartRow.querySelector('.cart-price');
        const quantityElement = cartRow.querySelector('.cart-quantity-input');
        const price = parseFloat(priceElement.innerText);
        const quantity = parseInt(quantityElement.value);
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    const cartTotalPrice = document.querySelector('.cart-total-price');
    if (cartTotalPrice) {
        cartTotalPrice.innerText = 'Rs.' + total;
    }
}

function purchaseClicked() {
    alert('Thank you for your purchase');

    // Clear cart items
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    // Update cart total to 0
    const cartTotalPrice = document.querySelector('.cart-total-price');
    if (cartTotalPrice) {
        cartTotalPrice.innerText = 'Rs.0';
    }

    // Clear the local storage
    localStorage.removeItem('cartItems');
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove("show")
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


let arra = ["assets/ban1.png", "assets/ban2.png", "assets/ban3.png"];
let sliderimg = document.querySelector(".sliderimages");
let prev = document.querySelector(".prev")
let next = document.querySelector(".next ")
let i = 0;

function updateSliderImage() {
    sliderimg.src = arra[i];
    sliderimg.style.opacity = 1;  // support line for fading
    sliderimg.style.transform = "scale(1)"; // support line for fading
}

function fadeOutImage() {     //for fading automatically when image changes accorfimg to set interval
    sliderimg.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    sliderimg.style.opacity = 0.1;
    sliderimg.style.transform = "scale(0.9)";
    setTimeout(() => {
        updateSliderImage();
    }, 500);
}

function slideImage() {  // for sliding images when user does it from next or prev buttons
    sliderimg.style.transform = "translateX(-100%)";
    setTimeout(() => {
        updateSliderImage();
        sliderimg.style.transform = "translateX(0)";
    }, 200);
}

next.addEventListener("click", () => {
    sliderimg.innerHTML = `<img src=${arra[i]}>`
    i++;
    if (i > arra.length - 1) {
        i = 0;
    }
    sliderimg.src = arra[i];
    slideImage();
})

prev.addEventListener("click", () => {
    sliderimg.innerHTML = `<img src=${arra[i]}>`
    i--;
    if (i < 0) {
        i = arra.length - 1;
    }
    sliderimg.src = arra[i];
    slideImage();
});

    updateSliderImage();

setInterval(() => {
    i++;
    if (i > arra.length - 1) {
        i = 0;
    }
    sliderimg.src = arra[i];
    fadeOutImage();
}, 3000);














































