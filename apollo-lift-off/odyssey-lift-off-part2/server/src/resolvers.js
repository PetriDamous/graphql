module.exports = {
  Query: {
    tracksForHome: (_, __, { dataSources: { trackAPI } }) => {
      return trackAPI.getTracksForHome();
    },
    track: (_, args, { dataSources: { trackAPI } }) => {
      const { id } = args;
      return trackAPI.getTrack(id);
    },
  },
  Track: {
    author: ({ authorId }, __, { dataSources: { trackAPI } }) => {
      return trackAPI.getAuthor(authorId);
    },
  },
};
