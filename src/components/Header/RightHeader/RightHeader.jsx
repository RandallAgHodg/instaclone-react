import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth.js";
import ImageNoFound from "../../../assets/png/avatar.png";
import { decodeToken } from "../../../utils/token.js";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user.js";
import ModalUpload from "../../Modal/ModalUpload";
import "./RightHeader.scss";

function RightHeader() {
  const [appUser, setAppUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username: auth.username,
    },
  });

  if (loading || error) return null;
  const { getUser } = data;

  return (
    <>
      <div className="right-header">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <Icon onClick={() => setShowModal(true)} name="plus" />
        <Link to={`/user/${auth.username}`}>
          <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar />
        </Link>
      </div>
      <ModalUpload show={showModal} setShow={setShowModal} />
    </>
  );
}

export default RightHeader;
