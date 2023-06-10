import { renderCartCount } from "./header.js";

class CartItem {
  productID;
  productName;
  price;
  image;
  quantity;
  constructor(productID, productName, price, image, quantity = 1) {
    this.productID = productID;
    this.productName = productName;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
  }
  getTotalPrice() {
    return this.price * this.quantity;
  }
  incrementQuantity() {
    this.quantity += 1;
  }
  decrementQuantity() {
    this.quantity -= 1;
  }
}
class Cart {
  cartItems = [];
  constructor(cartItems = []) {
    if (cartItems.length) {
      this.cartItems = [];
      cartItems.map((item) => {
        this.cartItems.push(
          new CartItem(
            item.productID,
            item.productName,
            item.price,
            item.image,
            item.quantity
          )
        );
      });
    } else {
      this.cartItems = cartItems;
    }
  }
  addToCart(cartItem) {
    const myCartItem = this.cartItems.find(
      ({ productID }) => productID === cartItem.productID
    );
    if (myCartItem) {
      myCartItem.incrementQuantity();
    } else {
      this.cartItems.push(cartItem);
    }
    this.save();
  }
  removeFromCart(cartItem) {
    const myCartItem = this.cartItems.find(
      ({ productID }) => productID === cartItem.productID
    );
    if (myCartItem.quantity > 1) {
      myCartItem.decrementQuantity();
    } else {
      this.cartItems.splice(this.cartItems.indexOf(myCartItem), 1);
    }
    this.save();
  }
  removeAllFromCart(cartItem) {
    this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    this.save();
  }
  getSubTotal() {
    let total = 0;
    this.cartItems.map((item) => (total += item.getTotalPrice()));
    return total;
  }
  save() {
    localStorage.setItem("Cart", JSON.stringify(this.cartItems));
    localStorage.setItem("Subtotal", this.getSubTotal());
    renderCartCount();
  }
}

export { Cart, CartItem };
