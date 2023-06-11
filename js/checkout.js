import {
  getCartItems,
  getUserData,
  isAuthorized,
  getSubTotal as subtotal,
} from "../globals.js";

if (!isAuthorized()) {
  window.location.href = "/login.html";
}
let tax = 0.1;

function getCartProducts() {
  return getCartItems();
}

function createCartLine(product) {
  return ` <div class="d-flex justify-content-between">
    <p>${product.productName} x (${product.quantity})</p>
    <p>$${product.price * product.quantity}</p>
    </div>`;
}
function displayCartLines(products) {
  const cartLinesContainer = document.getElementById("cart-lines");
  products.forEach((product) => {
    cartLinesContainer.insertAdjacentHTML("beforeend", createCartLine(product));
  });
}

function getSubTotal() {
  return subtotal();
}
function displaySubTotal(SubTotal) {
  document.getElementById("subtotal").innerText = "$" + SubTotal;
}
function displayTaxRate(taxRate) {
  document.getElementById("taxRate").innerText = "%" + taxRate * 100;
}

function getTotal() {
  return getSubTotal() + getSubTotal() * tax;
}
function displayTotal(total) {
  document.getElementById("total").innerText = "$" + total.toFixed(2);
}

function calculateTax(paymentMethods) {
  let taxRate = 0;

  if (paymentMethods === "paypal") {
    taxRate = 0.1;
  } else if (paymentMethods === "cheque") {
    taxRate = 0.15;
  } else if (paymentMethods === "banktransfer") {
    taxRate = 0.05;
  } else {
    throw new Error("Chose a payment Methods");
  }
  tax = taxRate;
  return taxRate;
}

function validateShippingAddress(firstName, lastName, email, addressLine) {
  return (
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    addressLine.trim() === "" ||
    email.trim() === ""
  );
}

function getShippingInfo() {
  return {
    first_name: document.getElementById("first-name").value,
    last_name: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    mobile_number: document.getElementById("mobile-number").value,
    address1: document.getElementById("address1").value,
    address2: document.getElementById("address2").value,
    country: document.getElementById("country").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zip_code: document.getElementById("zip-code").value,
  };
}

function getOrderDetails() {
  return getCartProducts().map((product) => ({
    product_id: product.productID,
    price: product.price,
    qty: product.quantity,
  }));
}

function createRequestBody(shippingInfo, orderDetails) {
  return {
    sub_total_price: getSubTotal(),
    shipping: 10, // to be edited
    total_price: getTotal(),
    user_id: getUserData().userID,
    order_date: new Date().toISOString(),
    order_details: orderDetails,
    shipping_info: shippingInfo,
  };
}
function placeOrder() {
  const API_URL = "http://localhost:5000/api/orders";
  const shipping_info = getShippingInfo();
  if (
    validateShippingAddress(
      shipping_info.first_name,
      shipping_info.last_name,
      shipping_info.email,
      shipping_info.address1
    )
  ) {
    return alert(
      "Please enter a valid first name, last name, email and address ."
    );
  }
  const order_details = getOrderDetails();
  const requestBody = createRequestBody(shipping_info, order_details);
  const token = getUserData().userToken;
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((error) => {
      alert("error happened check console");
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const products = getCartProducts();
  displayCartLines(products);

  const SubTotal = getSubTotal();
  displaySubTotal(SubTotal);

  const total = getTotal();
  displayTotal(total);
});
const placeOrderButton = document.getElementById("place-order-button");
placeOrderButton.addEventListener("click", placeOrder);
const Radioo = document.getElementById("radioPar");
Radioo.addEventListener("change", function (e) {
  const taxType = e.target.id;
  const taxRate = calculateTax(taxType);
  displayTaxRate(taxRate);
  const total = getTotal();
  displayTotal(total);
});
