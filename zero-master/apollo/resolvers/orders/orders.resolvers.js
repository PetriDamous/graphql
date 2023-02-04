module.exports = {
  Query: {
    orders: require("./resolvers/queries/orders"),
    orderById: require("./resolvers/queries/orderById"),
    ordersBySubTotal: require("./resolvers/queries/ordersBySubTotal"),
    ordersByDate: require("./resolvers/queries/ordersByDate"),
    ordersByTotalQuantity: require("./resolvers/queries/ordersByTotalQuantity"),
  },
  Mutation: {
    addNewOrder: require("./resolvers/mutations/addNewOrder"),
    updateOrder: require("./resolvers/mutations/modifyOrder"),
  },
  OrderItem: {
    product: require("./resolvers/chains/orderItemProduct"),
  },
};
