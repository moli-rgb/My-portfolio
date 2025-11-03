// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const productsContainer = document.getElementById('products-container');
const productDetailsContainer = document.getElementById('product-details-container');
const cartContainer = document.getElementById('cart-container');
const cartSummary = document.getElementById('cart-summary');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const ordersContainer = document.getElementById('orders-container');
const adminProductsContainer = document.getElementById('admin-products-container');
const addProductForm = document.getElementById('add-product-form');

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let token = localStorage.getItem('token');

// Utility Functions
function formatCurrency(amount) {
    // Ensure amount is a number
    const num = parseFloat(amount);
    if (isNaN(num)) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(num);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showToast(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#007bff';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    token = null;
    showToast('You have been logged out');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// API Functions
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const products = await response.json();
        console.log('Fetched products:', products); // Debug log
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        const product = await response.json();
        console.log('Fetched product by ID:', product); // Debug log
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: error.message };
    }
}

async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: error.message };
    }
}

async function createOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
    }
}

async function fetchOrders() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const orders = await response.json();
        return { success: response.ok, data: orders };
    } catch (error) {
        console.error('Error fetching orders:', error);
        return { success: false, error: error.message };
    }
}

async function addProduct(productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Error adding product:', error);
        return { success: false, error: error.message };
    }
}

// Render Functions
function renderProducts(products) {
    if (!productsContainer) return;
    
    console.log('Rendering products:', products); // Debug log
    
    productsContainer.innerHTML = products.map(product => {
        // Debug log for each product
        console.log('Product data:', product);
        
        return `
        <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/300x200?text=Product+Image'; console.log('Image failed to load for product:', '${product.name}');">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 100)}...</p>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <a href="product.html?id=${product.id}" class="btn">View Details</a>
            </div>
        </div>
    `}).join('');
}

function renderProductDetails(product) {
    if (!productDetailsContainer) return;
    
    // Ensure product data is valid
    if (!product || !product.id) {
        productDetailsContainer.innerHTML = '<p>Product not found</p>';
        return;
    }
    
    productDetailsContainer.innerHTML = `
        <div class="product-images">
            <img src="${product.imageUrl}" alt="${product.name}" class="main-image" onerror="this.src='https://placehold.co/600x400?text=Product+Image'">
        </div>
        <div class="product-content">
            <h2>${product.name}</h2>
            <div class="price">${formatCurrency(product.price)}</div>
            <p class="description">${product.description}</p>
            <div class="quantity-selector">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" class="quantity-input" value="1" min="1" max="${product.stock}">
            </div>
            <button class="btn" onclick="addToCart('${product.id}', '${product.name}', ${parseFloat(product.price)}, '${product.imageUrl}')">Add to Cart</button>
        </div>
    `;
}

function renderCart() {
    if (!cartContainer || !cartSummary) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        cartSummary.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    // Render cart items
    cartContainer.innerHTML = cart.map(item => {
        // Ensure item data is valid
        const itemId = item.id || item.productId || '';
        const itemName = item.name || 'Unknown Product';
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity) || 0;
        const itemImage = item.image || item.imageUrl || 'https://placehold.co/100x100?text=Product';
        
        return `
        <div class="cart-item">
            <img src="${itemImage}" alt="${itemName}" class="item-image" onerror="this.src='https://placehold.co/100x100?text=Product'">
            <div class="item-details">
                <h3>${itemName}</h3>
                <div class="item-price">${formatCurrency(itemPrice)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${itemId}', -1)">-</button>
                <span class="quantity-value">${itemQuantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${itemId}', 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart('${itemId}')">&times;</button>
        </div>
    `}).join('');
    
    // Render cart summary
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return sum + (price * quantity);
    }, 0);
    
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;
    
    cartSummary.innerHTML = `
        <h3>Order Summary</h3>
        <div class="summary-item">
            <span>Subtotal:</span>
            <span>${formatCurrency(subtotal)}</span>
        </div>
        <div class="summary-item">
            <span>Shipping:</span>
            <span>${formatCurrency(shipping)}</span>
        </div>
        <div class="summary-item summary-total">
            <span>Total:</span>
            <span>${formatCurrency(total)}</span>
        </div>
        <button class="btn checkout-btn" onclick="checkout()">Proceed to Checkout</button>
    `;
}

