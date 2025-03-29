(function () {
    // Данные о товарах
    const products = {
        'bird': { name: 'Bird Photo', price: 50, img: 'img/bird.png' },
        'one_photo': { name: 'Single Photo', price: 40, img: 'img/one_photo.png' },
        'three_photo': { name: 'Three Photo', price: 50, img: 'img/three_photo.png' },
        'two_photo': { name: 'Two Photo', price: 40, img: 'img/two_photo.png' },
        'fourth_photo': { name: 'Fourth Photo', price: 50, img: 'img/fourth_photo.png' },
        'five_photo': { name: 'Five Photo', price: 40, img: 'img/five_photo.png' },
        'six_photo': { name: 'Six Photo', price: 40, img: 'img/six_photo.png' },
        'seven_photo': { name: 'Seven Photo', price: 50, img: 'img/seven_photo.png' }
    };

    let cart = [];

    // Добавление товара в корзину
    function addToCart(productKey) {
        const product = products[productKey];
        if (!product) return;

        let existingItem = cart.find(item => item.id === productKey);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productKey, name: product.name, price: product.price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        const cartItemsElement = document.getElementById('cart-items');
        const cartCountElement = document.getElementById('cart-count');
        const cartTotalElement = document.getElementById('cart-total');

        if (!cartItemsElement || !cartCountElement || !cartTotalElement) return;

        cartItemsElement.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            totalItems += item.quantity;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity('${item.id}', -1)">-</button>
                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                    <button onclick="removeFromCart('${item.id}')">×</button>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);
        });

        cartCountElement.textContent = totalItems;
        cartTotalElement.textContent = total.toFixed(2);
    }

    function changeQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        alert(`Order placed! Total: $${document.getElementById('cart-total').textContent}`);
        cart = [];
        updateCart();
    }

    // Привязываем функции к window
    window.addToCart = addToCart;
    window.changeQuantity = changeQuantity;
    window.removeFromCart = removeFromCart;
    window.checkout = checkout;
})();
