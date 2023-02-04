module.exports = (_, args, { dataSources: { productsAPI } }) => {
  return productsAPI.updateProduct(args);
};
