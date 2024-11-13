export const userModel = {
  async registerUser(userData) {
    try {
      const response = await fetch("http://localhost:3006/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register");
      }

      return await response.json();
    } catch (error) {
      console.error("User registration failed:", error.message);
      throw error;
    }
  },

  async loginUser(loginData) {
    try {
      const response = await fetch("http://localhost:3006/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      return await response.json();
    } catch (error) {
      console.error("User login failed:", error);
      throw error;
    }
  },
};
