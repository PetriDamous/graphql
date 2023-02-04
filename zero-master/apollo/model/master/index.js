const connector = require("../../connector");
const { filteredDuplicateIds } = require("../../utils");

module.exports = class Master {
  getAll = async (path) => {
    const allItems = await connector.get(path);

    return allItems.data || [];
  };

  getById = async (id, path) => {
    const allItems = await this.getAll(path);

    return allItems.find((item) => item.id === id) || null;
  };

  getByIds = async (ids, path) => {
    const allItems = await this.getAll(path);

    return ids.map((id) => allItems.find((item) => item.id === id));
  };

  getByRange = async ({ min, max, compareProp, path }) => {
    if (min > max) return new Error("Max cannot be more than min.");

    const allItems = await this.getAll(path);

    return allItems.filter(
      (item) => item[compareProp] >= min && item[compareProp] <= max
    );
  };

  save = async (obj, path) => {
    const allItems = await this.getAll(path);

    const updatedAllItems = { data: filteredDuplicateIds(obj, allItems) };

    connector.save(updatedAllItems, path);
  };

  delete = async (id, path) => {
    let deletedItem;

    const allItems = await this.getAll(path);

    const filteredAllItems = allItems.filter((item) => {
      if (id === item.id) {
        deletedItem = item;
      }
      return item.id !== id;
    });

    connector.save({ data: filteredAllItems }, path);

    return deletedItem;
  };
};
