class Orders {
  constructor() {
    this.ordersData = require("./orders.data");
  }

  getAllOrders = () => this.ordersData;

  addNewOrder = (args) => {
    const newOrder = {
      ...args,
    };

    this.ordersData.push(newOrder);

    return newOrder;
  };
}

module.exports = new Orders();
