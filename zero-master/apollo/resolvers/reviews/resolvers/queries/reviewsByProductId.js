module.exports = (_, { productId }, { dataSources: { reviewsAPI } }) => {
  return reviewsAPI.getReviewsForProduct(productId);
};
