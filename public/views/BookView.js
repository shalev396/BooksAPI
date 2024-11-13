export const bookView = {
  displayBooks(books) {
    let booksHtml = "<h2>Book List</h2><ul>";
    books.forEach((book) => {
      booksHtml += `<li>${book.title} by ${book.author}</li>`;
    });
    booksHtml += "</ul>";

    document.getElementById("content").innerHTML = booksHtml;
  },

  showAddBookForm() {
    document.getElementById("content").innerHTML = `
          <h2>Add a New Book</h2>
          <form id="addBookForm">
              <label for="title">Title:</label>
              <input type="text" id="title" name="title" required><br>

              <label for="author">Author:</label>
              <input type="text" id="author" name="author" required><br>

              <label for="genre">Genre:</label>
              <input type="text" id="genre" name="genre"><br>

              <label for="publishedYear">Published Year:</label>
              <input type="number" id="publishedYear" name="publishedYear"><br>

              <button type="submit">Add Book</button>
          </form>
      `;
  },
};
