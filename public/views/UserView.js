export const userView = {
  showRegistrationForm() {
    document.getElementById("content").innerHTML = `
          <h2>User Registration</h2>
          <form id="registrationForm">
              <label for="fName">First Name:</label>
              <input type="text" id="fName" name="fName" required><br>

              <label for="lName">Last Name:</label>
              <input type="text" id="lName" name="lName" required><br>

              <label for="phoneNumber">Phone Number:</label>
              <input type="text" id="phoneNumber" name="phoneNumber" required><br>

              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required><br>

              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required><br>

              <button type="submit">Register</button>
          </form>
          <div id="registrationResult"></div>
      `;
  },

  showRegistrationResult(message) {
    const resultElement = document.getElementById("registrationResult");
    if (resultElement) {
      resultElement.innerText = message;
    } else {
      console.error('Element with id "registrationResult" not found.');
    }
  },

  showLoginForm() {
    document.getElementById("content").innerHTML = `
          <h2>User Login</h2>
          <form id="loginForm">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required><br>

              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required><br>

              <button type="submit">Login</button>
          </form>
          <div id="loginResult"></div>
      `;
  },
};
