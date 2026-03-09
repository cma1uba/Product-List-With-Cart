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
];
    
const cartIcon = document.querySelector("#cart-icon-div");
const cartContainer = document.querySelector(".cart");
const cartClose = document.querySelector(".cart-close");
const container = document.getElementById("product-grid");
const itemCount = document.getElementById("item-count");

let cart = [];

if(cartIcon) cartIcon.addEventListener("click", () => cartContainer.classList.add("active"));
if(cartClose) cartClose.addEventListener("click", () => cartContainer.classList.remove("active"));

function displayProducts(items) {
    const htmlContent = items.map(product => `
          <div class="product-card">
            <picture class="image-container">
                 <source media="(min-width: 1024px)" srcset="${product.image.desktop}">
                 <source media="(min-width: 768px)" srcset="${product.image.tablet}">
                 <img src="${product.image.mobile}" alt="${product.name}">
                 <button class="add-to-cart" data-name="${product.name}">
                    <img src="assets/images/icon-add-to-cart.svg" alt=""> Add to Cart
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

container.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if(btn) {
        const productName = btn.getAttribute('data-name');
        const selectedProduct = products.find(p => p.name === productName);
        addToCart(selectedProduct);
    }
});

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    renderCart();
}
// 3. Event Delegation for Removing Items
const cartItemsList = document.getElementById('cart-items');

cartItemsList.addEventListener('click', (e) => {
    // Check if the clicked element (or its parent) is the remove icon
    const removeBtn = e.target.closest('.cart-item-remove');
    
    if (removeBtn) {
        const productName = removeBtn.getAttribute('data-name');
        removeFromCart(productName);
    }
});

function removeFromCart(productName) {
    // Reassign the cart array to exclude the item with the matching name
    cart = cart.filter(item => item.name !== productName);
    
    // Refresh the UI
    renderCart();
}

function renderCart() {
    const cartItemsList = document.getElementById('cart-items');
    if (!cartItemsList) return;

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
         <div class="empty-cart">
         <img src="assets/images/illustration-empty-cart.svg">
         <p>Your added items will appear here</p>
         </div>`;
        return;
    }
    
    const cartHTML = cart.map(item => `
         <div class="cart-item">
            <img class="thumbnail" src="${item.image.thumbnail}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>
                    <span class="quantity">${item.quantity}x</span>
                    <span class="item-price">@ $${item.price.toFixed(2)}</span>
                    <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                </p>
            </div>
            <img class="cart-item-remove" src="assets/images/icon-remove-cart-item.svg" data-name="${item.name}">
        </div>
    `).join('');
     
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
    cartItemsList.innerHTML = `
        ${cartHTML}
        <hr>
        <div class="total-div">
            <p>Order Total</p>
            <h1>$${total.toFixed(2)}</h1>
        </div>
    `;
}

displayProducts(products);
renderCart();