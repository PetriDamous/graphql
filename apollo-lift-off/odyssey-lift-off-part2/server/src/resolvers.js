module.exports = {
  Query: {
    tracksForHome: (_, __, { dataSources: { trackAPI } }) => {
      return trackAPI.getTracksForHome();
    },
    track: (_, { id }, { dataSources: { trackAPI } }) => {
      console.log("track:", id);
      return trackAPI.getTrack(id);
    },
  },
  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources: { trackAPI } }) => {
      try {
        const track = await trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: true,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources: { trackAPI } }) => {
      console.log("author:", authorId);
      return trackAPI.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources: { trackAPI } }) => {
      console.log("modules:", id);
      return trackAPI.getModulesForTrack(id);
    },
  },
};
