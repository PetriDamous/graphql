module.exports = {
  Query: {
    sessions: (parent, args, { dataSources: { sessionAPI } }, info) => {
      return sessionAPI.getSessions(args);
    },
    session: (parent, { id }, { dataSources: { sessionAPI } }, info) => {
      return sessionAPI.getSessionById(id);
    },
  },
};
