const ordersModel = require("./orders.model");

module.exports = {
  Query: {
    orders: () => {
      return ordersModel.getAllOrders();
    },
  },
  Mutation: {
    addNewOrder: (_, args) => {
      return ordersModel.addNewOrder(args);
    },
  },
};
