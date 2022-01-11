class Products {
  constructor() {
    this.productsData = require("./products.data");
  }

  getAllProducts = () => this.productsData;

  getProduct = (id) => {
    return this.productsData.find((product) => product.id === id);
  };

  getProductsByPrice = (min, max) => {
    return this.productsData.filter(
      (product) => product.price >= min && product.price <= max
    );
  };

  addNewProduct = (id, price, description) => {
    const newProduct = {
      id,
      price,
      description,
      reviews: [],
    };

    this.productsData.push(newProduct);

    return newProduct;
  };

  addNewReview = (id, rating, comment) => {
    const product = this.getProduct(id);

    if (product) {
      const newReview = {
        rating,
        comment,
      };

      product.reviews.push(newReview);

      return newReview;
    }
  };
}

module.exports = new Products();
