const getSavedCartItems = (chaveLocalStorage) => localStorage.getItem(chaveLocalStorage);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
