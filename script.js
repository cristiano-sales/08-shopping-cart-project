const classeItems = document.querySelector('.items');
const classeCartItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => 
   item.querySelector('span.item__sku').innerText;

const precoTotal = () => {
  const carrinho = Array.from(document.querySelectorAll('.cart__item'));
  const total = document.querySelector('.total-price');
  const somaTotal = carrinho.reduce((acc, cur) => {
    const arrayStrings = cur.textContent.split(' ');
    const preco = arrayStrings[arrayStrings.length - 1].slice(1);
    return acc + +preco;
  }, 0);
  total.textContent = `${somaTotal}`;
};

const removeItem = (event) => {
  if (event.target.className === 'cart__item') {
    event.target.remove();

    const carrinho = classeCartItems.innerHTML;
    saveCartItems(carrinho);

    precoTotal();
  }
};

const salvaLocalStorage = () => {
  classeCartItems.innerHTML = getSavedCartItems('cartItems');
  classeCartItems.addEventListener('click', removeItem);  
};

const cartItemClickListener = () => {
  classeCartItems.addEventListener('click', removeItem);
};

const createCartItemElement = ({ sku, name, salePrice }) => {  
  const li = document.createElement('li'); 
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

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

      precoTotal();
    }
  });
};

window.onload = async () => {
  await computers();
  adicionaAoCarrinho();
  salvaLocalStorage();
  precoTotal();
};

//  References:
// Douglas Marçal
// Wendy Silva
// Adriano Santos
// Leandro de Oliveira
