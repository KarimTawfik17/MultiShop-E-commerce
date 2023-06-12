import { Cart, CartItem } from "./Cart.js";
import { renderFavoritesCount } from "./header.js";
import { creteToast } from "./toast.js";
export async function getCategories() {
  const cachedCategories = localStorage.getItem("categories");
  if (cachedCategories) {
    return JSON.parse(cachedCategories);
  }
  const response = await fetch("http://localhost:5000/api/categories/");
  const body = await response.json();
  const data = body.data;
  localStorage.setItem("categories", JSON.stringify(data));
  return data;
}

export async function getProducts() {
  const cachedProducts = localStorage.getItem("products");
  if (cachedProducts) {
    return JSON.parse(cachedProducts);
  }
  const response = await fetch("http://localhost:5000/api/products/");
  const body = await response.json();
  const data = body.data;
  localStorage.setItem("products", JSON.stringify(data));
  return data;
}

export function addToFavorites(productId) {
  let favorites = localStorage.getItem("favorites");
  if (favorites === null) favorites = "[]";
  favorites = JSON.parse(favorites);
  let i = favorites.indexOf(productId);
  if (i === -1) {
    favorites.push(productId);
    creteToast("Favorites", "Item Added To Favorites", "img/star.png");
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavoritesCount();
}

export function getFavorites() {
  let favorites = localStorage.getItem("favorites");
  if (favorites === null) favorites = "[]";
  favorites = JSON.parse(favorites);
  return favorites.length;
}

export function getCartItemsCount() {
  let cartItems = localStorage.getItem("Cart");
  if (cartItems === null) {
    console.warn("there's no cart data in storage");
    return 0;
  }
  cartItems = JSON.parse(cartItems);
  return cartItems.length || 0;
}
export function addToCart({ _id: productID, name: productName, price, image }) {
  const cart = new Cart(JSON.parse(localStorage.getItem("Cart")));
  const item = new CartItem(productID, productName, price, image);
  cart.addToCart(item);
  creteToast("Cart", "Item Added To Cart", "img/shopping-cart.png");
}
export function getCartItems() {
  const cart = new Cart(JSON.parse(localStorage.getItem("Cart")));
  return cart.cartItems;
}
export function getSubTotal() {
  const cart = new Cart(JSON.parse(localStorage.getItem("Cart")));
  return cart.getSubTotal();
}
window.addToCart = addToCart;
window.getCartItems = getCartItems;
window.getSubTotal = getSubTotal;
export function isAuthorized() {
  if (localStorage.getItem("userID")) return true;
  return false;
}
export function getUserData() {
  if (!isAuthorized()) {
    console.warn("trying to get user data without sign-in");
    return null;
  }
  return {
    userName: localStorage.getItem("userName"),
    userID: localStorage.getItem("userID"),
    userToken: localStorage.getItem("token"),
  };
}
