import { getProducts } from "./globals.js";
import renderProducts from "./view.js";
let startProduct = 0;
let productPerPage = 9;
getProducts().then(viewProducts);
function viewProducts(products) {
  renderProducts(products, startProduct, productPerPage);
}
