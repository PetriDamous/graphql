const products = [
  {
    id: "xbox360",
    price: 350,
    description: "Red ring of death",
  },
  {
    id: "ps5",
    price: 500,
    description: "Pure crap",
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

module.exports = {
  getAllProducts,
  getProduct,
  getProductsByPrice,
};
