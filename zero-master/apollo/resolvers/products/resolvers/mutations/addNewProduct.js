module.exports = (_, args, { dataSources: { productsAPI } }) => {
  return productsAPI.addNewReview(args);
};
