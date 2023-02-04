module.exports = (_, args, { dataSources: { reviewsAPI } }) => {
  return reviewsAPI.updateExistingReview(args);
};
