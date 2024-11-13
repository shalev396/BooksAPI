export const bookModel = {
  async fetchBooks() {
    try {
      const response = await fetch("http://localhost:3006/api/books"); // Check if the port matches your backend server's port
      return await response.json();
    } catch (error) {
      console.error("Fetching books failed:", error);
      throw error;
    }
  },

  async addBook(bookData) {
    try {
      const response = await fetch("http://localhost:3006/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData), // Ensure `bookData` is correctly structured
      });
      return await response.json();
    } catch (error) {
      console.error("Adding book failed:", error);
      throw error;
    }
  },
};
