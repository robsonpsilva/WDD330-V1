import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // 1. Retrieve the existing cart data
  let cart = getLocalStorage("so-cart");

  // If the cart is currently empty (null or undefined), initialize it as an array
  if (!cart) {
    cart = [];
  } else {
    // If it exists, it might be a single product (from the old implementation)
    // or an array of products. Ensure it's an array.
    if (!Array.isArray(cart)) {
      cart = [cart]; // Convert the single product to an array
    }
  }

  // 2. Add the new product to the cart array
  cart.push(product);

  // 3. Save the updated cart data back to local storage
  setLocalStorage("so-cart", cart);
}

function getLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
