const Query = require("./resolvers/query");
const Session = require("./resolvers/session");
const Speaker = require("./resolvers/speaker");

// Resolver Map
module.exports = {
  Query,
  Mutation: {
    addNewSession: (parent, args, { dataSources }, info) => {
      return dataSources.sessionAPI.addNewSession(args);
    },
    toggleFavSession: (parent, { id }, { dataSources }, info) => {
      return dataSources.sessionAPI.toggleFavSession(id);
    },
  },
  Session,
  Speaker,
};

// TODO

/**
 *
 *
 *
 *
 *
 * 3. Modulize Mutations
 *
 * 4. Write error handling with try catch block for resolver functions
 * Use the ApolloError contructor. Make sure to document and add to one note.
 * 
 * 5. Add room enums from the enum lesson. Use a resolver to translate the capital enum
 *    values to 
 */
