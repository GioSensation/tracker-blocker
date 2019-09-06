import {trackerArray, trackerSet} from '../static/data';

chrome.webRequest.onBeforeRequest.addListener(
  (details) => ({cancel: true}),
  {urls: trackerArray},
  ['blocking']
);

