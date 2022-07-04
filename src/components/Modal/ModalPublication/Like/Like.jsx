import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import {
  ADD_LIKE,
  DELETE_LIKE,
  GET_LIKES,
  IS_LIKED,
} from "../../../../gql/like.js";
import "./Like.scss";
function Like({ publication }) {
  const [loadingAction, setLoadingAction] = useState(false);
  const { data, loading, refetch } = useQuery(IS_LIKED, {
    variables: {
      publicationId: publication.id,
    },
  });
  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(GET_LIKES, {
    variables: {
      publicationId: publication.id,
    },
  });
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const onAddLike = async () => {
    setLoadingAction(true);
    try {
      await addLike({
        variables: {
          publicationId: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteLike = async () => {
    setLoadingAction(true);
    try {
      await deleteLike({
        variables: {
          publicationId: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onAction = () => {
    if (!loadingAction) {
      if (isLiked) {
        onDeleteLike();
      } else {
        onAddLike();
      }
    }
  };

  if (loading || loadingCount) return null;
  const { isLiked } = data;
  return (
    <div className="actions">
      <Icon
        className={isLiked ? "like active" : "like"}
        name={isLiked ? "heart" : "heart outline"}
        onClick={onAction}
      />
      {dataCount.getLikes}
      {dataCount.getLikes === 1 ? " Like" : " Likes"}
    </div>
  );
}

export default Like;
