const sessions = require("../data/sessions.json");
const { DataSource } = require("apollo-datasource");

module.exports = class SessionsAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {}

  getSessions() {
    return sessions;
  }
};
