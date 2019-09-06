const trackerList = [
  '*://*.doubleclick.net/*',
  '*://*.google-analytics.com/*',
  '*://*.gstatic.com/*',
  '*://*.google.com/*',
  '*://*.facebook.com/*',
  '*://*.googlesyndication.com/*',
  '*://*.facebook.net/*',
  '*://*.googleadservices.com/*',
  '*://*.fonts.googleapis.com/*',
  '*://*.scorecardresearch.com/*',
  '*://*.adnxs.com/*',
  '*://*.twitter.com/*',
  '*://*.fbcdn.net/*',
  '*://*.ajax.googleapis.com/*',
  '*://*.yahoo.com/*',
  '*://*.rubiconproject.com/*',
  '*://*.openx.net/*',
  '*://*.googletagservices.com/*',
  '*://*.mathtag.com/*',
  '*://*.advertising.com/*',
];

chrome.webRequest.onBeforeRequest.addListener(
  (details) => ({cancel: true}),
  {urls: trackerList},
  ['blocking']
);

