const MasterModel = require("./master");
const ProductsModel = require("./products/products.model");
const ReviewsModel = require("./reviews/reviews.model");
const OrdersModel = require("./orders/orders.model");

module.exports = {
  masterAPI: new MasterModel(),
  productsAPI: new ProductsModel(),
  reviewsAPI: new ReviewsModel(),
  ordersAPI: new OrdersModel(),
};
