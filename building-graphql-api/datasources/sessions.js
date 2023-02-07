const { DataSource } = require("apollo-datasource");
const _ = require("lodash");
const sessions = require("../data/sessions.json");

class SessionAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {}

  addNewSession(args) {
    const newSession = {
      id: Math.floor(Math.random() * 1000),
      ...args.addSession,
    };

    return newSession;
  }

  toggleFavSession(id) {
    const session = _.filter(sessions, { id: parseInt(id) });
    session[0].favorite = !session[0].favorite;
    return session[0];
  }

  getSessions(args) {
    return _.filter(sessions, args);
  }

  getSessionById(id) {
    // lodash filter takes a collection in this case our sessions .json
    // and an object to filter on (can be a function that returns an obj).
    // In this case we pass in the object and want to filter on id.
    // Since our id is string cuz its in .json format we must convert to number.
    const session = _.filter(sessions, { id: parseInt(id) });
    return session[0];
  }

  toggleFavSession(id) {
    const session = _.filter(sessions, { id: parseInt(id) });
    session[0].favorite = !session[0].favorite;
    return session[0];
  }
}

module.exports = SessionAPI;
