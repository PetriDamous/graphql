module.exports = (_, { min, max }, { dataSources: { ordersAPI } }) =>
  ordersAPI.getOrdersBySubTotal(min, max);
