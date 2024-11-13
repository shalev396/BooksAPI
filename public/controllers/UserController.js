import { userModel } from "../models/userModel.js";
import { userView } from "../views/userView.js";

export const userController = {
  showRegistrationForm() {
    userView.showRegistrationForm();
    document
      .getElementById("registrationForm")
      .addEventListener("submit", handleRegistration);
  },

  showLoginForm() {
    userView.showLoginForm();
    document
      .getElementById("loginForm")
      .addEventListener("submit", handleLogin);
  },
};

// Standalone registration handler function
async function handleRegistration(event) {
  event.preventDefault(); // Prevents page refresh

  const fName = document.getElementById("fName").value;
  const lName = document.getElementById("lName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = { fName, lName, phoneNumber, email, password };
  try {
    const result = await userModel.registerUser(userData);
    userView.showRegistrationResult("Registration successful!");
  } catch (error) {
    userView.showRegistrationResult("Registration failed.");
  }
}

// Standalone login handler function
async function handleLogin(event) {
  event.preventDefault(); // Prevents page refresh

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginData = { email, password };
  try {
    const result = await userModel.loginUser(loginData);
    if (result.userId) {
      alert(result.message);
      localStorage.setItem("userId", result.userId); // Store user ID in localStorage
    } else {
      alert("Login failed");
    }
  } catch (error) {
    alert("Login error");
  }
}
