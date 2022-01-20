const fetchItem = async (productId) => {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
