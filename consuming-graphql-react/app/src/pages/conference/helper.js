import { SESSIONS } from "./graphql";

export const updateSessions = (cache, { data: { createSession } }) => {
  cache.modify({
    fields: {
      sessions(exisitingSessions = []) {
        const newSession = createSession;
        cache.writeQuery({
          query: SESSIONS,
          data: { newSession, ...exisitingSessions },
        });
      },
    },
  });
};
