import { getProducts } from "./globals.js";
import renderProducts from "./view.js";
let startProduct = 0;
let productPerPage = 9;
let viewedProducts = [];
function reRender() {
  renderProducts(viewedProducts, startProduct, productPerPage);
}
getProducts().then((products) => {
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
