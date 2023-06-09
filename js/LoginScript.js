import * as userFunctions from "./LoginSignUp.js";

document.querySelector("#login").addEventListener("click", () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  userFunctions.login(email, password);
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    window.location.href = "/";
  }
});
