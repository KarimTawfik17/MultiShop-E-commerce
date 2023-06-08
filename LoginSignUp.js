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

const validateInput = function (firstName, lastName, email, password) {
  return true;
};

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
const signIn = function (user) {
  localStorage.setItem("userID", user.id);
  localStorage.setItem("token", user.token);
};

const register = function (firstName, lastName, email, password) {
  if (validateInput(firstName, lastName, email, password)) {
    const user = new User(firstName, lastName, email, password);
    sendRegReq(user)
      .then((savedUser) => {
        user.id = savedUser._id;
        user.token = savedUser.token;
        signIn(user);
      })
      .catch((error) => console.log(error));
  } else {
    console.error("Please Enter Valid Data");
  }
};

const login = function (email, password) {
  if (validateInput(email, password)) {
    sendLogReq(email, password).then((user) => {
      signIn(user);
    });
  }
};

const logout = function () {
  localStorage.removeItem("userID");
  localStorage.removeItem("token");
};

export { register, login, logout };
