import { Cart, CartItem } from "./Cart.js";
document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart(JSON.parse(localStorage.getItem("Cart")));
  console.log(cart);
  cart.cartItems.map((item) => {
    document.querySelector("#products").innerHTML += `<tr>
    <td class="align-middle">
      <img src="img/product-1.jpg" alt="" style="width: 50px" />
      ${item.productName}
    </td>
    <td class="align-middle">${item.price}</td>
    <td class="align-middle">
      <div
        class="input-group quantity mx-auto"
        style="width: 100px"
      >
        <div class="input-group-btn">
          <button
            type="button"
            class="decBtn btn btn-sm btn-primary btn-minus"
          >
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <input
          type="text"
          class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
          value="${item.quantity}"
        />
        <div class="input-group-btn">
          <button
            type="button"
            class="incBtn btn btn-sm btn-primary btn-plus"
          >
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
});
