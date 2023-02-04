module.exports = (_, { min, max }, { dataSources: { ordersAPI } }) =>
  ordersAPI.getOrdersByTotalQuantity(min, max);
