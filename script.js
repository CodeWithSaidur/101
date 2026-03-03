document.addEventListener('DOMContentLoaded', () => {
    // Elements - Search Section
    const searchSection = document.getElementById('partner-search-section');
    const searchInput = document.getElementById('partner-phone-search');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const sendRequestBtn = document.getElementById('send-request-btn');
    const requestStatus = document.getElementById('request-sent-status');
    const mainLogoutBtn = document.getElementById('main-logout-btn');

    // Elements - Chat Section
    const chatArea = document.getElementById('main-chat-area');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages-container');
    const chatLogoutBtn = document.getElementById('chat-logout-btn');
    const activeAvatar = document.getElementById('active-avatar');

    // --- Search Logic ---

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (!query) return;

        // Simulate searching
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchBtn.disabled = true;

        setTimeout(() => {
            // Mock finding a user
            // In a real app, logic would check if user exists and is NOT connected
            searchResults.classList.remove('hidden');
            searchBtn.innerHTML = 'Find';
            searchBtn.disabled = false;
        }, 1200);
    });

    sendRequestBtn.addEventListener('click', () => {
        searchResults.classList.add('hidden');
        requestStatus.classList.remove('hidden');

        // Mock "Partner Accepted" after 3 seconds
        setTimeout(() => {
            connectToPartner();
        }, 3000);
    });

    function connectToPartner() {
        searchSection.classList.add('hidden');
        chatArea.classList.remove('hidden');

        // Final scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // --- Chat Logic ---

    const addMessage = (text, type = 'sent') => {
        if (!text.trim()) return;

        const messageGroup = document.createElement('div');
        messageGroup.className = `message-group ${type}`;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (type === 'received') {
            const avatarWrapper = document.createElement('div');
            avatarWrapper.className = 'avatar-wrapper';
            avatarWrapper.innerHTML = `<img src="${activeAvatar.src}" alt="Avatar" class="avatar-sm">`;
            messageGroup.appendChild(avatarWrapper);
        }

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `
            <div class="bubble">${text}</div>
            <span class="timestamp">${timeString}</span>
        `;

        messageGroup.appendChild(messageContent);
        messagesContainer.appendChild(messageGroup);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        if (type === 'sent') messageInput.value = '';
    };

    sendBtn.addEventListener('click', () => {
        addMessage(messageInput.value, 'sent');
        setTimeout(() => {
            addMessage("I'm so glad we're connected! ❤️", 'received');
        }, 1500);
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });

    // --- Logout Logic ---

    const logout = () => {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'login.html';
        }
    };

    if (mainLogoutBtn) mainLogoutBtn.addEventListener('click', logout);
    if (chatLogoutBtn) chatLogoutBtn.addEventListener('click', logout);
});
