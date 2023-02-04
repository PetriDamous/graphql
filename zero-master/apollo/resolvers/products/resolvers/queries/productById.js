module.exports = (_, args, { dataSources: { productsAPI } }) => {
  const { id } = args;
  return productsAPI.getProductById(id);
};
