const authUtils = require("../utils/auth");

module.exports = {
  createSession: async (parent, args, { dataSources }, info) => {
    const session = await dataSources.sessionDataSource.createSession(
      args.session
    );
    return session;
  },

  toggleFavoriteSession: async (parent, args, { dataSources }, info) => {
    const speaker = await dataSources.sessionDataSource.toggleFavoriteSession(
      args.id
    );
    return speaker;
  },
};
