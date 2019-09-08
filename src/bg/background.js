import {parseUrl} from '../utils/utils';
import {trackerArray, trackerSet} from '../static/data';
import blockedStore from '../core/BlockedStore';

// Block requests that match our trackerArray
chrome.webRequest.onBeforeRequest.addListener(
  ({initiator, tabId}) => {
    // Do not block if we are on a tracker's own page, such as Google or Facebook
    if (initiator && !trackerSet.has(parseUrl(initiator))) {
      blockedStore.increase(tabId);
      chrome.tabs.get(tabId, ({active}) => active && updateBadge(tabId));
      return {cancel: true};
    }
    return {};
  },
  {urls: trackerArray},
  ['blocking']
);

// Reset counter when navigating to a new page
chrome.webNavigation.onBeforeNavigate.addListener(({parentFrameId, tabId}) => {
  // Reset only if top frame (iFrame navigation does not reset the counter)
  if (parentFrameId < 0) {
    blockedStore.reset(tabId);
    updateBadge(tabId);
  }
});

// Show the appropriate badge counter when switching to a new tab
chrome.tabs.onActivated.addListener(({tabId}) => updateBadge(tabId));

const updateBadge = tabId => {
  chrome.browserAction.setBadgeText({text: blockedStore.getString(tabId)});
};
