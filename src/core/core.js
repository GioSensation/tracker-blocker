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

export {parseUrl};
