import tldjs from 'tldjs';
import {COLOR_MAP} from '../static/constants';

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
 * Receives a count string and returns an appropriate color. Note that type coercion works for us here
 * @param {string} count
 * @returns string
 */
const getBadgeColor = count => {
  let color = 'green';
  if (count > 1) color = 'orange';
  if (count > 3) color = 'red';
  return COLOR_MAP[color];
};

export {
  parseUrl,
  getBadgeColor,
};
