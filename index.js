// Initialize the amountValue at the top level of the script
let amountValue = 0;
let currentIndex = 1;

// Select DOM elements
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.querySelector(".close-btn");
const menu = document.querySelector(".nav_links");
const overlay = document.querySelector(".overlay");
const mainThumbnail = document.querySelector(".main-thumbnail");
const lightbox = document.querySelector(".lightbox");
const lightboxMainThumbnail = document.querySelector(".lightbox .main-thumbnail");
const thumbnails = document.querySelectorAll(".preview img");
const amountDisplay = document.querySelector(".amount");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const thumbMob = document.querySelector(".thumb-mob");
const cartBtn = document.querySelector(".cart-btn");
const cartWrapper = document.querySelector(".cart-wrp");
const closeLightboxBtn = document.querySelector(".close-lightbox");
const addToCartButton = document.querySelector(".add_btn");
const cartIndicator = document.querySelector(".indicator");
const cartContent = document.querySelector(".cart-content");

// Set the cart indicator to be hidden initially
cartIndicator.style.display = "none";

// Function definitions
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
    amountDisplay.textContent = amountValue;
}

function handleMinus() {
    if (amountValue > 0) {
        amountValue--;
        amountDisplay.textContent = amountValue;
    }
}

function nextImage() {
    currentIndex = currentIndex === 4 ? 1 : currentIndex + 1;
    updateMainImage(currentIndex, true);
}

function prevImage() {
    currentIndex = currentIndex === 1 ? 4 : currentIndex - 1;
    updateMainImage(currentIndex, true);
}

function updateMainImage(index, isLightbox = false) {
    const newImageSrc = `./images/image-product-${index}.jpg`;
    if (!isLightbox) {
        mainThumbnail.src = newImageSrc;
    } else {
        lightboxMainThumbnail.src = newImageSrc;
    }
    thumbnails.forEach((image) => {
        image.addEventListener("click", () => {
            const index = parseInt(image.getAttribute('data-index'));
            openLightBox(index);
        });
    });

}

function toggleCart() {
    cartWrapper.classList.toggle("invisible");
    overlay.classList.toggle("invisible");
}

function closeLightBox() {
    lightbox.classList.add("invisible");
    overlay.classList.add("invisible");
}

function openLightBox(index) {
    currentIndex = index || 1;
    lightbox.classList.remove("invisible");
    overlay.classList.remove("invisible");
    updateMainImage(currentIndex, true);
}

function addItem() {
    const total = (125.00 * amountValue).toFixed(2);
    cartContent.classList.remove("empty");
    cartContent.innerHTML = `
        <div class="product">
            <div class="product-details">
                <img src="./images/image-product-1-thumbnail.jpg" class="product-img" alt="product">
                <div class="product-info">
                    <p class="product-title">Fall Limited Edition Sneakers</p>
                    <p><span>$125.00</span> × <span class="number">${amountValue}</span> = <b>$${total}</b></p>
                </div>
                <button class="delete-btn">
                    <img src="./images/icon-delete.svg" alt="delete">
                </button>
            </div>
            <button class="checkout-btn">Checkout</button>
        </div>`;
    cartIndicator.style.display = "block";
    cartIndicator.textContent = amountValue;
    document.querySelector(".delete-btn").addEventListener("click", deleteItem);
}

function deleteItem() {
    amountValue = 0;
    amountDisplay.textContent = amountValue;
    cartContent.classList.add("empty");
    cartContent.innerHTML = '<p>Your cart is empty</p>';
    cartIndicator.style.display = "none";
    cartWrapper.classList.add('invisible');
}

// Event listeners
menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
document.getElementById('plus').addEventListener("click", handlePlus);
document.getElementById('minus').addEventListener("click", handleMinus);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);
cartBtn.addEventListener("click", toggleCart);
closeLightboxBtn.addEventListener("click", closeLightBox);
mainThumbnail.addEventListener("click", () => openLightBox());
addToCartButton.addEventListener("click", () => {
    addItem();
    toggleCart(); // Open cart when item is added
});

thumbnails.forEach((image, index) => {
    image.addEventListener("click", () => {
        openLightBox(index + 1); // The index starts from 0 hence add 1
    });
});

// Close the cart if the user clicks outside of it
window.addEventListener('click', function(e) {
    if (!cartWrapper.contains(e.target) && !cartBtn.contains(e.target) && !cartWrapper.classList.contains('invisible')) {
        toggleCart();
    }
});

// Prevent the menu overlay from closing the cart when clicked
overlay.addEventListener('click', function(e) {
    e.stopPropagation();
});