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

// Queries
export const SESSIONS = gql`
  query sessions($day: String) {
    sessions(day: $day) {
      id
      title
      day
      room
      level
      startsAt
    }
  }
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
export const TOGGLE_FAV_SESSION = gql`
  mutation toggleFavoriteSession($speakerId: ID!) {
    toggleFavoriteSession(sessionId: $speakerId) {
      favorites {
        id
        title
      }
    }
  }
`;
