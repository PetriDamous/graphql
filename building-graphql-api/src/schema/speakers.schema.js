const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    speaker(id: ID!): Speaker
    speakers: [Speaker]
  }

  type Speaker {
    id: ID!
    bio: String
    name: String
    sessions: [Session]
  }
`;
