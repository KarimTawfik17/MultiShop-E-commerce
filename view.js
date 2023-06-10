import { addToCart, addToFavorites } from "./globals.js";
import { renderCartCount } from "./header.js";

const parser = new DOMParser();

export default function renderProducts(products, start = 0, count = 9) {
  const parent = document.getElementById("products");
  parent.innerHTML = "";
  for (let i = start; i < start + count && i < products.length; i++) {
    parent.appendChild(createProductUI(products[i]));
  }
  renderProductPagination(products.length, start, count);
}

function createProductUI(product) {
  let productUIel = parser.parseFromString(
    `
<div class="col-lg-4 col-md-6 col-sm-6 pb-1">
  <div class="product-item bg-light mb-4">
    <div class="product-img position-relative overflow-hidden">
      <img class="img-fluid w-100" src="${product.image}" alt="" />
      <div class="product-action">
        <a data-action='cart' class="btn btn-outline-dark btn-square" >
          <i class="fa fa-shopping-cart"></i>
        </a>
        <a data-action='heart' class="btn btn-outline-dark btn-square" href="">
          <i class="far fa-heart"></i>
        </a>
        <a class="btn btn-outline-dark btn-square" href="">
          <i class="fa fa-sync-alt"></i>
        </a>
        <a class="btn btn-outline-dark btn-square" href="">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </div>
    <div class="text-center py-4">
      <a class="h6 text-decoration-none text-truncate" href="">
        ${product.name}
      </a>
      <div class="d-flex align-items-center justify-content-center mt-2">
        <h5>$${product.price.toFixed(2)}
        </h5>
        <h6 class="text-muted ml-2">
          <del>$${(product.price + product.price * product.discount).toFixed(2)}
          </del>
        </h6>
      </div>
      <div class="d-flex align-items-center justify-content-center mb-1">
          ${renderRatings(product.rating)}
        <small>(${product.rating_count})</small>
      </div>
    </div>
  </div>
</div>;
  `,
    "text/html"
  );
  productUIel = productUIel.body.firstChild;
  addHandersToProductUI(product, productUIel);
  return productUIel;
}

function addHandersToProductUI(product, productUIel) {
  const cartBtn = productUIel.querySelector('[data-action="cart"');
  const heartBtn = productUIel.querySelector('[data-action="heart"');
  cartBtn.onclick = (e) => {
    e.preventDefault();
    addToCart(product);
    renderCartCount();
  };
  heartBtn.onclick = (e) => {
    e.preventDefault();
    addToFavorites(product._id);
    // console.log(product._id, "added to favorites"); // favorite logic here
  };
}

function renderRatings(rating) {
  if (rating < 0) {
    console.warn("invalid rating : ", rating);
    rating = 0;
  }
  if (rating > 5) {
    console.warn("invalid rating : ", rating);
    rating = 5;
  }
  let solid = rating;
  let empty = 5 - rating;
  let half = 0;
  if (isFloat(rating)) {
    solid = Math.floor(rating);
    empty = 4 - solid;
    half = 1;
  }
  let ratingSection = ``;
  ratingSection += renderRatingStarsFull(solid);
  if (half) {
    ratingSection += `<small class="fa fa-star-half-alt text-primary mr-1"></small>`;
  }
  ratingSection += renderRatingStarsEmpty(empty);
  return ratingSection;
}

function renderRatingStarsFull(n) {
  let stars = ``;
  for (let i = 0; i < n; i++) {
    stars += `<small class="fa fa-star text-primary mr-1"></small>`;
  }
  return stars;
}
function renderRatingStarsEmpty(n) {
  let stars = ``;
  for (let i = 0; i < n; i++) {
    stars += `<small class="far fa-star text-primary mr-1"></small>`;
  }
  return stars;
}
function isFloat(n) {
  return n % 1 !== 0;
}

function renderProductPagination(totalCount, startEl = 0, countPerPage = 9) {
  const paginationSection = document.getElementById("pagination");
  const prev = createPaginationPageBtn("previous");
  const next = createPaginationPageBtn("next");
  const currentPage = getCurrentPage(startEl, countPerPage);
  const totalPages = getTotalPages(totalCount, countPerPage);
  paginationSection.innerHTML = "";
  // console.log(currentPage, "current page");
  // console.log(totalPages, "total pages");
  if (currentPage == 1) {
    prev.classList.add("disabled");
  }
  if (currentPage == totalPages) {
    next.classList.add("disabled");
  }
  paginationSection.appendChild(prev);
  if (currentPage > 1) {
    paginationSection.appendChild(createPaginationPageBtn(currentPage - 1));
  }

  const current = createPaginationPageBtn(currentPage);
  current.classList.add("active");
  paginationSection.appendChild(current);

  if (currentPage < totalPages) {
    paginationSection.appendChild(createPaginationPageBtn(currentPage + 1));
  }

  paginationSection.appendChild(next);
}
function createPaginationPageBtn(page) {
  return parser.parseFromString(
    `<li class="page-item"><a data-link=${page} class="page-link" href="#">${page}</a></li>`,
    "text/html"
  ).body.firstChild;
}

function getCurrentPage(startEl, countPerPage) {
  return Math.floor(startEl / countPerPage) + 1;
}

function getTotalPages(totalCount, countPerPage) {
  return Math.ceil(totalCount / countPerPage);
}

export function reverseSort() {
  const reverseBtn = document.getElementById("reverse");
  reverseBtn.classList.remove("collapse");
}
