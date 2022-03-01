const sessions = require("../data/sessions.json");
const { DataSource } = require("apollo-datasource");
const _ = require("lodash");
class SessionsAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {}

  getSessions(args) {
    return _.filter(sessions, args);
  }

  getSessionById(id) {
    return _.filter(sessions, { id: +id })[0];
  }
}

module.exports = new SessionsAPI();
