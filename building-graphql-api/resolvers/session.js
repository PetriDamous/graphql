module.exports = {
  speakers: async (session, arg, { dataSources }, info) => {
    const speakers = await dataSources.speakerAPI.getSpeakers();

    return speakers.filter((speaker) => {
      return speaker.sessions.find((speakerSession) => {
        return speakerSession.id === session.id;
      });
    });
  },
};
