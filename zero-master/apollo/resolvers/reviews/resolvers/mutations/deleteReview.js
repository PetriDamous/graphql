module.exports = (_, { reviewId }, { dataSources: { reviewsAPI } }) => {
  return reviewsAPI.deleteReviewById(reviewId);
};
