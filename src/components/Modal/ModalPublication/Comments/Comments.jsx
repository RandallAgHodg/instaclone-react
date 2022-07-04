import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment.js";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import ImageNoFound from "../../../../assets/png/avatar.png";
import "./Comments.scss";

function Comments({ publicationId }) {
  const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
    variables: {
      publicationId,
    },
  });
  useEffect(() => {
    startPolling(1000);

    return () => stopPolling();
  }, [startPolling, stopPolling]);
  if (loading) return null;
  console.log(data);
  const { getCommentsByPublicationId } = data;
  return (
    <div className="comments">
      {map(getCommentsByPublicationId, (comment, index) => (
        <Link
          key={index}
          className="comment"
          to={`/user/${comment.userId.username}`}
        >
          <Image src={comment.userId.avatar || ImageNoFound} avatar />
          <div className="">
            <p>{comment.userId.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Comments;
