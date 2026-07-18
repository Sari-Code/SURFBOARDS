document.addEventListener('DOMContentLoaded', () => {//היא ממתינה שכל מבנה ה־HTML בדף ייטען
    const elements = {
        adminLoginBtn: document.querySelector('#adminLoginBtn'),
        adminPortalBtn: document.querySelector('#adminPortalBtn'),
        adminModal: document.querySelector('#adminModal'),
        closeButton: document.querySelector('#adminModal .close-button'),
        loginForm: document.querySelector('#loginForm'),
        addProductFormSection: document.querySelector('#addProductForm'),
        adminLoginSection: document.querySelector('#adminLogin'),
        newProductForm: document.querySelector('#newProductForm'),
        loginMessage: document.querySelector('#loginMessage'),
        productMessage: document.querySelector('#productMessage'),
        username: document.querySelector('#username'),
        password: document.querySelector('#password'),
        newProductName: document.querySelector('#newProductName'),
        newProductDescription: document.querySelector('#newProductDescription'),
        newProductPrice: document.querySelector('#newProductPrice'),
        newProductCategory: document.querySelector('#newProductCategory'),
        newProductImage: document.querySelector('#newProductImage'),
        categorySelect: document.querySelector('#categorySelect')
    };
     // הגדרת פרטי ההתחברות למנהל
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: '1234'
    };

    const displayMessage = (element, message, type) => {
        if (element) {
            element.textContent = message;
            element.className = `message ${type}`;
        }
    };

    const resetModalState = () => {//הקשת שם וסיסמה (טופס התחברות):-מאפס א הטופס
        elements.adminLoginSection?.classList.remove('hidden');
        elements.addProductFormSection?.classList.add('hidden');
        displayMessage(elements.loginMessage, '', '');
        displayMessage(elements.productMessage, '', '');
        if (elements.username) elements.username.value = '';
        if (elements.password) elements.password.value = '';
        elements.newProductForm?.reset();
    };

    const openAdminModal = () => {//פתיחת חלון (מודאל):
        if (elements.adminModal) {
            elements.adminModal.style.display = 'flex';
            resetModalState();
        }
    };

    const closeAdminModal = () => {
        if (elements.adminModal) {
            elements.adminModal.style.display = 'none';
        }
    };

    const adminButtons = [elements.adminLoginBtn, elements.adminPortalBtn];//"לחצן כניסת מנהל שיפתח חלון שבו יש להקיש שם וסיסמה"
    adminButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', openAdminModal);
        }
    });

    elements.closeButton?.addEventListener('click', closeAdminModal);

    window.addEventListener('click', event => {
        if (event.target === elements.adminModal) {
            closeAdminModal();
        }
    });

    elements.loginForm?.addEventListener('submit', event => {//אם הסיסמה נכונה יש לתת למנהל אפשרות להוסיף מוצר חדש לחנות. יש ליצור עבורו טופס עם שדות המתאימים למוצר חדש."
        event.preventDefault();

        const { username, password, loginMessage, adminLoginSection, addProductFormSection } = elements;

        if (username?.value === ADMIN_CREDENTIALS.username && password?.value === ADMIN_CREDENTIALS.password) {
            displayMessage(loginMessage, 'התחברת בהצלחה! ✅', 'success');
            setTimeout(() => {
                adminLoginSection?.classList.add('hidden');
                addProductFormSection?.classList.remove('hidden');
            }, 1000);
        } else {
            displayMessage(loginMessage, 'שם משתמש או סיסמה שגויים. ❌', 'error');
        }
    });

    elements.newProductForm?.addEventListener('submit', event => {
        event.preventDefault();//בלחיצה על אישור יתווסף המוצר לרשימת המוצרים (ע"י ה-localStorage)."

        const { newProductName, newProductDescription, newProductPrice, newProductCategory, newProductImage, productMessage, newProductForm } = elements;

        if (!newProductName?.value || !newProductDescription?.value || !newProductPrice?.value || !newProductCategory?.value || !newProductImage?.value) {
            displayMessage(productMessage, 'אנא מלא את כל שדות המוצר. ⚠️', 'error');
            return;
        }

        const newProduct = {
            name: newProductName.value,
            description: newProductDescription.value,
            price: parseFloat(newProductPrice.value),
            category: newProductCategory.value,
            image: newProductImage.value
        };

        if (typeof surfboards !== 'undefined') {
            surfboards.push(newProduct);
            localStorage.setItem('surfboards', JSON.stringify(surfboards));

            if (typeof loadSurfboards === 'function') {
                if (elements.categorySelect) {
                    elements.categorySelect.value = 'all';
                }
                loadSurfboards('all');
            } else {
                console.warn("פונקציית loadSurfboards אינה זמינה.");
            }
        } else {
            console.error("מערך 'surfboards' אינו מוגדר.");
        }

        displayMessage(productMessage, `המוצר "${newProduct.name}" נוסף בהצלחה! ✅`, 'success');
        newProductForm?.reset();

        setTimeout(closeAdminModal, 2000);
        console.log("מערך המוצרים המעודכן:", surfboards);
    });
});