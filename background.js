let pageLoadTime = null;

function measurePageLoadTime() {
  if (window.performance) {
    const timing = window.performance.timing;
    if (timing.navigationStart > 0 && timing.loadEventEnd > 0) {
      pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(pageLoadTime);
    } else {
      // Performance timing data is not available
      pageLoadTime = null;
    }
  } else {
    // The browser doesn't support the window.performance API
    pageLoadTime = null;
  }
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'getPageLoadTime') {
    updateBadgeText(); // Update badge text when requested
    sendResponse(pageLoadTime);
  }
});

// Call the updateBadgeText function initially and periodically
