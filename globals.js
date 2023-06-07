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
  const cachedProducts = localStorage.getItem("categories");
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

export function addToFavorites() {
  let favorites = localStorage.getItem("favorites");
  if (favorites === null) favorites = 0;
  favorites++;
  localStorage.setItem("favorites", favorites);
}

export function getFavorites() {
  return localStorage.getItem("favorites") || 0;
}
getCategories().then((data) => console.log(data));
getProducts().then((data) => console.log(data));
