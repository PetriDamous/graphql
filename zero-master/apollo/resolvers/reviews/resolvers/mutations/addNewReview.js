module.exports = (_, { input }, { dataSources: { reviewsAPI } }) => {
  return reviewsAPI.createReviewForProduct(input);
};
