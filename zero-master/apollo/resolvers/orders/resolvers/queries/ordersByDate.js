module.exports = (_, { min, max }, { dataSources: { ordersAPI } }) =>
  ordersAPI.getOrdersByDate(min, max);
