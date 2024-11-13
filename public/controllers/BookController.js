import { bookModel } from "../models/bookModel.js";
import { bookView } from "../views/bookView.js";

export const bookController = {
  async init() {
    try {
      const books = await bookModel.fetchBooks();
      bookView.displayBooks(books);
    } catch (error) {
      console.error("Failed to display books:", error);
    }
  },

  addBookForm() {
    bookView.showAddBookForm();
    document
      .getElementById("addBookForm")
      .addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh
        this.handleAddBook(event);
      });
  },

  async handleAddBook(event) {
    event.preventDefault(); // Prevents the page from reloading

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const publishedYear = parseInt(
      document.getElementById("publishedYear").value
    );

    const userId = localStorage.getItem("userId"); // Retrieve the logged-in user’s ID
    if (!userId) {
      alert("You must be logged in to add a book.");
      return;
    }

    const bookData = { title, author, genre, publishedYear, createdBy: userId };

    try {
      const result = await bookModel.addBook(bookData);
      if (result && !result.error) {
        alert("Book added successfully");
        this.init(); // Reload book list after adding a new book
      } else {
        console.error("Server error:", result.error);
        alert("Failed to add book");
      }
    } catch (error) {
      console.error("Failed to add book:", error);
      alert("Failed to add book");
    }
  },
};
