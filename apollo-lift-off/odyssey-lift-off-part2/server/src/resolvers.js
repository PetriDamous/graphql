module.exports = {
  Query: {
    tracksForHome: (_, __, { dataSources: { trackAPI } }) => {
      return trackAPI.getTracksForHome();
    },
    track: (_, { id }, { dataSources: { trackAPI } }) => {
      return trackAPI.getTrack(id);
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources: { trackAPI } }) => {
      return trackAPI.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources: { trackAPI } }) => {
      return trackAPI.getModulesForTrack(id);
    },
  },
};
