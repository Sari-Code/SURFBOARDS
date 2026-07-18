let body = document.querySelector('body');
let moon = document.querySelector('#moon');
let isDarkMode = false;

const nav = document.querySelector('nav');

moon.addEventListener('click', () => {
    if (isDarkMode) {
        body.style.background = 'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url("תמונת רקע של ים2.jpg")';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center center';
        body.style.backgroundAttachment = 'fixed';
        body.style.color = '#333333';
        moon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars" viewBox="0 0 16 16">
  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
</svg>`;
        isDarkMode = false;
        body.classList.remove('dark-mode');
    } else {
        body.style.background = '#111111';
        body.style.color = 'white';
        moon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`;
        isDarkMode = true;
        body.classList.add('dark-mode');
    }
});

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const currentYearSpan = document.querySelector('#current-year-simple');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    setTimeout(shrinkImage, 1000);
});

function shrinkImage() {
    const image = document.querySelector('#myImage');
    if (image) {
        image.classList.add('shrink-after-delay');
    }
}

function expandImage() {
    const image = document.querySelector('#myImage');
    if (image) {
        image.classList.remove('shrink-after-delay');
        image.classList.remove('small-image');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const openChatBtn = document.querySelector('#openChatBtn');
    const chatModal = document.querySelector('#chatModal');
    const closeChatBtn = chatModal.querySelector('.close-button');
    const chatMessages = document.querySelector('#chatMessages');
    const chatInput = document.querySelector('#chatInput');
    const sendChatBtn = document.querySelector('#sendChatBtn');
    const chatInputArea = document.querySelector('#chatInputArea');

    let userName = '';
    let currentStep = 0;
    const typingIndicatorHtml = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        chatMessages.insertAdjacentHTML('beforeend', typingIndicatorHtml);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function openChat() {
        chatModal.classList.add('active');
        chatMessages.innerHTML = '';
        currentStep = 0;
        userName = '';
        chatInput.style.display = 'flex';
        sendChatBtn.style.display = 'flex';
        handleChat();
        chatInput.focus();
    }

    function closeChat() {
        chatModal.classList.remove('active');
    }

    async function handleChat() {
        const userInput = chatInput.value.trim();
        chatInput.value = '';

        if (userInput && currentStep !== 0) {
            addMessage(userInput, 'user');
        }

        chatInput.disabled = true;
        sendChatBtn.disabled = true;

        showTypingIndicator();
        await new Promise(resolve => setTimeout(resolve, 2000));
        hideTypingIndicator();

        if (currentStep === 0) {
            addMessage('שלום! קוראים לי רובי הבוט. נא הכנס את שמך:', 'bot');
            currentStep = 1;
            chatInput.placeholder = 'השם שלך...';
        } else if (currentStep === 1) {
            if (!userInput) {
                addMessage('לא קיבלתי שם. אנא הכנס את שמך:', 'bot');
            } else {
                userName = userInput;
                addMessage(`שלום ל-${userName}! במה אוכל לעזור?`, 'bot');
                currentStep = 2;
                chatInput.placeholder = 'איך אפשר לעזור לך?';
            }
        } else if (currentStep === 2) {
            if (!userInput) {
                addMessage('לא קיבלתי בקשה. אנא פרט במה אוכל לעזור:', 'bot');
            } else {
                addMessage('אנו מעבירים את פנייתך. מיד נעזור!', 'bot');
                currentStep = 3;
                chatInput.style.display = 'none';
                sendChatBtn.style.display = 'none';
            }
        } else if (currentStep === 3) {
            addMessage('השיחה הסתיימה. תודה!', 'bot');
        }

        chatInput.disabled = false;
        sendChatBtn.disabled = false;
        if (currentStep !== 3) {
            chatInput.focus();
        }
    }

    openChatBtn.addEventListener('click', openChat);
    closeChatBtn.addEventListener('click', closeChat);

    sendChatBtn.addEventListener('click', handleChat);

    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !sendChatBtn.disabled) {
            handleChat();
        }
    });

    openChat();
});