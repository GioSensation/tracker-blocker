# Tracker blocker for Chrome by Emanuele Feliziani

The tracker has the following features:

- Block trackers
- Set duckduckgo.com as the default search engine for the browser
- A badge on the extension icon counting the number of tracker requests that have been blocked

## Compile and run
This project uses [npm](https://www.npmjs.com) to manage dependencies and [rollup.js](https://rollupjs.org/guide/en/) to bundle the files together.

Install dependencies with:

    npm install

To generate the bundle, run:

    npm run build

While developing you can use the following command to update the bundle whenever you update a file.

    npm run dev

## Install the extension from source
To load the bundle in Chrome, you can go to `chrome://extensions/`, enable the developer mode by flipping the switch on the top right and select _Load Unpacked_. From the dialog, select the folder where `manifest.json` resides.

## What trackers are we blocking?
At this time, we are blocking only the trackers from the following origins:

    doubleclick.net
    google-analytics.com
    gstatic.com
    google.com
    facebook.com
    googlesyndication.com
    facebook.net
    googleadservices.com
    fonts.googleapis.com
    scorecardresearch.com
    adnxs.com
    twitter.com
    fbcdn.net
    yahoo.com
    rubiconproject.com
    openx.net
    googletagservices.com
    mathtag.com
    advertising.com 

The list has been compiled after reading [this paper](http://randomwalker.info/publications/OpenWPM_1_million_site_tracking_measurement.pdf). According to the paper, these cover the majority of sites and the majority of trackers.

Note: I have removed the origin `ajax.googleapis.com ` because many sites rely on it to load libraries such as jquery. A workaround must be implemented for this use case, but in the meantime these requests are not being blocked.

### How trackers are blocked
We pass the array of trackers to `chrome.webRequest.onBeforeRequest`, so that all other requests keep running just fine. We then check that the current request is:

1. being made by a proper tab (not a temporary tab used by Chrome to preload requests or similar)
2. not being made from one of the trackers' own page (ie. Facebook, Google) to avoid breaking such popular websites
3. not being a `main_frame` request, to allow redirects (ie. when clicking on an affiliate link that routes the request through a series of redirects, possibly including a tracker website). **This can be controversial.** The expected behaviour in this case should be discussed further.

## The badge counter
The extension also shows the number of tracker requests that have been made on the currently focused tab. Whenever we block a tracker request, we increase a counter in our store (it's a volatile store, not using the `chrome.storage` API because there is no need to persist this data at this time). When the tab has finished loading, we update the badge and assign it a color code:

    < 2 -> green
    < 4 -> orange
    4+  -> red

Pretty much arbitrary, I know.

Here is a summary of the main flow of the filter:

![Tracker blocker diagram](https://emanuelefeliziani.s3.amazonaws.com/tracker-blocker-diagram.png)

The badge has a `title` tooltip that shows a localized text when hovered.

If a tracker request is blocked after the tab has finished loading, the badge updates as expected.

Note: the badge keeps track of the number of requests blocked, not the amount of singular trackers blocked. Some websites retry to fetch resources if the first attempt failed (ie. on theguardian.com a resource from Facebook is fetched at least 6 times before logging `maxRetry reached`).

## Privacy and permissions
The extension does not not need to request the `tabs` permission because we don't access tabs sensitive data.

At the moment, though, it does require the `webNavigation` to reset the counter upon navigation. I tested a workaround which uses `tabs.onUpdated` and listens for the change to the `loading` state to reset the counter. While it works, the counter has rather different results due to how the internal update event works.

In the end, I decided to stick to the `webNavigation` API because it is what makes the most sense, but this means that the install dialog will ask the user for **permission to `read and change all your data on websites that you visit`**. It might be worth exploring the alternative solution and discuss this further.

## Known issues
- Sites using Google Fonts will not load the fonts
- Requests for libraries on `ajax.googleapis.com ` are allowed to avoid breaking many popular websites (including stackoverflow.com)
- The badge count is updated after the page has finished loading. If the page never finishes loading, the badge might not show at all. This is usually due to page errors or network issues.
- The number of requests blocked are reset upon page navigation. For single-page applications that rely on JavaScript to navigate the site, the reset can never happen. Whether this is the expected behaviour or not is debatable. If the `tabs.onUpdated` API is used instead of `webNavigation` the behaviour is different (see the paragraph on Privacy and Permissions).

### Tested on
The extension has been tested on **Chrome Version 76.0.3809.132 (Official Build) (64-bit)**.

Here is a non-exhaustive list of tested websites: 

| Website            | Works  | Notes                    |
|--------------------|:------:|--------------------------|
|google.com          |   ✅   |No trackers blocked, website working |
|facebook.com        |   ✅   |No trackers blocked, website working |
|theguardian.com     |   ✅   |Requests being blocked after page load |
|stackoverflow.com   |   ✅   |Loads jQuery from `ajax.googleapis.com ` |
|airbnb.com          |   ✅   |Single-page web application |

## TODO

- add automated testing
- improve privacy for requests to `ajax.googleapis.com `
- improve handling of resources such as Google Fonts (now being blocked)
- implement whitelisting
- implement https upgrade
- add rich reporting with dedicated UI and cross site stats
- add rich new tab feature
- add a settings page
- use analytics for feature usage tracking
- add full support for Firefox
