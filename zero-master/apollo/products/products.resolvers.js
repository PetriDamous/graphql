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
  Mutation: {
    addNewProduct: (_, args) => {
      const { id, price, description } = args;

      return productsModel.addNewProduct(id, price, description);
    },

    addNewReview: (_, args) => {
      const { id, rating, comment } = args;

      return productsModel.addNewReview(id, rating, comment);
    },
  },
};
