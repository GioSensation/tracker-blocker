// The format is documented here: https://developer.chrome.com/extensions/match_patterns
const trackerArray = [
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

// We also export a set to have a constant time access using .has()
// We still export the original array to use it straight in the filter without recreating it from the set
const trackerSet = new Set(trackerArray);

export {trackerArray, trackerSet};
