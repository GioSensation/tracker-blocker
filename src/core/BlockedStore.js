/**
 * Maps the number of blocked trackers to tabIds and provides methods to interact with it
 */
class BlockedStore {
  constructor () {
    this.blockedMap = {};
  }

  /**
   * Returns a string representation of the value for the tabId. If undefined returns empty string.
   * @param {number} tabId
   * @returns {string}
   */
  getString(tabId) {
    return this.blockedMap[tabId] === undefined ? '' : `${this.blockedMap[tabId]}`;
  }

  /**
   * Increase the counter for the provided tabId.
   * Note that internally we use integers, not strings.
   * @param {number} tabId
   * @returns {BlockedStore}
   */
  increase(tabId) {
    // Note: internally we use integers
    this.blockedMap[tabId] = 1 + (this.blockedMap[tabId] || 0);
    return this;
  }

  /**
   * Reset the counter for the provided tabId.
   * @param {number} tabId
   * @returns {BlockedStore}
   */
  reset(tabId) {
    this.blockedMap[tabId] = 0;
    return this;
  }

  /**
   * Remove a tabId from the map. Used to avoid memory leaks when a tab is closed.
   * @param tabId
   * @returns {BlockedStore}
   */
  remove(tabId) {
    delete this.blockedMap[tabId];
    return this;
  }
}

// Only export the instance
const blockedStore = new BlockedStore();
export default blockedStore;
