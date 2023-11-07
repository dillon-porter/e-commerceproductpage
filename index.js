const IMAGE_COUNT = 4;
const PRODUCT_PRICE = 125.00;
let amountValue = 0;
let currentImg = 1;

// Cache DOM elements
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.querySelector(".close-btn");
const menu = document.querySelector(".nav_links");
const overlay = document.querySelector(".overlay");
const mainThumbnail = document.querySelector(".main-thumbnail");
const mainThumbnailLightBox = document.querySelector(".lightbox-container .main-thumbnail");
const images = document.querySelectorAll(".preview img");
const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const amount = document.querySelector(".amount");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const thumbMob = document.querySelector(".thumb-mob");
const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart-wrp");
const closeLightboxBtn = document.querySelector(".close-lightbox");
const lightbox = document.querySelector(".lightbox");
const addBtn = document.querySelector(".add_btn");
const indicator = document.querySelector(".indicator");
const wrp = document.querySelector(".cart-content");

// Hide the cart indicator initially
indicator.style.display = "none";

// Utility functions
function updateThumbnailImage(imageNumber) {
    const imagePath = `./images/image-product-${imageNumber}.jpg`;
    mainThumbnail.src = imagePath;
    mainThumbnailLightBox.src = imagePath;
}

function toggleElementVisibility(element, isVisible) {
    element.style.display = isVisible ? 'block' : 'none';
}

// Event handler functions
function openMenu() {
    menu.classList.add("active");
    overlay.classList.add("active");
}

function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
}

function handlePlus() {
    amountValue++;
    amount.innerText = amountValue;
}

function handleMinus() {
    if (amountValue > 0) {
        amountValue--;
        amount.innerText = amountValue;
    }
}

function nextImage() {
    currentImg = currentImg % IMAGE_COUNT + 1;
    thumbMob.src = `./images/image-product-${currentImg}.jpg`;
}

function prevImage() {
    currentImg = (currentImg + IMAGE_COUNT - 2) % IMAGE_COUNT + 1;
    thumbMob.src = `./images/image-product-${currentImg}.jpg`;
}

function toggleCart() {
    cart.classList.toggle("invisible");
}

function closeLightBox() {
    lightbox.classList.add("invisible");
}

function openLightBox() {
    lightbox.classList.remove("invisible");
}

function addItem() {
    if (amountValue > 0) {
        const total = PRODUCT_PRICE * amountValue;
        wrp.classList.remove("empty");
        wrp.innerHTML = `
        <div class="product">
          <div>
            <img src="./images/image-product-1-thumbnail.jpg" class="product-img" alt="product">
            <div class="product-info">
              <p class="product-title">Fall Limited Edition Sneakers</p>
              <p>
                <span>$${PRODUCT_PRICE.toFixed(2)}</span> × 
                <span class="number">${amountValue}</span>
                <span> = </span>
                <b>$${total.toFixed(2)}</b>
              </p>
            </div>
            <button class="delete-btn"><img src="./images/icon-delete.svg" alt="delete"></button>
          </div>
          <button class="checkout-btn">Checkout</button>
        </div>`;
        toggleElementVisibility(indicator, true);
        indicator.innerText = amountValue;
    }
}



function deleteItem() {
    wrp.classList.add("empty");
    wrp.innerHTML = `<p>Your cart is empty</p>`;
    toggleElementVisibility(indicator, false);
}

// Event listeners
document.querySelector('.preview').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        images.forEach(img => img.classList.remove('selected'));
        e.target.classList.add('selected');
        let selectedImageIndex = Array.from(images).indexOf(e.target) + 1;
        updateThumbnailImage(selectedImageIndex);
    }
});

// Utility function to check if the click is outside of an element
function clickOutsideElement(event, element) {
    return !element.contains(event.target);
}

document.addEventListener('click', function(event) {
    // Check if the click is outside the cart and the cart is visible
    if (clickOutsideElement(event, cart) && !cart.classList.contains("invisible")) {
        // Check if the click is not on the cart button or any of its children
        if (!event.target.closest('.cart-btn')) {
            cart.classList.add("invisible");
        }
    }

    // Check if the delete button inside the cart was clicked
    if (event.target.matches('.delete-btn') || event.target.closest('.delete-btn')) {
        deleteItem();
    }
});


menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
plusBtn.addEventListener("click", handlePlus);
minusBtn.addEventListener("click", handleMinus);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);
cartBtn.addEventListener("click", toggleCart);
closeLightboxBtn.addEventListener("click", closeLightBox);
mainThumbnail.addEventListener("click", openLightBox);
addBtn.addEventListener("click", addItem);
document.addEventListener('click', function(e) {
    if (e.target.matches('.delete-btn')) {
        deleteItem();
    }
});

// Initialize the first image
updateThumbnailImage(currentImg);