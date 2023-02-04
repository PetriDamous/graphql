module.exports = (_, __, { dataSources: { productsAPI } }) => {
  return productsAPI.getAllProducts();
};
