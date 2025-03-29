(function () {
    const products = {
        'bird': { 
            name: 'Bird Photo', 
            description: 'Beautiful bird photography', 
            price: 50,
            img: 'img/bird.png'
        },
        'one_photo': { 
            name: 'Single Photo', 
            description: 'Minimalist photography', 
            price: 40,
            img: 'img/one_photo.png'
        },
        'three_photo': { 
            name: 'Three Photo', 
            description: 'Beautiful bird photography', 
            price: 50,
            img: 'img/three_photo.png'
        },
        'two_photo': { 
            name: 'Two Photo', 
            description: 'Minimalist photography', 
            price: 40,
            img: 'img/two_photo.png'
        },
        'fourth_photo': { 
            name: 'Fourth Photo', 
            description: 'Beautiful bird photography', 
            price: 50,
            img: 'img/fourth_photo.png'
        },
        'five_photo': { 
            name: 'Five Photo', 
            description: 'Minimalist photography', 
            price: 40,
            img: 'img/five_photo.png'
        },
        'six_photo': { 
            name: 'Six Photo', 
            description: 'Minimalist photography', 
            price: 40,
            img: 'img/six_photo.png'
        },
        'seven_photo': { 
            name: 'Seven Photo', 
            description: 'Beautiful bird photography', 
            price: 50,
            img: 'img/seven_photo.png'
        }
    };

    let cart = [];
    window.openPopup = function(productKey) {
        if (!products[productKey]) {
            const popup = document.getElementById(productKey);
            if (!popup) {
                console.error('Попап не найден:', productKey);
                return;
            }
            popup.style.display = 'block';
            return;
        }
    
        const product = products[productKey];
        const cardPopup = document.getElementById('card');
        if (!cardPopup) {
            console.error('Попап card не найден в DOM');
            return;
        }
    
        const imgElement = document.getElementById('image-card');
        const nameElement = document.getElementById('card-name');
        const descElement = document.getElementById('card-description');
        const priceElement = document.getElementById('price');
        const buyButton = document.getElementById('buy');
    
        imgElement.src = product.img;
        imgElement.alt = product.name;
        nameElement.textContent = product.name;
        descElement.textContent = product.description;
        priceElement.textContent = `$${product.price}`;
        
        buyButton.onclick = function(e) {
            e.preventDefault();
            addToCart(productKey);
            closePopup('card');
        };
    
        cardPopup.style.display = 'block';
    };
    
    function openProductPopup(productKey) {
        const product = products[productKey];
        if (!product) {
            console.error('Продукта не найдено:', productKey);
            return;
        }

        const cardPopup = document.getElementById('card');
        const imgElement = document.getElementById('image-card');
        const nameElement = document.getElementById('card-name');
        const descElement = document.getElementById('card-description');
        const priceElement = document.getElementById('price');
        const buyButton = document.getElementById('buy');

        imgElement.src = product.img;
        imgElement.alt = product.name;
        nameElement.textContent = product.name;
        descElement.textContent = product.description;
        priceElement.textContent = `$${product.price}`;

        buyButton.onclick = function (e) {
            e.preventDefault();
            addToCart(productKey);
            closeProductPopup();
        };

        cardPopup.style.display = 'block';
    }

    function closeProductPopup() {
        const popup = document.getElementById('card');
        if (popup) {
            popup.style.display = 'none';
        }
    }

    // Добавление товара в корзину
    function addToCart(productKey) {
        const product = products[productKey];
        if (!product) return;

        let existingItem = cart.find(item => item.id === productKey);
        if (existingItem) {
            existingItem.quantity += 1;
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

    function toggleCart() {
        let cartPopup = document.getElementById("cart-popup");
        cartPopup.classList.toggle("open"); 
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Твой кошик пустоват');
            return;
        }
    
        let orderText = cart.map(item => `${item.name} x${item.quantity} - $${item.price * item.quantity}`).join("\n");
        let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        sendOrderToTelegram(orderText, totalPrice);
    
        alert(`Заказ оформлен! Всего: $${totalPrice}`);
    
        cart = [];
        updateCart();
        toggleCart();
    }
    
    window.openProductPopup = openProductPopup;
    window.closeProductPopup = closeProductPopup;
    window.toggleCart = toggleCart;
    window.checkout = checkout;
    window.changeQuantity = changeQuantity;
    window.removeFromCart = removeFromCart;
})();
