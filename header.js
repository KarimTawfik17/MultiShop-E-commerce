import { logout } from "./LoginSignUp.js";
import {
  getCartItemsCount,
  getCategories,
  getFavorites,
  isAuthorized,
} from "./globals.js";
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

function renderNav() {
  const navParent = document.getElementById("nav");
  if (isAuthorized()) {
    let signout = document.createElement("a");
    signout.innerText = "Sign Out";
    signout.classList.add("nav-item", "nav-link");
    signout.href = "";
    signout.onclick = (e) => {
      e.preventDefault();
      logout();
      window.location.href = "/";
    };
    navParent.appendChild(signout);
  } else {
    navParent.insertAdjacentHTML(
      "beforeend",
      `<a href="login.html" class="nav-item nav-link">Log In</a>
      <a href="signup.html" class="nav-item nav-link">Sign Up</a>`
    );
  }
}

renderNav();

function createCart() {
  if (!localStorage.getItem("Cart")) {
    console.log("brand new cart created !");
    localStorage.setItem("Cart", "[]");
  }
}
createCart();

document.addEventListener("DOMContentLoaded", () => {
  let name = localStorage.getItem("userName");
  if (name) {
    document
      .querySelector("#navbarCollapse")
      .insertAdjacentHTML(
        "beforeend",
        `<div id="username" style="color:white;margin:5px;">Hi, ${name}</div>`
      );
  }
});
