const { gql } = require("apollo-server");

// Schema
// type Query is required.
module.exports = gql`
  type Query {
    sessions(sessions: SessionsInput): [Session]
    sessionById(id: ID!): Session
    speakers: [Speaker]
    speakerById(id: ID!): Speaker
  }

  type Mutation {
    addNewSession(addSession: AddSessionInput): Session
    toggleFavSession(id: ID!): Session
  }

  type Session {
    id: ID!
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    favorite: Boolean
    format: String
    track: String
      @deprecated(reason: "Too many sessions do not fit into a single track.")
    level: String
    speakers: [Speaker]
  }

  type Speaker {
    id: ID!
    bio: String
    sessions: [Session]
    name: String
  }

  input AddSessionInput {
    title: String!
    description: String
    startsAt: String
    endsAt: String
  }

  input SessionsInput {
    id: ID
    title: String
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String
    level: String
  }
`;
