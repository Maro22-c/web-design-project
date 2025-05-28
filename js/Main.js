var isSignedIn = false;
var currentUser = "";

var admin = { username: "admin", password: "admin123" };
var users = [{ username: "user1", password: "pass1" }];

let users = JSON.parse(
  localStorage.getItem("users") || '[{"username":"user1","password":"pass1"}]'
);

var userTypeEl = document.getElementById("userType");
var contntEl = document.getElementById("contnt");
var msgEl = document.getElementById("msg");

function createContent() {
  var m = userTypeEl.value;
}
// Expose to other files
window.isSignedIn = () => isSignedIn;
window.getCurrentUser = () => currentUser;
window.getCarts = () => carts;

// Handle login
window.handleLoginSubmit = function (mode, username, password) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    isSignedIn = true;
    currentUser = username;
    saveState();
    return { success: true, message: "Login successful!" };

    if (m === "admin" || m === "user") {
      contntEl.innerHTML =
        "<label>Username:</label>" +
        '<input id="inpUser" type="text">' +
        "<label>Password:</label>" +
        '<input id="inpPass" type="password">';
    } else {
      contntEl.innerHTML =
        "<label>New Username:</label>" +
        '<input id="inpNewUser" type="text" >' +
        "<label>New Password:</label>" +
        '<input id="inpNewPass" type="password" >';
    }
  }
  userTypeEl.addEventListener("change", createContent);
  createContent();

  // Handle registration
  window.handleRegister = function (newUser, newPass) {
    if (!newUser || !newPass)
      return { success: false, message: "Please fill both fields." };
    if (users.find((u) => u.username === newUser)) {
      return { success: false, message: "Username already exists." };
    }
    users.push({ username: newUser, password: newPass });
    saveState();
    return { success: true, message: "User created! Please sign in." };
  };

  (function () {
    let isSignedIn = localStorage.getItem("isSignedIn") === "true";
    let currentUser = localStorage.getItem("currentUser") || "";
    let carts = JSON.parse(localStorage.getItem("carts") || "{}");
    let users = JSON.parse(
      localStorage.getItem("users") ||
        '[{"username":"user1","password":"pass1"}]'
    );

    function saveState() {
      localStorage.setItem("isSignedIn", isSignedIn);
      localStorage.setItem("currentUser", currentUser);
      localStorage.setItem("carts", JSON.stringify(carts));
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Expose public functions globally
    window.Auth = {
      isSignedIn: () => isSignedIn,
      getCurrentUser: () => currentUser,
      getCarts: () => carts,
      handleLoginSubmit: function (mode, username, password) {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          isSignedIn = true;
          currentUser = username;
          saveState();
          return { success: true, message: "Login successful!" };
        } else {
          return { success: false, message: "Invalid username or password." };
        }
      },
      handleRegister: function (newUser, newPass) {
        if (!newUser || !newPass)
          return { success: false, message: "Please fill both fields." };
        if (users.find((u) => u.username === newUser)) {
          return { success: false, message: "Username already exists." };
        }
        users.push({ username: newUser, password: newPass });
        saveState();
        return { success: true, message: "User created! Please sign in." };
      },
    };
  })();

  function submitting() {
    var mode = userTypeEl.value;
    msgEl.style.color = "red";

    if (mode === "admin") {
      var u = document.getElementById("inpUser").value;
      var p = document.getElementById("inpPass").value;
      if (u === admin.username && p === admin.password) {
        isSignedIn = true;
        currentUser = u;

        msgEl.style.color = "green";
        msgEl.textContent = "Admin login successful!";
      } else {
        msgEl.textContent = "Invalid admin credentials.";
      }
    } else if (mode === "user") {
      var u = document.getElementById("inpUser").value;
      var p = document.getElementById("inpPass").value;
      var idFound = false;
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === u && users[i].password === p) {
          idFound = true;
          break;
        }
      }
      if (idFound) {
        isSignedIn = true;
        currentUser = u;

        msgEl.style.color = "green";
        msgEl.textContent = "User login successful!";
        window.location.href = "Home page.html";
      } else {
        msgEl.textContent = "Invalid username or password.";
      }
    } else {
      var nu = document.getElementById("inpNewUser").value;
      var np = document.getElementById("inpNewPass").value;
      if (!nu || !np) {
        msgEl.textContent = "Please fill both.";
        return;
      }
      for (var j = 0; j < users.length; j++) {
        if (users[j].username === nu) {
          msgEl.textContent = "Username already exists.";
          return;
        }
      }

      users.push({ username: nu, password: np });
      msgEl.style.color = "green";
      msgEl.textContent = "User created! Please sign in.";
      userTypeEl.value = "user";
      createContent();
    }
  }
  document.getElementById("submit").addEventListener("click", submitting);
};
