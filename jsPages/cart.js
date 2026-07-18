let cart = [];//מערך של מוצרים בסל:
function loadCart() {//שמירת הסל ב-localStorage:
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() { //מעדכן את כמות המוצרים
    const cartCountSpan = document.querySelector('.cart-count');
    let totalItems = 0;
    for (let i = 0; i < cart.length; i++) {
        totalItems += Number(cart[i].quantity) || 0;
    }
    if (cartCountSpan) {
        cartCountSpan.textContent = totalItems;
    }
}
function displayCartItems() {//עדכון המחיר הכולל בזמן אמת:
    const cartItemsList = document.querySelector('#cartItemsList');
    const cartTotalPriceSpan = document.querySelector('#cartTotalPrice');
    if (!cartItemsList || !cartTotalPriceSpan) {
        console.error("שגיאה: אלמנטים 'cartItemsList' או 'cartTotalPriceSpan' לא נמצאו ב-DOM.");
        return;
    }
    cartItemsList.innerHTML = '';
    let totalPrice = 0;
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="empty-cart-message">העגלה ריקה.</li>';
    } else {
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];

            const itemPrice = Number(item.price);
            const itemQuantity = Number(item.quantity);

            const validPrice = isNaN(itemPrice) ? 0 : itemPrice;
            const validQuantity = isNaN(itemQuantity) ? 0 : itemQuantity;
            const itemTotalPrice = validPrice * validQuantity;
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price-per-unit">מחיר: ₪${validPrice.toLocaleString('he-IL')}</span>
                    <span class="item-total-price">סה"כ: ₪${itemTotalPrice.toLocaleString('he-IL')}</span>
                </div>
                <div class="cart-item-quantity-controls">
                    <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                    <span class="item-quantity">${validQuantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-from-cart" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button> `;
            cartItemsList.appendChild(li);
            totalPrice += itemTotalPrice;
        }
    }
    cartTotalPriceSpan.textContent = ` ₪${totalPrice.toLocaleString('he-IL')}`;
    updateCartCount();
}
function clearCart() {
    cart = [];
    saveCart();
    displayCartItems();
}

// --- הפעלת הקוד לאחר טעינת כל ה-HTML ---
document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    updateCartCount();

    const openCartButton = document.querySelector('.open-cart-button');
    const cartFixedPanel = document.querySelector('#cartFixedPanel');
    const clearCartBtn = document.querySelector('#clearCartBtn');
    const cartItemsList = document.querySelector('#cartItemsList');

    if (openCartButton && cartFixedPanel) {
        openCartButton.addEventListener('click', function () {
            cartFixedPanel.classList.toggle('open');
            if (cartFixedPanel.classList.contains('open')) {
                displayCartItems();
            }
        });
    } else {
        console.error("שגיאה: אלמנטים 'openCartButton' או 'cartFixedPanel' לא נמצאו ב-DOM. כפתור פתיחת הסל לא יפעל.");
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    } else {
        console.error("שגיאה: אלמנט 'clearCartBtn' לא נמצא ב-DOM. כפתור ניקוי העגלה לא יפעל.");
    }

    document.body.addEventListener('click', function (event) {//לחיצה על "הוסף לסל" תעדכן את הסל:
        const addButton = event.target.closest('.add-to-cart');
        if (!addButton) return;

        if (!addButton.dataset.id || !addButton.dataset.name || !addButton.dataset.price || !addButton.dataset.image) {
            console.error("שגיאה: חסרים data attributes בכפתור 'הוסף לעגלה'.", addButton);
            return;
        }

        const product = {
            id: addButton.dataset.id,
            name: addButton.dataset.name,
            price: parseFloat(addButton.dataset.price),
            image: addButton.dataset.image
        };

        let found = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                cart[i].quantity++;
                found = true;
                break;
            }
        }

        if (!found) {
            product.quantity = 1;
            cart.push(product);
        }

        saveCart();
        updateCartCount();
        if (cartFixedPanel && cartFixedPanel.classList.contains('open')) {
            displayCartItems();
        }
    }); //סוף הפונקציה

    if (cartItemsList) {
        cartItemsList.addEventListener('click', function (event) {//לחיצה על "+" או "-" תעלה או תוריד את הכמות בסל:
            const target = event.target;
            const productId = target.closest('[data-id]') ? target.closest('[data-id]').dataset.id : null;
            if (!productId) return;

            if (target.classList.contains('increase-quantity')) {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].id === productId) {
                        cart[i].quantity++;
                        break;
                    }
                }
            }
            else if (target.classList.contains('decrease-quantity')) {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].id === productId) {
                        cart[i].quantity--;
                        if (cart[i].quantity <= 0) {
                            cart.splice(i, 1);
                        }
                        break;
                    }
                }
            }
            else if (target.closest('.remove-from-cart')) {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].id === productId) {
                        cart.splice(i, 1);
                        break;
                    }
                }
            }

            saveCart();
            displayCartItems();
            updateCartCount();
        });
    } else {
        console.error("שגיאה: אלמנט 'cartItemsList' לא נמצא ב-DOM עבור מאזין האירועים לפריטי העגלה.");
    }
});