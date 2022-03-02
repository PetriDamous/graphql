module.exports = {
  Query: {
    speaker: (parent, { id }, { dataSources: { speakerAPI } }, info) => {
      return speakerAPI.getSpeakerById(id);
    },
    speakers: (parent, args, { dataSources: { speakerAPI } }, info) => {
      return speakerAPI.getSpeakers();
    },
  },
};
