import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Publications from "../components/Publications/Publications.jsx";
import Profile from "../components/User/Profile";
import { GET_PUBLICATIONS } from "../gql/publication.js";
function User() {
  const { username } = useParams();
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS,
    {
      variables: {
        username,
      },
    }
  );

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  return (
    <div>
      <Profile username={username} posts={data.getPublicationsByUsername} />
      <Publications publications={data.getPublicationsByUsername} />
    </div>
  );
}

export default User;
