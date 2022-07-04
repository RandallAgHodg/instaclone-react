import { useQuery } from "@apollo/client";
import { Grid, Image } from "semantic-ui-react";
import React, { useState } from "react";
import { GET_USER } from "../../../gql/user.js";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./Profile.scss";
import UserNotFound from "../../UserNotFound";
import Followers from "./Followers";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import useAuth from "../../../hooks/useAuth.js";
import HeaderProfile from "./HeaderProfile";
import SettingsForm from "../SettingsForm";

function Profile({ username, posts }) {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  if (loading) return null;
  if (error) return <UserNotFound />;

  if (!data.getUser) return null;
  const { name, id, avatar, createdAt, description, email, website } =
    data.getUser;

  const handleModal = (type) => {
    switch (type) {
      case "avatar":
        setTitleModal("Change profile picture");
        setChildrenModal(
          <AvatarForm auth={auth} setShowModal={setShowModal} />
        );
        setShowModal(true);
        break;
      case "settings":
        setTitleModal("");
        setChildrenModal(
          <SettingsForm
            getUser={data.getUser}
            refetch={refetch}
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
            setChildrenModal={setChildrenModal}
          />
        );
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image
            src={avatar ? avatar : ImageNoFound}
            avatar
            onClick={() => username === auth.username && handleModal("avatar")}
          />
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
          <HeaderProfile
            handleModal={handleModal}
            username={username}
            auth={auth}
          />
          <Followers username={username} posts={posts} />
          <div className="other">
            <p className="name">{name}</p>
            {website && (
              <a href={website} className="website" target="_blank">
                {website}
              </a>
            )}
            {description && <p className="description">{description}</p>}
          </div>
        </Grid.Column>
      </Grid>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}

export default Profile;
