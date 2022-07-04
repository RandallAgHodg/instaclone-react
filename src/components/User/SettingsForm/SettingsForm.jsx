import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth.js";
import { useApolloClient } from "@apollo/client";
import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm/DescriptionForm.jsx";
import WebsiteForm from "../../WebsiteForm/WebsiteForm.jsx";
function SettingsForm({
  setShowModal,
  setTitleModal,
  setChildrenModal,
  refetch,
  getUser,
}) {
  const navigation = useNavigate();
  const client = useApolloClient();
  const { logout } = useAuth();

  const onChangePassword = () => {
    setTitleModal("Change Password");
    setChildrenModal(<PasswordForm logout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Change email");
    setChildrenModal(
      <EmailForm
        refetch={refetch}
        currentEmail={getUser.email}
        setShowModal={setShowModal}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Change description");
    setChildrenModal(
      <DescriptionForm
        refetch={refetch}
        currentDescription={getUser.description}
        setShowModal={setShowModal}
      />
    );
  };

  const onChangeWebsite = () => {
    setTitleModal("Change website");
    setChildrenModal(
      <WebsiteForm
        refetch={refetch}
        currentWebsite={getUser.website}
        setShowModal={setShowModal}
      />
    );
  };

  const onLogout = () => {
    client.clearStore();
    logout();
    navigation("/");
  };
  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Change password</Button>
      <Button onClick={onChangeEmail}>Change email</Button>
      <Button onClick={onChangeDescription}>Description</Button>
      <Button onClick={onChangeWebsite}>Website</Button>
      <Button onClick={onLogout}>Log out</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </div>
  );
}

export default SettingsForm;
