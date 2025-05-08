import { getLocalStorage } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  let htmlItems = []; // Inicializa como um array vazio por padrão

  if (cartItems && Array.isArray(cartItems)) {
    htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    // O carrinho está vazio ou não é um array
    document.querySelector(".product-list").innerHTML = "<p>The car is empty.</p>";
    // Ou você pode deixar o conteúdo vazio, dependendo do seu design.
    // document.querySelector(".product-list").innerHTML = "";
  }
}



function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
