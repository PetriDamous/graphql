const { productsDataPath } = require("../../data");
const { v4: uuidv4 } = require("uuid");
const Master = require("../master");
const { updateObject } = require("../../utils");

module.exports = class Products extends Master {
  constructor() {
    super();
    this.productsData = productsDataPath;
  }

  getAllProducts = () => this.getAll(this.productsData);

  getProductById = (id) => this.getById(id, this.productsData);

  getProductsByIds = (ids) => this.getByIds(ids, this.productsData);

  getProductsByPrice = (min, max) =>
    this.getByRange({
      min,
      max,
      compareProp: "price",
      path: this.productsData,
    });

  deleteProductById = (id) => this.delete(id, this.productsData);

  addNewProduct = async (args) => {
    if (!args.image) {
      args.image = "https://source.unsplash.com/random";
    }

    if (!args.description) {
      args.description = "No description";
    }

    const newProduct = {
      ...args,
      id: uuidv4(),
    };

    this.save(newProduct, this.productsData);

    return newProduct;
  };

  updateProduct = async ({ id, input }) => {
    const product = await this.getById(id, this.productsData);

    const updatedProduct = updateObject(product, input);

    this.save(updatedProduct, this.productsData);

    return updatedProduct;
  };
};
