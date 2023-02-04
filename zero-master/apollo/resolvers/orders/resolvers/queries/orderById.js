module.exports = (_, { orderId }, { dataSources: { ordersAPI } }) =>
  ordersAPI.getOrderById(orderId);
