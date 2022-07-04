import { gql } from "@apollo/client";

const IS_FOLLOW = gql`
  query isFollow($username: String!) {
    isFollow(username: $username)
  }
`;

const FOLLOW = gql`
  mutation follow($username: String!) {
    follow(username: $username)
  }
`;

const UNFOLLOW = gql`
  mutation unfollow($username: String!) {
    unfollow(username: $username)
  }
`;

const GET_FOLLOWERS = gql`
  query getFollowersByUsername($username: String!) {
    getFollowersByUsername(username: $username) {
      name
      username
      id
      avatar
    }
  }
`;

const GET_FOLLOWEDS = gql`
  query getFollowedsByUsername($username: String!) {
    getFollowedsByUsername(username: $username) {
      name
      username
      id
      avatar
    }
  }
`;

const GET_NOT_FOLLOWEDS = gql`
  query getNotFolloweds {
    getNotFolloweds {
      avatar
      username
      name
    }
  }
`;
export {
  IS_FOLLOW,
  FOLLOW,
  UNFOLLOW,
  GET_FOLLOWERS,
  GET_FOLLOWEDS,
  GET_NOT_FOLLOWEDS,
};
