const orders = [
  {
    date: "2005-05-05",
    subtotal: 1000,
    items: [
      {
        product: {
          id: "ps5",
          price: 500,
          description: "Was a good system",
        },
        quantity: 2,
      },
    ],
  },
];

const getAllOrders = () => orders;

module.exports = {
  getAllOrders,
};
