import { getCategories, getFavorites } from "./globals.js";
console.log("am header running");
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
  document.getElementById("cart-count").innerText = 0; // to be edited to cart count
}
renderCartCount();
