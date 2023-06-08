class Cart {
  cartItems = [];
  constructor(cartItems = []) {
    this.cartItems = cartItems;
  }
  addToCart(cartItem) {
    const cartItemExists = this.cartItems.find(
      ({ productName }) => productName === cartItem.productName
    );
    if (cartItemExists) {
      cartItem.incrementQuantity();
    } else {
      this.cartItems.push(cartItem);
    }
    this.save();
  }
  removeFromCart(cartItem) {
    this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    this.save();
  }
  getSubTotal() {
    const total = 0;
    this.cartItems.map((item) => (total += item.getTotalPrice()));
    return total;
  }
  save() {
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }
}

class CartItem {
  productName;
  price;
  quantity;
  constructor(productName, price, quantity) {
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
  }
  getTotalPrice() {
    return this.price * this.quantity;
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    this.quantity--;
  }
}

export { Cart, CartItem };
