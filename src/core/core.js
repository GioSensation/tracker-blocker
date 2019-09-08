import {trackerSet} from '../static/data';
import tldjs from 'tldjs';
import blockedStore from './BlockedStore.js';

/**
 * Given a url, returns a string formatted as our tracker array
 * @param url
 * @returns {string}
 * @ref https://developer.chrome.com/extensions/match_patterns
 */
const parseUrl = url => {
  // we extract the hostname to increase tldjs' performance: https://github.com/oncletom/tld.js#performances
  const {hostname} = new URL(url);
  return `*://*.${tldjs.getDomain(hostname)}/*`;
};

/**
 * Callback for onBeforeNavigate to cancel requests to tracker urls
 * @param {string} details.initiator - the origin url
 * @param {number} details.tabId - the tabId where the request was initiated
 * @returns {{}|{cancel: boolean}}
 */
const filterCallback = ({initiator, tabId}) => {
  // Do not block if we are on a tracker's own page, such as Google or Facebook
  if (initiator && !trackerSet.has(parseUrl(initiator))) {
    blockedStore.increase(tabId);
    chrome.tabs.get(tabId, ({active}) => {
      if (active) chrome.browserAction.setBadgeText({text: blockedStore.getString(tabId)});
    });
    return {cancel: true};
  }
  return {};
};

export {filterCallback};
