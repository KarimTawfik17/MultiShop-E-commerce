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

export function getUser() {
  return localStorage.getItem("userID");
}

export function addToFavorites(productId) {
  let favorites = localStorage.getItem("favorites");
  if (favorites === null) favorites = "[]";
  favorites = JSON.parse(favorites);
  let i = favorites.indexOf(productId);
  if (i === -1) {
    favorites.push(productId);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function getFavorites() {
  let favorites = localStorage.getItem("favorites");
  if (favorites === null) favorites = "[]";
  favorites = JSON.parse(favorites);
  return favorites.length;
}

// getCategories().then((data) => console.log(data));
// getProducts().then((data) => console.log(data));
