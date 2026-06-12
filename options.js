document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['userId', 'apiKey'], (items) => {
        if (items.userId) document.getElementById('userId').value = items.userId;
        if (items.apiKey) document.getElementById('apiKey').value = items.apiKey;
    });
});

document.getElementById('save').addEventListener('click', () => {
    const userId = document.getElementById('userId').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();

    chrome.storage.local.set({ userId, apiKey }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Settings saved successfully!';
        setTimeout(() => { status.textContent = ''; }, 3000);
    });
});