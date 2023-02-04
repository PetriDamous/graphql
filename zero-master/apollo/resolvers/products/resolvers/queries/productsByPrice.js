module.exports = (_, args, { dataSources: { productsAPI } }) => {
  const { min, max } = args;
  return productsAPI.getProductsByPrice(min, max);
};
