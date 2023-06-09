import { getProducts } from "./globals.js";
import renderProducts from "./view.js";
let startProduct = 0;
let productPerPage = 9;
let allProducts = [];
let viewedProducts = [];
function reRender() {
  console.log("gonna rerender with :", startProduct, productPerPage);
  renderProducts(viewedProducts, startProduct, productPerPage);
}
getProducts().then((products) => {
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

  viewedProducts = [...allProducts].sort(sortFn);
  reRender();
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
  console.log(link);
};
