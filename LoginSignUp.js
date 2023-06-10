//Hussein
//User Class that has all User data.
import { Cart } from "./Cart.js";
class User {
  id;
  firstName;
  lastName;
  email;
  password;
  token;
  constructor(firstName, lastName, email, password) {
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.password = password;
  }
}
// validating email
const validateEmail = function (email) {
  return /\S+@\S+\.\S+/.test(email);
};
//validating firstname and lastname to be plain text and password to be at least 8 characters long and has capital letters and numbers and special characters.
const validateInput = function (firstName, lastName, email, password) {
  let passRe =
    /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
  return (
    /^[A-Za-z]*$/.test(firstName, lastName) &&
    validateEmail(email) &&
    passRe.test(password)
  );
};
//send a request to register a user and save info in database
const sendRegReq = async function (user) {
  const response = await fetch("http://localhost:5000/api/users/register", {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    method: "POST",
    body: JSON.stringify(user),
  });
  return await response.json();
};
//send a request to make sure that credentials are right and there is an existing user with those credentials
const sendLogReq = async function (email, password) {
  const response = await fetch("http://localhost:5000/api/users/login", {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    method: "POST",
    body: JSON.stringify({ email, password }, null, 2),
  });
  return await response.json();
};
//after finding user under credentials provided we save userID and token in local storage and let the customer in our app
const signIn = function (user) {
  localStorage.setItem("userID", user._id);
  localStorage.setItem("token", user.token);
  localStorage.setItem("userName", user.first_name);
  window.location.href = "/";
};
//register function takes customer input and turn it into an object and send it to API after validating.
const register = function (firstName, lastName, email, password) {
  if (validateInput(firstName, lastName, email, password)) {
    const user = new User(firstName, lastName, email, password);
    sendRegReq(user)
      .then((savedUser) => {
        user.id = savedUser._id;
        user.token = savedUser.token;
        signIn(user);
      })
      .catch((error) => alert(error));
  } else {
    alert("Please Enter Valid Data");
  }
};

//login function takes customer input and send it to API after validating to find the user and let him in.
const login = function (email, password) {
  if (validateEmail(email, password)) {
    sendLogReq(email, password)
      .then((user) => {
        signIn(user);
      })
      .catch((error) => alert("Invalid Credentials"));
  }
};
//erasing login info from local storage
const logout = function () {
  localStorage.removeItem("userID");
  localStorage.removeItem("token");
};

export { register, login, logout };
