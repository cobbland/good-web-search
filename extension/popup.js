const web = document.getElementById('web');
const date = document.getElementById('date');
const ai = document.getElementById('ai');

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
