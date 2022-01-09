const products = [
  {
    id: "xbox360",
    price: 350,
    description: "Red ring of death",
    reviews: [],
  },
  {
    id: "ps5",
    price: 500,
    description: "Pure crap",
    reviews: [],
  },
];

const getAllProducts = () => products;

const getProduct = (id) => {
  return products.find((product) => product.id === id);
};

const getProductsByPrice = (min, max) => {
  return products.filter(
    (product) => product.price >= min && product.price <= max
  );
};

const addNewProduct = (id, price, description) => {
  const newProduct = {
    id,
    price,
    description,
    reviews: [],
  };

  products.push(newProduct);

  return newProduct;
};

const addNewReview = (id, rating, comment) => {
  const product = getProduct(id);

  if (product) {
    const newReview = {
      rating,
      comment,
    };

    product.reviews.push(newReview);

    return newReview;
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getProductsByPrice,
  addNewProduct,
  addNewReview,
};
