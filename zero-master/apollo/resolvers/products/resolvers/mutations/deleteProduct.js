module.exports = (_, { id }, { dataSources: { productsAPI } }) => {
  return productsAPI.deleteProductById(id);
};
