import blockedStore from './BlockedStore';

const colorMap = {
  green: '#6cb74c',
  red: '#c73739',
  orange: '#db702e'
};

/**
 * Receives a count string and returns an appropriate color. Note that type coercion works for us here
 * @param {string} count
 * @returns string
 */
const generateBadgeOptions = count => {
  let color = 'green';
  if (count > 1) color = 'orange';
  if (count > 3) color = 'red';
  return colorMap[color];
};

/**
 * Updates badge text and color only for the selected tab
 * @param {number} tabId
 */
const updateBadge = tabId => {
  const count = blockedStore.getString(tabId);
  chrome.browserAction.setBadgeText({text: count, tabId});
  chrome.browserAction.setBadgeBackgroundColor({color: generateBadgeOptions(count), tabId});
};

export {updateBadge};
