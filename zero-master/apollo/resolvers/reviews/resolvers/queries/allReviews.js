module.exports = (_, __, { dataSources: { reviewsAPI } }) => {
  return reviewsAPI.getAllReviews();
};
