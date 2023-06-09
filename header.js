import { getCategories } from "./globals.js";

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
