// Данные о товарах
const products = {
    'bird': { name: 'Bird Photo', price: 50 },
    'one_photo': { name: 'Single Photo', price: 40 },
    'three_photo': { name: 'Three Photos', price: 100 },
    'two_photo': { name: 'Two Photos', price: 75 },
    'fourth_photo': { name: 'Fourth Photo', price: 60 },
    'five_photo': { name: 'Fifth Photo', price: 80 },
    'six_photo': { name: 'Sixth Photo', price: 55 },
    'seven_photo': { name: 'Seventh Photo', price: 65 }
};

let cart = [];

// Показываем карточку товара
function openPopup(productKey) {
    const product = products[productKey];
    if (!product) return;
    
    document.getElementById('image-card').src = `img/${productKey}.png`;
    document.getElementById('card-name').textContent = product.name;
    document.getElementById('price').textContent = `$${product.price}`;
    document.getElementById('buy').textContent = 'Add to Cart';
    document.getElementById('buy').onclick = () => {
        addToCart(productKey);
        closePopup('card');
    };
    
    document.getElementById('card').style.display = 'block';
}

// Закрываем попап
function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}

// Добавляем товар в корзину
function addToCart(productKey) {
    const product = products[productKey];
    if (!product) return;
    
    // Проверяем, есть ли товар уже в корзине
    const itemInCart = cart.find(item => item.id === productKey);
    
    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        cart.push({
            id: productKey,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCart();
}

// Обновляем отображение корзины
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Очищаем корзину перед обновлением
    cartItems.innerHTML = '';
    
    let totalPrice = 0;
    let totalItems = 0;
    
    // Добавляем каждый товар в корзину
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price} × ${item.quantity}</p>
            </div>
            <div>
                <button onclick="changeQty('${item.id}', -1)">-</button>
                <button onclick="changeQty('${item.id}', 1)">+</button>
                <button onclick="removeItem('${item.id}')">×</button>
            </div>
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    // Обновляем счетчик и общую сумму
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
}

// Изменяем количество товара
function changeQty(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    // Удаляем товар, если количество ≤ 0
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

// Удаляем товар из корзины
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Показываем/скрываем корзину
function toggleCart() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = cartPopup.style.display === 'none' ? 'block' : 'none';
}

// Оформляем заказ
function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    alert(`Заказ оформлен! Сумма: $${document.getElementById('cart-total').textContent}`);
    cart = [];
    updateCart();
    toggleCart();
}