module.exports = {
  filteredDuplicateIds: (obj, array) => {
    const filteredArray = array.filter((arrayItem) => arrayItem.id !== obj.id);

    return [...filteredArray, obj];
  },
  updateObject: (obj, updateObj) => {
    const objKeys = Object.keys(obj);

    objKeys.forEach((key) => {
      if (updateObj[key]) obj[key] = updateObj[key];
    });

    return obj;
  },
};
