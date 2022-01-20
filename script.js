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

function cartItemClickListener(event) {
  // coloque seu código aqui
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
  classeItems.addEventListener('click', async (event) => { // Ao clicar nesse botão você deve realizar uma requisição que irá retornar todos os dados específicos de um produto.
    console.log(event.target);
    if (event.target.className === 'item__add') { //  Verifica se clicou exatamente em um botão de class__add 
      const produtoClicado = getSkuFromProductItem(event.target.parentNode); // recupera o parentNode do alvo, cujo contém sku, title, image e button
      const { id: sku, title: name, price: salePrice } = await fetchItem(produtoClicado); // faz a requisição apenas do produto clicado
      const listaClicado = createCartItemElement({ sku, name, salePrice }); // cria lista que irá para o carrinho
      classeCartItems.appendChild(listaClicado); // O carrinho  recebe o a li inner text do produto clicado
      const carrinho = classeCartItems.innerHTML; // acessa o innerHTML do carrinho
      saveCartItems(carrinho); // a função dada em helpers salva o carrinho no Local Storage
      //  totalPrice();   
    }
  });
};

window.onload = async () => {
  await computers();
  adicionaAoCarrinho();
};

//  References:
// Douglas Marçal
// Wendy Silva
// Adriano Santos
// Leandro de Oliveira
