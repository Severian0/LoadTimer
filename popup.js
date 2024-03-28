function updateBadgeText(loaders) {
  chrome.action.setBadgeText({ text: (loaders/1000).toFixed(2).toString() });
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const tab = tabs[0];
  const start = performance.now();

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: () => {
        return performance.getEntriesByType('navigation')[0].duration;
      },
    },
    (result) => {
      const end = result[0].result;
      const loadTime = end-start;
      console.log(loadTime.toString());
      document.getElementById("timer").textContent = `Page load time: ${loadTime.toFixed(2)} ms`;
      updateBadgeText(loadTime);
    }
  );
});

