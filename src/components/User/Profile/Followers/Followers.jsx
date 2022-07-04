import { useQuery } from "@apollo/client";
import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { GET_FOLLOWERS, GET_FOLLOWEDS } from "../../../../gql/follow.js";
import Modal from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers/ListUsers.jsx";
import "./Followers.scss";

function Followers({ username, posts }) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [modalChildren, setModalChildren] = useState(null);
  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: {
      username,
    },
  });

  const {
    data: dataFolloweds,
    loading: loadingFolloweds,
    startPolling: startPollingFolloweds,
    stopPolling: stopPollingFolloweds,
  } = useQuery(GET_FOLLOWEDS, {
    variables: {
      username,
    },
  });

  useEffect(() => {
    startPollingFolloweds(1000);
    startPollingFollowers(1000);
    return () => {
      stopPollingFolloweds();
      stopPollingFollowers();
    };
  }, [
    startPollingFollowers,
    stopPollingFollowers,
    startPollingFolloweds,
    stopPollingFolloweds,
  ]);

  if (loadingFollowers || loadingFolloweds) return null;

  const { getFollowersByUsername: followers } = dataFollowers;
  const { getFollowedsByUsername: followeds } = dataFolloweds;

  const openFollowers = () => {
    setTitleModal("Followers");
    setModalChildren(<ListUsers users={followers} setShow={setShowModal} />);
    setShowModal(true);
  };

  const openFolloweds = () => {
    setTitleModal("Followeds");
    setModalChildren(<ListUsers users={followeds} setShow={setShowModal} />);
    setShowModal(true);
  };

  return (
    <>
      <div className="followers">
        <p>
          <span>{size(posts)}</span> posts
        </p>
        <p onClick={openFollowers} className="link">
          <span>{size(followers)}</span> followers
        </p>
        <p onClick={openFolloweds} className="link">
          <span>{size(followeds)}</span> following
        </p>
      </div>
      <Modal setShow={setShowModal} show={showModal} title={titleModal}>
        {modalChildren}
      </Modal>
    </>
  );
}

export default Followers;
