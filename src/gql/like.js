import { gql } from "@apollo/client";

const ADD_LIKE = gql`
  mutation addLike($publicationId: ID!) {
    addLike(publicationId: $publicationId)
  }
`;

const DELETE_LIKE = gql`
  mutation deleteLike($publicationId: ID!) {
    deleteLike(publicationId: $publicationId)
  }
`;

const IS_LIKED = gql`
  query isLiked($publicationId: ID!) {
    isLiked(publicationId: $publicationId)
  }
`;

const GET_LIKES = gql`
  query getLikes($publicationId: ID!) {
    getLikes(publicationId: $publicationId)
  }
`;

export { ADD_LIKE, DELETE_LIKE, IS_LIKED, GET_LIKES };
