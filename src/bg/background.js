import {filterCallback} from '../core/core';
import {trackerArray} from '../static/data';

chrome.webRequest.onBeforeRequest.addListener(
  filterCallback,
  {urls: trackerArray},
  ['blocking']
);

