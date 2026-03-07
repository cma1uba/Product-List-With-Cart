const products = [
    {
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
]

const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector(".cart-close");
const container = document.getElementById("product-grid");

let cartBasket = [];

// Toggle Cart Sidebar
cartIcon?.addEventListener("click", () => cart.classList.add("active"));
cartClose?.addEventListener("click", () => cart.classList.remove("active"));

// Display Products
function displayProducts() {
    const htmlContent = products.map(product => `
        <div class="product-card">
            <picture class="image-container">
                <source media="(min-width: 1024px)" srcset="${product.image.desktop}">
                <source media="(min-width: 768px)" srcset="${product.image.tablet}">
                <img src="${product.image.mobile}" alt="${product.name}">
                <button class="add-to-cart" data-name="${product.name}">
                    <img src="assets/images/icon-add-to-cart.svg" alt="icon"> Add to Cart
                </button>
            </picture>
            <div class="product-desc">
                <span class="product-category">${product.category}</span>
                <h2 class="product-title">${product.name}</h2>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join("");
    
    container.innerHTML = htmlContent;
}

// Add to Cart Logic
container.addEventListener("click", (e) => {
    // Check if clicked element OR its parent (the button) was clicked
    const btn = e.target.closest(".add-to-cart");
    if (btn) {
        const productName = btn.getAttribute("data-name");
        const selectedProduct = products.find(p => p.name === productName);
        addToCart(selectedProduct);
    }
});

function addToCart(product) {
    const existingItem = cartBasket.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartBasket.push({ ...product, quantity: 1 });
    }
    renderCart();
}

// Render Cart
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    if (cartBasket.length === 0) {
        cartContainer.innerHTML = `<p>Your cart is empty</p>`;
        return;
    }

    const cartHTML = cartBasket.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>
                    <span id="quantity">${item.quantity}x</span>
                    <span class="item-price">@$${item.price.toFixed(2)}</span>
                    <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                </p>
            </div>
            </div>
    `).join("");

    // FIXED: The reduce parameters were swapped, and "totak" was a typo
    const total = cartBasket.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartContainer.innerHTML = `
        ${cartHTML}
        <hr>
        <div class="total-div">
            <p>Order Total</p>
            <h1>$${total.toFixed(2)}</h1>
        </div>
    `;
}

// Initialize
displayProducts();
renderCart();
