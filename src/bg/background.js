import {updateBadge} from '../core/badge';
import {parseUrl} from '../utils/utils';
import {trackerArray, trackerSet} from '../static/data';
import blockedStore from '../core/BlockedStore';

// Block requests that match our trackerArray
chrome.webRequest.onBeforeRequest.addListener(
  ({initiator, tabId}) => {
    // Do not block if we are on a tracker's own page, such as Google or Facebook
    if (initiator && !trackerSet.has(parseUrl(initiator))) {
      blockedStore.increase(tabId);
      chrome.tabs.get(tabId, ({status}) => {
        // We only update the badge here if the tab is loaded, otherwise we wait for the tab to finish loading
        if (status === 'complete') updateBadge(tabId);
      });
      return {cancel: true};
    }
    return {};
  },
  {urls: trackerArray},
  ['blocking']
);

// Update the badge when the page has finished loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    updateBadge(tabId);
  }
});

// Reset counter when navigating to a new page
chrome.webNavigation.onBeforeNavigate.addListener(({parentFrameId, tabId}) => {
  // Reset only if top frame (iFrame navigation does not reset the counter)
  if (parentFrameId < 0) {
    blockedStore.reset(tabId);
  }
});

// Remove tab data from our store when the tab is closed to avoid memory leaks
chrome.tabs.onRemoved.addListener(tabId => blockedStore.remove(tabId));

// Show the appropriate badge counter when switching to a new tab
chrome.tabs.onActivated.addListener(({tabId}) => updateBadge(tabId));
