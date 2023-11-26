chrome.action.onClicked.addListener((tab) => {
  // Only send a message if there's an active tab
  if (!tab.id) return;

  chrome.tabs.sendMessage(tab.id, { action: "helpMeRead" }, (response) => {
    if (!response) return;
    console.log("HMR", response);
  });
});
