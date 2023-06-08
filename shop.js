import { getProducts } from "./globals.js";
import renderProducts from "./view.js";
let startProduct = 0;
let productPerPage = 9;
let allProducts = [];
let viewedProducts = [];
function cleanData(products) {
  const randomColor = () =>
    ["black", "white", "red", "blue", "green"][Math.floor(Math.random() * 5)];
  const randomSize = () =>
    ["XS", "S", "M", "L", "XL"][Math.floor(Math.random() * 5)];
  return products.map((product) => ({
    ...product,
    color: randomColor(),
    size: randomSize(),
  }));
}
function reRender() {
  console.log(viewedProducts[0]);
  renderProducts(viewedProducts, startProduct, productPerPage);
}
getProducts().then((products) => {
  products = cleanData(products);
  allProducts = products;
  viewedProducts = products;
  reRender();
});

document.getElementById("count-per-page").onclick = (e) => {
  e.preventDefault();
  const count = e.target.dataset.count;
  if (count) {
    productPerPage = +count;
    reRender();
  }
};
document.getElementById("sort-products").onclick = (e) => {
  e.preventDefault();
  const sortType = e.target.dataset.sort;
  if (!sortType) return;
  let sortFn;
  switch (sortType) {
    case "price":
      sortFn = (p1, p2) => p1.price - p2.price;
      break;
    case "popularity":
      sortFn = (p1, p2) => p1.rating_count - p2.rating_count;
      break;
    case "rating":
      sortFn = (p1, p2) => p1.rating - p2.rating;
      break;

    default:
      throw new Error("Unexpected sorting type : ", sortType);
  }

  viewedProducts = [...viewedProducts].sort(sortFn);
  reRender();
};

const priceFilterForm = document.getElementById("price-filter");
priceFilterForm.onchange = filterProducts;
const colorFilterForm = document.getElementById("color-filter");
colorFilterForm.onchange = filterProducts;
const sizeFilterForm = document.getElementById("size-filter");
sizeFilterForm.onchange = filterProducts;

function filterProductByPrice(product, shownPriceRanges) {
  if (shownPriceRanges.includes("all")) return true;
  for (let range of shownPriceRanges) {
    range = +range;
    if (product.price >= range && product.price < range + 100) {
      return true;
    }
  }
  return false;
}
function filterProductByColor(product, shownColors) {
  return shownColors.includes("all") || shownColors.includes(product.color);
}
function filterProductBySize(product, shownSizes) {
  return shownSizes.includes("all") || shownSizes.includes(product.size);
}

function filterProducts() {
  const shownPriceRanges = [...new FormData(priceFilterForm).keys()];
  const shownColors = [...new FormData(colorFilterForm).keys()];
  const shownSizes = [...new FormData(sizeFilterForm).keys()];
  viewedProducts = allProducts.filter(
    (product) =>
      filterProductByPrice(product, shownPriceRanges) &&
      filterProductByColor(product, shownColors) &&
      filterProductBySize(product, shownSizes)
  );
  reRender();
  // console.log(shownPriceRanges, shownColors, shownSizes);
}
