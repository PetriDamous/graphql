module.exports = {
  Query: {
    tracksForHome: (_, __, { dataSources: { trackAPI } }) => {
      console.log(trackAPI);
      return trackAPI.getTracksForHome();
    },
  },
  Track: {
    author: ({ authorId }, __, { dataSources: { trackAPI } }) => {
      return trackAPI.getAuthor(authorId);
    },
  },
};
