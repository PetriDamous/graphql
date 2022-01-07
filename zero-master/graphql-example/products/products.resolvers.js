const productsModel = require("./products.model");

module.exports = {
  Query: {
    products: () => {
      return productsModel.getAllProducts();
    },
    productsByPrice: (_, args) => {
      const { min, max } = args;
      return productsModel.getProductsByPrice(min, max);
    },
    product: (_, args) => {
      const { id } = args;
      return productsModel.getProduct(id);
    },
  },
};
