import { getCartItemsCount, getCategories, getFavorites } from "./globals.js";
// render categories
getCategories().then(displayCategories);

function displayCategories(categories) {
  const parent = document.getElementById("categories");
  categories.forEach((category) => {
    parent.insertAdjacentHTML("beforeend", createCategoryItem(category));
  });
}

function createCategoryItem(category) {
  return `<a href="" class="nav-item nav-link">${category.name}</a>`;
}

// render favorites count
export function renderFavoritesCount() {
  document.getElementById("favorite-count").innerText = getFavorites();
}
renderFavoritesCount();
// render cart count
export function renderCartCount() {
  document.getElementById("cart-count").innerText = getCartItemsCount(); // to be edited to cart count
}
renderCartCount();
