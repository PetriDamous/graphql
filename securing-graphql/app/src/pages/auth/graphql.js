import { gql } from "@apollo/client";

const USER_INFO = gql`
  fragment UserInfo on User {
    id
    email
  }
`;

export const USER_SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      token
      user {
        ...UserInfo
      }
    }
  }
  ${USER_INFO}
`;

export const USER_SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        ...UserInfo
      }
    }
  }
  ${USER_INFO}
`;
