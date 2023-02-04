module.exports = async (
  _,
  { input },
  { dataSources: { ordersAPI, productsAPI } }
) => {
  const { productIds, productPrices, ...rest } = input;

  // const products = await productsAPI.getProductsByIds(productIds);

  const productsData = productIds.map((id, idx) => {
    return {
      id,
      price: productPrices[idx],
    };
  });

  return ordersAPI.createOrder({ ...rest, productsData });
};
