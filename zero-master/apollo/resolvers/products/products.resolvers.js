module.exports = {
  Query: {
    allProducts: require("./resolvers/queries/allProducts"),
    productById: require("./resolvers/queries/productById"),
    productsByPrice: require("./resolvers/queries/productsByPrice"),
  },
  Mutation: {
    addNewProduct: require("./resolvers/mutations/addNewProduct"),
    deleteProduct: require("./resolvers/mutations/deleteProduct"),
    updateProduct: require("./resolvers/mutations/updateProduct"),
  },
  Product: {
    reviews: require("./resolvers/chains/reviews"),
  },
};
