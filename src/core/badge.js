import {getBadgeColor, getBadgeTitle} from '../utils/utils';
import blockedStore from './BlockedStore';

/**
 * Updates badge text and color only for the selected tab
 * @param {number} tabId
 */
const updateBadge = tabId => {
  const count = blockedStore.getString(tabId);
  chrome.browserAction.setBadgeText({text: count, tabId});
  chrome.browserAction.setBadgeBackgroundColor({color: getBadgeColor(count), tabId});
  chrome.browserAction.setTitle({title: getBadgeTitle(count), tabId});
};

export {updateBadge};
