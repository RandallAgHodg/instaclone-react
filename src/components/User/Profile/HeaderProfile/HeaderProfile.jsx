import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import { FOLLOW, IS_FOLLOW, UNFOLLOW } from "../../../../gql/follow.js";
import "./HeaderProfile.scss";

function HeaderProfile({ handleModal, username, auth }) {
  const { data, loading, error, refetch } = useQuery(IS_FOLLOW, {
    variables: { username },
  });
  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);

  const followUser = async () => {
    const result = await follow({
      variables: {
        username,
      },
    });
    if (result.data.follow) {
      refetch();
    } else {
      toast.error("Error on following user");
    }
  };

  const unfollowUser = async () => {
    const result = await unfollow({
      variables: {
        username,
      },
    });

    if (result.data.unfollow) {
      refetch();
    } else {
      toast.error("Error on unfollowing user");
    }
  };

  const buttonFollow = () => {
    return data.isFollow ? (
      <Button onClick={unfollowUser} className="btn-danger">
        Unfollow
      </Button>
    ) : (
      <Button onClick={followUser} className="btn-action">
        Follow
      </Button>
    );
  };

  return (
    <div className="header-profile">
      <h2>{username}</h2>
      {auth.username === username ? (
        <Button onClick={() => handleModal("settings")}>Settings</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
}

export default HeaderProfile;
