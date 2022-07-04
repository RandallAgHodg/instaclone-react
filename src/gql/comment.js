import { gql } from "@apollo/client";

const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      publicationId
      comment
    }
  }
`;

const GET_COMMENTS = gql`
  query getCommentsByPublicationId($publicationId: ID!) {
    getCommentsByPublicationId(publicationId: $publicationId) {
      publicationId
      userId {
        name
        username
        avatar
      }
      comment
      createdAt
    }
  }
`;

export { ADD_COMMENT, GET_COMMENTS };
