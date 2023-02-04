module.exports = async (
  _,
  { input },
  { dataSources: { ordersAPI, productsAPI } }
) => {
  const { newProdcutIds, newItemQuantities, ...rest } = input;

  if (newProdcutIds.length > 0) {
    const newProducts = await productsAPI.getProductsByIds(newProdcutIds);

    let newProductsData = newProducts.map((product, idx) => {
      return {
        product: { id: product.id, price: product.price },
        quantity: newItemQuantities[idx],
      };
    });

    return ordersAPI.updateOrder({ ...rest, newProductsData });
  }

  return ordersAPI.updateOrder({ ...rest });
};
