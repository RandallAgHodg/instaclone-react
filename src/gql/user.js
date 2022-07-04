import { gql } from "@apollo/client";

const REGISTER = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
      id
      name
      username
      email
      createdAt
    }
  }
`;

const LOGIN = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      token
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    getUser(id: $id, username: $username) {
      id
      name
      username
      email
      createdAt
      description
      website
      avatar
    }
  }
`;

const UPDATE_AVATAR = gql`
  mutation updateAvatar($file: Upload!) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }
`;

const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput) {
    updateUser(input: $input)
  }
`;

const SEARCH = gql`
  query search($search: String) {
    search(search: $search) {
      name
      username
      avatar
    }
  }
`;

export {
  REGISTER,
  LOGIN,
  GET_USER,
  UPDATE_AVATAR,
  DELETE_AVATAR,
  UPDATE_USER,
  SEARCH,
};
