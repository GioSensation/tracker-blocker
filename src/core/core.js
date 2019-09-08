import {trackerSet} from '../static/data';
import tldjs from 'tldjs';

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

const filterCallback = (details) => {
  // Do not block if we are on a tracker's own page, such as Google or Facebook
  // details.initiator is the origin of the request
  if (details.initiator && !trackerSet.has(parseUrl(details.initiator))) {
    return {cancel: true};
  }
  return {};
};

export {filterCallback};
