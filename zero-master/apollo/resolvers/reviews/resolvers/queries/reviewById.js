module.exports = (_, { id }, { dataSources: { reviewsAPI } }) => {
  return reviewsAPI.getReviewById(id);
};
