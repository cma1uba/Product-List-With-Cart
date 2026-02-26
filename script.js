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

let cart = []; 

const container = document.getElementById('product-grid');

function displayProducts(items) {
   
    const htmlContent = items.map(product => `
        <div class="product-card">
            <picture class="img-container">
                <source media="(min-width: 1024px)" srcset="${product.image.desktop}">
                <source media="(min-width: 768px)" srcset="${product.image.tablet}">
                <img src="${product.image.mobile}" alt="${product.name}">
            </picture>
            <div class="product-info">
                <span class="category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-name="${product.name}">Add to Cart</button>
            </div>
        </div>
    `).join('');
    
    if(container) {
        container.innerHTML = htmlContent;
    }

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productName = e.target.getAttribute('data-name');
        const selectedProduct = products.find(p => p.name === productName);
        addToCart(selectedProduct);
    }
});

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    // Safety check in case the HTML element is missing
    if (!cartContainer) return; 

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    const cartHtml = cart.map(item => `
        <div class="cart-item">
            <p>${item.name} x ${item.quantity}</p>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartContainer.innerHTML = `
        ${cartHtml}
        <hr>
        <div class="cart-total"><strong>Total: $${total.toFixed(2)}</strong></div>
    `;
}

displayProducts(products);
renderCart();
