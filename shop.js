import { getProducts } from "./globals.js";
import renderProducts, { reverseSort } from "./view.js";
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
      sortFn = (p1, p2) => p2.rating_count - p1.rating_count;
      break;
    case "rating":
      sortFn = (p1, p2) => p2.rating - p1.rating;
      break;

    default:
      throw new Error("Unexpected sorting type : ", sortType);
  }

  viewedProducts = [...viewedProducts].sort(sortFn);
  reRender();
  reverseSort();
};

document.getElementById("pagination").onclick = (e) => {
  e.preventDefault();
  let link = e.target.dataset.link;
  switch (link) {
    case undefined:
      return;
    case "next":
      startProduct += productPerPage;
      reRender();
      break;
    case "previous":
      startProduct -= productPerPage;
      reRender();
      break;
    default:
      link = +link;
      if (isNaN(link)) throw new Error("unexpected link : ", link);
      startProduct = productPerPage * (link - 1);
      reRender();
  }
};
const priceFilterForm = document.getElementById("price-filter");
priceFilterForm.onchange = filterProducts;
const colorFilterForm = document.getElementById("color-filter");
colorFilterForm.onchange = filterProducts;
const sizeFilterForm = document.getElementById("size-filter");
sizeFilterForm.onchange = filterProducts;

function filterProductByPrice(product, shownPriceRanges) {
  if (shownPriceRanges.includes("all")) return true;
  if (shownPriceRanges.length == 0) return true; // no price selected to filter
  for (let range of shownPriceRanges) {
    range = +range;
    if (product.price >= range && product.price < range + 100) {
      return true;
    }
  }
  return false;
}
function filterProductByColor(product, shownColors) {
  if (shownColors.length == 0) return true; // no color selected to filter
  return shownColors.includes("all") || shownColors.includes(product.color);
}
function filterProductBySize(product, shownSizes) {
  if (shownSizes.length == 0) return true; // no size selected to filter
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
}

document.getElementById("reverse").onclick = () => {
  viewedProducts.reverse();
  reRender();
};
