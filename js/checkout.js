

let tax = 0.1;

function getCartProducts() {
    // const cartProducts = localStorage.getItem("cart");
    // if (cartProducts) {
    //   return JSON.parse(cartProducts);
    // }
    // return [];
  
    const cartProducts = [
      {
        "product_id": "6346c15ea060efd7cae40589",
        "price": 25,
        "qty": 2,
        "name": "product1",
        
    },
    {
      "product_id": "6346c15ea060efd7cae40589",
      "price": 25,
      "qty": 2,
      "name": "product2",
  },   {
    "product_id": "6346c15ea060efd7cae40589",
    "price": 25,
    "qty": 2,
    "name": "product3",
},
    ]
    return cartProducts;
  }

  function createCartLine(product) {
    
  
    return ` <div class="d-flex justify-content-between">
    <p>${product.name} x ${product.qty}</p>
    <p>$${product.price * product.qty}</p>
    </div>`
  }
  function displayCartLines(products) {
    const cartLinesContainer = document.getElementById("cart-lines");
      console.log(products);
      products.forEach((product) => {
       console.log(createCartLine(product)); 
       cartLinesContainer.insertAdjacentHTML("beforeend",createCartLine(product));
        });
  
   
  }

  function getSubTotal() {
    return 200
  }
  function displaySubTotal(SubTotal) {
    document.getElementById('subtotal').innerText = '$'+SubTotal
  }
  function displayTaxRate(taxRate) {
    document.getElementById('taxRate').innerText = '%'+taxRate*100
  }

  function getTotal() {
    return getSubTotal() + getSubTotal() * tax
  }
  function displayTotal(total) {
    document.getElementById('total').innerText = '$'+ total
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
      throw new Error("Chose a payment Methods")
    }
    tax = taxRate;
    return taxRate

  

  
  }
  
  function validateBillingAddress() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
  
    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("Please enter a valid first name and last name.");
      return false;
    }
  
  
  }
  
  function placeOrder() {

  
    const shippingInfo = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      mobileNumber: document.getElementById("mobile-number").value,
      address1: document.getElementById("address1").value,
      address2: document.getElementById("address2").value,
      country: document.getElementById("country").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zipCode: document.getElementById("zip-code").value,
    };
  // return console.log(shippingInfo);
  
  
    // const token = localStorage.getItem("token");
    // console.log('token')
    // const apiUrl = "http://localhost:5000/api/orders";
  
    // fetch(apiUrl, {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`,  },
    //   body: JSON.stringify(shippingInfo),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Response:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const products = getCartProducts();
     console.log(products);
    displayCartLines(products);
   
    const SubTotal = getSubTotal();
    console.log(SubTotal);
    displaySubTotal(SubTotal);

    const total = getTotal();
    console.log(total);
    displayTotal(total);

  
   
  
 
  });
  const placeOrderButton = document.getElementById("place-order-button");
  placeOrderButton.addEventListener("click", placeOrder);
  const Radioo = document.getElementById('radioPar');
  Radioo.addEventListener('change',function (e) {
    const taxType = e.target.id;
    const taxRate = calculateTax(taxType);
    displayTaxRate(taxRate);
    console.log(taxType, taxRate);
    const total = getTotal();
    displayTotal(total);
  })


  