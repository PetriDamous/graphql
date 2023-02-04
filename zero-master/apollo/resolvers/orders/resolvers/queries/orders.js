module.exports = (_, __, { dataSources: { ordersAPI } }) => {
  return ordersAPI.getAllOrders();
};
