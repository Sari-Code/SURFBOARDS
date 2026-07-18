document.addEventListener('DOMContentLoaded', () => {
    // 1. איתור אלמנטים וקבועים
    const subtotalPriceSpan = document.querySelector('#subtotalPrice');
    const finalTotalPriceSpan = document.querySelector('#finalTotalPrice');
    const SHIPPING_COST = 25; 

    let cart = []; // מערך לאחסון פריטי העגלה

    // 2. פונקציה לטעינת העגלה
    const loadCart = () => {
        try {
            const storedCart = localStorage.getItem('cart');
            cart = storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            console.error("שגיאה בטעינת העגלה מ-localStorage:", e);
            cart = []; // במקרה של שגיאה, אתחל עגלה ריקה
        }
    };
    // פונקציה לחישוב והצגת הסכומים
    const calculateAndDisplayPrices = () => {
        // שימוש ב-reduce לחישוב סכום הביניים בצורה יעילה וקריאה
        const subtotal = cart.reduce((total, item) => {
            const price = Number(item.price) || 0; 
            const quantity = Number(item.quantity) || 0; 
            return total + (price * quantity);
        }, 0); // מתחיל את הסכום הכולל מ-0
        const finalTotal = subtotal + SHIPPING_COST;
        // הצגת הסכומים באלמנטים המתאימים
        subtotalPriceSpan.textContent = `₪${subtotal.toLocaleString('he-IL')}`;
        finalTotalPriceSpan.textContent = `₪${finalTotal.toLocaleString('he-IL')}`;
    };

    // הרצת הפונקציות בטעינת הדף
    loadCart();
    calculateAndDisplayPrices();
});