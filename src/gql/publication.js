import { gql } from "@apollo/client";

const PUBLISH = gql`
  mutation publish($file: Upload!) {
    publish(file: $file) {
      status
      urlFile
    }
  }
`;

const GET_PUBLICATIONS = gql`
  query getPublicationsByUsername($username: String!) {
    getPublicationsByUsername(username: $username) {
      id
      userId
      file
    }
  }
`;

const GET_FOLLOWEDS_PUBLICATION = gql`
  query getFollowedsPublications {
    getFollowedsPublications {
      id
      userId {
        name
        username
        avatar
      }
      file
      typeFile
      createdAt
    }
  }
`;
export { PUBLISH, GET_PUBLICATIONS, GET_FOLLOWEDS_PUBLICATION };
