const web = document.getElementById('web');
const date = document.getElementById('date');
const ai = document.getElementById('ai');

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (!tab?.url) return;

  const url = new URL(tab.url);

  if (!url.hostname.includes('google')) {
    web.disabled = true;
  }

  if (!url.hostname.includes('google') 
    && !url.hostname.includes('ecosia.org') 
    && !url.hostname.includes('bing')) {
    date.disabled = true;
  }

  if (!url.hostname.includes('www.google.com') 
    && !url.hostname.includes('ecosia.org') 
    && !url.hostname.includes('bing')
    && !url.hostname.includes('startpage')
    && !url.hostname.includes('duckduckgo')
    && !url.hostname.includes('brave')
    ) {
    ai.disabled = true;
  }
});

chrome.storage.local.get(
  ['webEnabled', 'dateEnabled', 'aiEnabled'],
  ({ webEnabled, dateEnabled, aiEnabled }) => {
    web.checked  = webEnabled !== false;
    date.checked = dateEnabled !== false;
    ai.checked   = aiEnabled !== false;
  }
);

// Update state when toggled
[web, date, ai].forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    chrome.storage.local.set({
      webEnabled: web.checked,
      dateEnabled: date.checked,
      aiEnabled: ai.checked
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
      const location = link.getAttribute('href');
      chrome.tabs.update({active: true, url: location});
    });
  });
});
