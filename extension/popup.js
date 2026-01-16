const checkbox = document.getElementById('toggle');

// Load current state
chrome.storage.local.get(['enabled'], ({enabled}) => {
    checkbox.checked = enabled !== false; // default: on
});

// Update state when toggled
checkbox.addEventListener('change', () => {
    chrome.storage.local.set({enabled: checkbox.checked});
});
