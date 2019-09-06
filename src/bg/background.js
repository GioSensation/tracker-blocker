import {trackerArray, trackerSet} from '../static/data';
import {getDomain} from 'tldjs';

/**
 * Given a url, returns a string formatted as our tracker array
 * @param url
 * @returns {string}
 * @ref https://developer.chrome.com/extensions/match_patterns
 */
const parseUrl = url => {
  // we extract the hostname to increase tldjs' performance: https://github.com/oncletom/tld.js#performances
  const {hostname} = new URL(url);
  return `*://*.${getDomain(hostname)}/*`;
};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // Do not block if we are on a tracker's own page, such as Google or Facebook
    // details.initiator is the origin of the request
    if (details.initiator && !trackerSet.has(parseUrl(details.initiator))) {
      return {cancel: true};
    }
    return {};
  },
  {urls: trackerArray},
  ['blocking']
);

