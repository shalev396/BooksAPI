import { userController } from "./controllers/userController.js";
import { bookController } from "./controllers/bookController.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("showRegister")
    .addEventListener("click", userController.showRegistrationForm);
  document
    .getElementById("showLogin")
    .addEventListener("click", userController.showLoginForm);

  // Event listeners for book actions
  document
    .getElementById("viewBooks")
    .addEventListener("click", () => bookController.init());
  document
    .getElementById("addBook")
    .addEventListener("click", () => bookController.addBookForm());
});
