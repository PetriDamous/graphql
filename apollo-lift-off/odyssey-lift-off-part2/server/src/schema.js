const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    tracksForHome: [Track!]!
    "Returns a specific track based on ID"
    track(id: ID!): Track
  }

  type Mutation {
    incrementTrackViews(trackId: ID!): IncrementTrackViewsResponse!
  }

  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main Author"
    author: Author!
    "The track's illustration to display in track card or track page detail"
    thumbnail: String
    "The track's approximate length to complete, in minutes"
    length: Int
    "The number of modules this track contains"
    modulesCount: Int
    "Description of Track"
    description: String
    "Number of times Track has been viewed"
    numberOfViews: Int
    "List of modules for a track"
    modules: [Module!]!
  }

  "Module for a track"
  type Module {
    id: ID!
    "Title of module"
    title: String!
    "Module's approximate length to complete, in minutes"
    length: Int
  }

  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture"
    photo: String
  }
`;
