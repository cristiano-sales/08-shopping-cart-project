const classeItems = document.querySelector('.items');
const classeCartItems = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText; // retorna o sku do produto, exemplo MLB2025368569 
}

const removeItem = (event) => {
  if (event.target.className === 'cart__item') {
    event.target.remove();

    const carrinho = classeCartItems.innerHTML;
    saveCartItems(carrinho);
  }
};

const salvaLocalStorage = () => {
  classeCartItems.innerHTML = getSavedCartItems('cartItems');
  classeCartItems.addEventListener('click', removeItem);  
};

function cartItemClickListener() {
  classeCartItems.addEventListener('click', removeItem);
}

function createCartItemElement({ sku, name, salePrice }) {  
  const li = document.createElement('li'); 
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const computers = async () => {
  const apiComputers = await fetchProducts();
  await apiComputers.forEach(({ id: sku, title: name, thumbnail: image }) => {
    classeItems.appendChild(createProductItemElement({ sku, name, image }));
  });
};

const adicionaAoCarrinho = () => {
  classeItems.addEventListener('click', async (event) => {
    if (event.target.className === 'item__add') { 
      const produtoClicado = getSkuFromProductItem(event.target.parentNode);
      const { id: sku, title: name, price: salePrice } = await fetchItem(produtoClicado);
      const listaClicado = createCartItemElement({ sku, name, salePrice });
      classeCartItems.appendChild(listaClicado);

      const carrinho = classeCartItems.innerHTML;
      saveCartItems(carrinho);
    }
  });
};

window.onload = async () => {
  await computers();
  adicionaAoCarrinho();
  salvaLocalStorage();
};

//  References:
// Douglas Marçal
// Wendy Silva
// Adriano Santos
// Leandro de Oliveira
