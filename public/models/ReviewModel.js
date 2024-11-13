export const reviewModel = {
  async addReview(bookId, reviewData) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/books/${bookId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Adding review failed:", error);
      throw error;
    }
  },
};
