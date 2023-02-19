import { gql } from "@apollo/client";

export const GET_SESSIONS = gql`
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
