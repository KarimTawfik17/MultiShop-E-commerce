"use strict";

import { addToFavorites, getCategories } from "./globals.js";
import { getProducts } from "./globals.js";

//CATEGORIES ------
//showing categories section
getCategories().then(renderCategories);
function renderCategories(categories) {
  // console.log('categories',categories)
  //sort by products count in descending order
  categories.sort(function (a, b) {
    return Number(b.productCount) - Number(a.productCount);
  });
  const container = document.getElementById("categories-container");
  //showing top 4
  let loop = 4;
  if (categories.length < 4) loop = categories.length;
  for (let i = 0; i < loop; i++) {
    container.innerHTML += `
<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
  <a class="text-decoration-none" href="">
    <div class="cat-item d-flex align-items-center mb-4">
      <div class="overflow-hidden" style="width: 100px; height: 100px">
        <img class="img-fluid" src="${categories[i].image}" alt="" />
      </div>
      <div class="flex-fill pl-3">
        <h6 style="text-transform:uppercase">${categories[i].name}</h6>
          <small class="text-body">${categories[i].productCount} Products</small>
      </div>
    </div>
  </a>
</div>
`;
  }
}

// // PRODUCTS ------

// FEATURED PRODUCTS ------
getProducts().then(renderFeaturedProducts);
function renderFeaturedProducts(products) {
  // console.log("products",products)
  // is it featured
  const featuredProducts = [];
  products.forEach((product) => {
    if (product.is_featured) featuredProducts.push(product);
  });
  // console.log("fP",featuredProducts)
  const container = document.getElementById("featured-products-container");
  let loop = 8;
  if (featuredProducts.length < 9) loop = featuredProducts.length;
  //showing 8 featured products
  for (let i = 0; i < loop; i++) {
    container.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
    <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
        <img class="img-fluid w-100" src="${
          featuredProducts[i].image
        }" alt="" />
        <div class="product-action">
          <a
            Fnumber="${i}"
            id ="F-cart-btn-${i}"
            class="btn btn-outline-dark btn-square"
            href="#"><i class="fa fa-shopping-cart"></i
          ></a>
          <a 
            Fnumber="${i}"
            id ="F-fav-btn-${i}"
            class="btn btn-outline-dark btn-square" href="#"
            ><i class="far fa-heart"></i
          ></a>
          <a class="btn btn-outline-dark btn-square" href="#"
            ><i class="fa fa-sync-alt"></i
          ></a>
          <a class="btn btn-outline-dark btn-square" href="#"
            ><i class="fa fa-search"></i
          ></a>
        </div>
      </div>
      <div class="text-center py-4">
        <a class="h6 text-decoration-none text-truncate" href=""
          >${featuredProducts[i].name}</a
        >
        <div
          class="d-flex align-items-center justify-content-center mt-2"
        >
          <h5>$${
            featuredProducts[i].price *
            (1 - featuredProducts[i].discount).toFixed(2)
          }</h5>
          <h6 class="text-muted ml-2"><del>$${
            featuredProducts[i].price
          }</del></h6>
        </div>
        <div
          class="d-flex align-items-center justify-content-center mb-1"
        >
          ${renderRatings(Number(featuredProducts[i].rating))}
          <small>(${featuredProducts[i].rating_count})</small>
        </div>
      </div>
    </div>
  </div>
`;
  }
  //adding events for items
  //cart
  for (let i = 0; i < loop; i++) {
    let cartBtn = document.getElementById(`F-cart-btn-${i}`);
    cartBtn.addEventListener("click", addToCartFeatured);
  }
  function addToCartFeatured() {
    let i = this.getAttribute("Fnumber");
    console.log("cart", featuredProducts[i]);
  }
  //fav
  for (let i = 0; i < loop; i++) {
    let cartBtn = document.getElementById(`F-fav-btn-${i}`);
    cartBtn.addEventListener("click", addtoFavFeatured);
  }
  function addtoFavFeatured() {
    let i = this.getAttribute("Fnumber");
    addToFavorites(featuredProducts[i]._id);
  }
}

// RECENT PRODUCTS ------
getProducts().then(renderRecentProducts);
function renderRecentProducts(products) {
  // is it recent
  const recentProducts = [];
  products.forEach((product) => {
    if (product.is_recent) recentProducts.push(product);
  });
  // console.log("rp",recentProducts)
  const container = document.getElementById("recent-products-container");
  let loop = 8;
  if (recentProducts.length < 9) loop = recentProducts.length;
  //showing 8 recent products
  for (let i = 0; i < loop; i++) {
    container.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${
              recentProducts[i].image
            }" alt="" />
            <div class="product-action">
              <a 
                  Rnumber ="${i}"
                  id ="R-cart-btn-${i}"
                  class="btn btn-outline-dark btn-square" href=""
                  ><i class="fa fa-shopping-cart"></i
                ></a>
                <a 
                  Rnumber ="${i}"
                  id ="R-fav-btn-${i}"
                  class="btn btn-outline-dark btn-square" href=""
                  ><i class="far fa-heart"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href=""
                  ><i class="fa fa-sync-alt"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href=""
                  ><i class="fa fa-search"></i
                ></a>
              </div>
            </div>
            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate" href=""
                >${recentProducts[i].name}</a
              >
              <div
                class="d-flex align-items-center justify-content-center mt-2"
              >
                <h5>$${
                  recentProducts[i].price *
                  (1 - recentProducts[i].discount).toFixed(2)
                }</h5>
                <h6 class="text-muted ml-2"><del>$${
                  recentProducts[i].price
                }</del></h6>
              </div>
              <div
                class="d-flex align-items-center justify-content-center mb-1"
              >
                ${renderRatings(recentProducts[i].rating)}
                <small>(${recentProducts[i].rating_count})</small>
              </div>
            </div>
          </div>
        </div>`;
  }
  //adding events for items
  //cart
  for (let i = 0; i < loop; i++) {
    let cartBtn = document.getElementById(`R-cart-btn-${i}`);
    cartBtn.addEventListener("click", addToCartRecent);
  }
  function addToCartRecent() {
    let i = this.getAttribute("Rnumber");
    console.log("cart", recentProducts[i]);
  }
  //fav
  for (let i = 0; i < loop; i++) {
    let cartBtn = document.getElementById(`R-fav-btn-${i}`);
    cartBtn.addEventListener("click", addtoFavRecent);
  }
  function addtoFavRecent() {
    let i = this.getAttribute("Rnumber");
    addToFavorites(recentProducts[i]._id);
  }
}

//rendering stars
function renderRatings(rating) {
  // debugger;
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
    ratingSection += `<small class="fa fa-star-half-alt text-primary mr-1"></small>`; // to be edited to half rating
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

// console.log('end')
