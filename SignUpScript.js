import * as userFunctions from "./LoginSignUp.js";

document.querySelector("#register").addEventListener("click", () => {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  userFunctions.register(firstName, lastName, email, password);
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    window.location.href = "/";
  }
});
