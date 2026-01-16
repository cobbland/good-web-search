chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['webEnabled', 'dateEnabled', 'aiEnabled'], (result) => {
    chrome.storage.local.set({
      webEnabled: result.webEnabled ?? true,
      dateEnabled: result.dateEnabled ?? true,
      aiEnabled: result.aiEnabled ?? true
    });
  });
});