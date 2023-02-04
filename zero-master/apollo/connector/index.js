const fs = require("fs");

module.exports = {
  save: (data, file) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  },
  get: (file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          return reject(err);
        }

        const returnData = JSON.parse(data);

        resolve(returnData);
      });
    });
  },
};
