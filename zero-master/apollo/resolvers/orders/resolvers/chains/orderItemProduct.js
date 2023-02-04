module.exports = async (obj, _, { dataSources: { productsAPI } }) => {
  const productData = await productsAPI.getProductById(obj.product.id);

  const { price, ...rest } = productData;

  return { ...obj.product, ...rest };
};
