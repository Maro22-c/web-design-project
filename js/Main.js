// Main.js

let isSignedIn = localStorage.getItem("isSignedIn") === "true";
let currentUser = localStorage.getItem("currentUser") || "";
let carts = JSON.parse(localStorage.getItem("carts") || "{}");

let users = JSON.parse(
  localStorage.getItem("users") || '[{"username":"user1","password":"pass1"}]'
);

function saveState() {
  localStorage.setItem("isSignedIn", isSignedIn);
  localStorage.setItem("currentUser", currentUser);
  localStorage.setItem("carts", JSON.stringify(carts));
  localStorage.setItem("users", JSON.stringify(users));
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
  } else {
    return { success: false, message: "Invalid username or password." };
  }
};

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
    localStorage.getItem("users") || '[{"username":"user1","password":"pass1"}]'
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
