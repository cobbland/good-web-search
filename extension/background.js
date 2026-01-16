chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    webEnabled: true,
    dateEnabled: true,
    aiEnabled: true
  });
});