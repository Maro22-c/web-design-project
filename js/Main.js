// js/Auth.js

// Users stored in array of objects (no localStorage)
const users = [
  { username: "admin", password: "admin123", isAdmin: true },
  { username: "user1", password: "pass1", isAdmin: false }
];

let loggedInUser = null; // current logged in username

// Register function
function register(username, password) {
  if (!username || !password) {
    return { success: false, message: "Please enter username and password." };
  }
  if (users.some(u => u.username === username)) {
    return { success: false, message: "Username already exists." };
  }
  users.push({ username, password, isAdmin: false });
  return { success: true, message: "Registration successful. Please sign in." };
}

// Sign in function
function signIn(username, password) {
  if (!username || !password) {
    return { success: false, message: "Please enter username and password." };
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return { success: false, message: "Invalid username or password." };
  }
  loggedInUser = user;
  return { success: true, message: "Sign in successful.", user };
}

// Sign out
function signOut() {
  loggedInUser = null;
}

// Check if signed in
function isSignedIn() {
  return loggedInUser !== null;
}

// Get current user
function getCurrentUser() {
  return loggedInUser;
}
