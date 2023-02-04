const { reviewsDataPath } = require("../../data");
const connector = require("../../connector");
const { v4: uuidv4 } = require("uuid");
const Master = require("../master");

module.exports = class Reviews extends Master {
  constructor() {
    super();
    this.reviewsData = reviewsDataPath;
  }

  getAllReviews = () => this.getAll(this.reviewsData);

  getReviewById = (id) => this.getById(id, this.reviewsData);

  getReviewsForProduct = async (productId) => {
    const allReviews = await this.getAll(this.reviewsData);

    if (allReviews.length <= 0) return [];

    return allReviews.filter((review) => review.productId === productId) || [];
  };

  createReviewForProduct = async ({ productId, rating, comment }) => {
    const newReview = {
      id: uuidv4(),
      productId,
      rating,
      comment: comment || "No comment",
    };

    this.save(newReview, this.reviewsData);

    return newReview;
  };

  updateExistingReview = async ({ id, rating, comment }) => {
    const allReviews = await this.getAll(this.reviewsData);

    const reviewIdx = allReviews.findIndex((review) => review.id === id);

    if (!rating && !comment) return allReviews[reviewIdx];

    if (rating) allReviews[reviewIdx].rating = rating;

    if (comment) allReviews[reviewIdx].comment = comment;

    this.save(allReviews[reviewIdx], this.reviewsData);

    return allReviews[reviewIdx];
  };

  deleteReviewById = async (reviewId) => {
    const deletedReview = await this.delete(reviewId, this.reviewsData);

    return deletedReview;
  };
};
