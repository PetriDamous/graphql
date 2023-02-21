import { gql } from "@apollo/client";

// Fragments
const SPEAKER_ATTRIBUTES = gql`
  fragment SpeakerInfo on Speaker {
    id
    bio
    name
    sessions {
      id
      title
    }
  }
`;

const SESSION_ATTRIBUTES = gql`
  fragment SessionInfo on Session {
    id
    title
    description
    day
    level
    room
    startsAt
    speakers {
      id
      name
    }
  }
`;

// Queries
export const SESSIONS = gql`
  query sessions($day: String) {
    sessions(day: $day) {
      ...SessionInfo
    }
  }
  ${SESSION_ATTRIBUTES}
`;

export const SPEAKERS = gql`
  query speakers {
    speakers {
      ...SpeakerInfo
      featured
    }
  }
  ${SPEAKER_ATTRIBUTES}
`;

export const SPEAKER_BY_ID = gql`
  query speakerById($speakerId: ID!) {
    speakerById(id: $speakerId) {
      ...SpeakerInfo
    }
  }
  ${SPEAKER_ATTRIBUTES}
`;

// Mutations
export const FEATURED_SPEAKER = gql`
  mutation markFeatured($speakerId: ID!, $featured: Boolean!) {
    markFeatured(speakerId: $speakerId, featured: $featured) {
      id
      featured
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation createSession($session: SessionInput!) {
    createSession(session: $session) {
      ...SessionInfo
    }
  }
  ${SESSION_ATTRIBUTES}
`;
