const connector = require("../../connector");
const Master = require("../master");
const { ordersDataPath } = require("../../data");
const { v4: uuidv4 } = require("uuid");

class Orders extends Master {
  constructor() {
    super();
    this.ordersData = ordersDataPath;
  }

  getAllOrders = () => this.getAll(this.ordersData);

  getOrderById = async (id) => {
    const result = await this.getById(id, this.ordersData);

    return result;
  };

  getOrdersBySubTotal = (min, max) =>
    this.getByRange({
      min,
      max,
      compareProp: "subtotal",
      path: this.ordersData,
    });

  getOrdersByDate = (min, max) =>
    this.getByRange({ min, max, compareProp: "date", path: this.ordersData });

  getOrdersByTotalQuantity = (min, max) =>
    this.getByRange({
      min,
      max,
      compareProp: "totalQuantity",
      path: this.ordersData,
    });

  createOrder = ({ itemQuantities, productsData, ...rest }) => {
    const newOrder = {
      id: uuidv4(),
      ...rest,
      items: productsData.map(({ id, price }, idx) => {
        return {
          product: {
            id,
            price,
          },
          quantity: itemQuantities[idx],
        };
      }),
    };

    this.save(newOrder, this.ordersData);

    return newOrder;
  };

  updateOrder = async ({
    orderId,
    existingProductIds,
    existingItemQuantities,
    newProductsData,
    ...rest
  }) => {
    const order = await this.getById(orderId, this.ordersData);

    const updatedOrder = {
      ...order,
      ...rest,
      items: order.items.map((item, idx) => {
        return {
          ...item,
          quantity: existingItemQuantities[idx],
        };
      }),
    };

    if (newProductsData) {
      updatedOrder.items = [...updatedOrder.items, ...newProductsData];
    }

    this.save(updatedOrder, this.ordersData);

    return updatedOrder;
  };

  deleteOrder = (orderId) => this.delete(orderId, this.ordersData);
}

module.exports = Orders;
