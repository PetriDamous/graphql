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

module.exports = {
  getAllProducts,
};
