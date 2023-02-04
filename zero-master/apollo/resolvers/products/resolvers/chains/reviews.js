module.exports = ({ id }, _, { dataSources: { reviewsAPI } }) => {
  return reviewsAPI.getReviewsForProduct(id);
};
