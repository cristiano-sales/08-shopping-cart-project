const saveCartItems = (valorSalvarLocalStorage) => {
  localStorage.setItem('cartItems', valorSalvarLocalStorage); 
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