function renderOrders(orders) {
    if (!ordersContainer) return;
    
    if (!orders || orders.length === 0) {
        ordersContainer.innerHTML = '<p>You have no orders yet.</p>';
        return;
    }
    
    ordersContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <h3>Order #${order.id}</h3>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
            <div class="order-date">${formatDate(order.createdAt)}</div>
            <div class="order-items">
                ${(order.OrderItems || order.items || []).map(item => `
                    <div class="order-item">
                        <span>${(item.Product || item.product || {}).name || 'Unknown Product'} (x${item.quantity})</span>
                        <span>${formatCurrency(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <strong>Total: ${formatCurrency(order.totalAmount)}</strong>
            </div>
        </div>
    `).join('');
}

function renderAdminProducts(products) {
    if (!adminProductsContainer) return;
    
    adminProductsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/300x200?text=Product+Image'">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 100)}...</p>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <div class="product-stock">Stock: ${product.stock}</div>
                <!-- In a real app, you would add edit/delete buttons here -->
            </div>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(productId, name, price, image) {
    // Ensure data is valid
    const validPrice = parseFloat(price);
    const validId = String(productId);
    
    if (isNaN(validPrice)) {
        showToast('Invalid product price');
        return;
    }
    
    const existingItem = cart.find(item => String(item.id) === validId);
    
    if (existingItem) {
        existingItem.quantity = parseInt(existingItem.quantity) + 1;
    } else {
        cart.push({
            id: validId,
            name: name,
            price: validPrice,
            image: image,
            quantity: 1
        });
    }
    
    saveCart();
    showToast('Item added to cart!');
    
    // Update cart UI if on cart page
    if (cartContainer) {
        renderCart();
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => String(item.id) === String(productId));
    
    if (item) {
        item.quantity = parseInt(item.quantity) + change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => String(item.id) !== String(productId));
        }
        
        saveCart();
        renderCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => String(item.id) !== String(productId));
    saveCart();
    renderCart();
}

// Order Functions
async function checkout() {
    if (!token) {
        showToast('Please login to checkout');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    if (cart.length === 0) {
        showToast('Your cart is empty');
        return;
    }
    
    const orderData = {
        items: cart.map(item => ({
            product: item.id,
            quantity: parseInt(item.quantity)
        })),
        totalAmount: cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return sum + (price * quantity);
        }, 0) + 5.99
    };
    
    const result = await createOrder(orderData);
    
    if (result.success) {
        showToast('Order placed successfully!');
        // Clear cart
        cart = [];
        saveCart();
        renderCart();
        
        // Redirect to order confirmation or orders page
        setTimeout(() => {
            window.location.href = 'orders.html';
        }, 2000);
    } else {
        showToast(result.data.message || 'Failed to place order');
    }
}

// Admin Functions
async function handleAddProduct(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        imageUrl: formData.get('imageUrl'),
        stock: parseInt(formData.get('stock'))
    };
    
    // Validate data
    if (isNaN(productData.price) || isNaN(productData.stock)) {
        showToast('Please enter valid numbers for price and stock');
        return;
    }
    
    const result = await addProduct(productData);
    
    if (result.success) {
        showToast('Product added successfully!');
        e.target.reset();
        // Refresh products list
        const products = await fetchProducts();
        renderAdminProducts(products);
    } else {
        showToast(result.data.message || 'Failed to add product');
    }
}

// Event Listeners
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const result = await loginUser({ email, password });
        
        if (result.success) {
            localStorage.setItem('token', result.data.token);
            token = result.data.token;
            showToast('Login successful!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showToast(result.data.message || 'Login failed');
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            showToast('Passwords do not match');
            return;
        }
        
        const result = await registerUser({ name, email, password });
        
        if (result.success) {
            showToast('Registration successful!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            showToast(result.data.message || 'Registration failed');
        }
    });
}

if (addProductForm) {
    addProductForm.addEventListener('submit', handleAddProduct);
}

// Initialize pages
document.addEventListener('DOMContentLoaded', async () => {
    // Home and Products page
    if (productsContainer) {
        const products = await fetchProducts();
        renderProducts(products);
    }
    
    // Product details page
    if (productDetailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            const product = await fetchProductById(productId);
            if (product) {
                renderProductDetails(product);
            } else {
                productDetailsContainer.innerHTML = '<p>Product not found</p>';
            }
        }
    }
    
    // Cart page
    if (cartContainer) {
        renderCart();
    }
    
    // Orders page
    if (ordersContainer) {
        if (!token) {
            ordersContainer.innerHTML = '<p>Please <a href="login.html">login</a> to view your orders.</p>';
        } else {
            const result = await fetchOrders();
            if (result.success) {
                renderOrders(result.data);
            } else {
                ordersContainer.innerHTML = '<p>Error loading orders. Please try again later.</p>';
            }
        }
    }
    
    // Admin page
    if (adminProductsContainer) {
        const products = await fetchProducts();
        renderAdminProducts(products);
    }
});