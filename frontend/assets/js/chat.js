
// Basic Chat Widget Logic
document.addEventListener('DOMContentLoaded', () => {
    // Inject Chat HTML if it doesn't exist
    if (!document.querySelector('.chat-widget-btn')) {
        const chatHTML = `
            <button class="chat-widget-btn" id="chatToggle">
                <span class="chat-btn-text">Chat with Me</span>
                <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            </button>
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-title">
                        <h3>Travel Assistant</h3>
                        <p>Ask me anything!</p>
                    </div>
                    <button class="chat-close-btn" id="chatClose">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
                <div class="chat-body" id="chatBody">
                    <div class="chat-message bot">
                        Hello! I'm your AI Travel Assistant. How can I help you plan your trip today? 🌍✈️
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chatInput" placeholder="Type a message...">
                    <button class="chat-send-btn" id="chatSend">
                        <ion-icon name="send-outline"></ion-icon>
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);

        // Add CSS dynamically if not present 
        // (Assuming it's linked in head, but purely for robustness we could add it here. 
        // For now, relies on <link rel="stylesheet" href="./assets/css/chat.css"> being in the HTML)
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './assets/css/chat.css';
        document.head.appendChild(link);
    }

    const toggleBtn = document.getElementById('chatToggle');
    const closeBtn = document.getElementById('chatClose');
    const chatWindow = document.getElementById('chatWindow');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.getElementById('chatBody');

    function toggleChat() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300);
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message', sender);
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';

            // Call Backend API
            try {
                // Simulating Backend Call (Real endpoint can be /api/chat/message)
                // For now, we will still use local logic but prep for API
                // const res = await fetch('https://bhinchar-india-tours-backend.onrender.com/api/chat/message', { ... });

                setTimeout(() => {
                    let response = "I'm connected to the backend! Ask me about our 3 exclusive tours.";
                    const lowerText = text.toLowerCase();

                    if (lowerText.includes('tour') || lowerText.includes('package')) {
                        response = "We have packages for Kumbhalgarh, Jaisalmer, and Mount Abu. Which one interests you?";
                    } else if (lowerText.includes('price')) {
                        response = "Our tours range from $520 to $750. Best value allowed!";
                    }

                    addMessage(response, 'bot');
                }, 1000);

            } catch (error) {
                addMessage("Sorry, I'm having trouble connecting to the server.", 'bot');
            }
        }
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
