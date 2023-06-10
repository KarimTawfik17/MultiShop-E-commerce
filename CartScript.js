import { Cart } from "./Cart.js";
document.querySelector(".checkout").addEventListener("click", () => {
  if (localStorage.getItem("token")) {
    window.location.href = "checkout.html";
  } else {
    window.location.href = "login.html";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart(JSON.parse(localStorage.getItem("Cart")));
  renderPageUI(cart);
  if (cart.cartItems.length > 0) {
    addListeners(cart);
  }
});

const addListeners = function (cart) {
  document
    .querySelectorAll(".btn-minus,.btn-plus,.btn-danger")
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.tagName == "I") {
          const action = e.target.parentNode.id.split(" ");
          manageCartItem(cart, ...action);
        } else {
          const action = e.target.id.split(" ");
          manageCartItem(cart, ...action);
        }
      });
    });
};

const manageCartItem = function (cart, action, id) {
  const myCartItem = cart.cartItems.find(
    ({ productID }) => productID === Number(id)
  );
  if (action === "increment") {
    cart.addToCart(myCartItem);
  } else if (action === "decrement") {
    cart.removeFromCart(myCartItem);
  } else {
    cart.removeAllFromCart(myCartItem);
  }
  cart.save();
  renderPageUI(cart);
};

const renderPageUI = function (cart) {
  document.querySelector("#products").innerHTML = "";
  cart.cartItems.map((item) => {
    document.querySelector("#products").innerHTML += `<tr>
        <td class="align-middle">
            <img src="${item.image}" alt="" style="width: 50px" />
            ${item.productName}
        </td>
        <td class="align-middle">${item.price}</td>
        <td class="align-middle">
            <div class="input-group quantity mx-auto" style="width: 100px">
                <div class="input-group-btn">
                    <button type="button" id="decrement ${
                      item.productID
                    }" class="decBtn btn btn-sm btn-primary btn-minus" >
                        <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input type="text" class="quantityVal form-control form-control-sm bg-secondary border-0 text-center" value="${
                  item.quantity
                }"/>
                <div class="input-group-btn">
                    <button type="button" id="increment ${
                      item.productID
                    }" class="incBtn btn btn-sm btn-primary btn-plus">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </td>
        <td class="align-middle">${item.getTotalPrice()}</td>
        <td class="align-middle">
            <button class="btn btn-sm btn-danger" type="button">
                <i class="fa fa-times"></i>
            </button>
        </td>
    </tr>`;
  });
  document.querySelector("#sub-total").innerHTML = cart.getSubTotal();
  addListeners(cart);
};
