module.exports = {
  sessions: (speaker, arg, { dataSources }, obj) => {
    const sessions = dataSources.sessionAPI.getSessions();

    return sessions.filter((session) => {
      return session.speakers.find((sessionSpeaker) => {
        return sessionSpeaker.id === speaker.id;
      });
    });
  },
};
