import React, { useCallback, useState } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { DELETE_AVATAR, GET_USER, UPDATE_AVATAR } from "../../../gql/user.js";
import { useMutation } from "@apollo/client";
import "./AvatarForm.scss";
import { toast } from "react-toastify";

function AvatarForm({ setShowModal, auth: { username } }) {
  const [loading, setLoading] = useState(false);

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username },
        data: {
          getUser: {
            ...getUser,
            avatar: updateAvatar.urlAvatar,
          },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: {
          username,
        },
      });

      const {} = cache.writeQuery({
        query: GET_USER,
        variables: {
          username,
        },
        data: {
          getUser: {
            ...getUser,
            avatar: "",
          },
        },
      });
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];

    try {
      setLoading(true);
      const {
        data: {
          updateAvatar: { status },
        },
      } = await updateAvatar({
        variables: {
          file,
        },
      });
      if (status) {
        setLoading(false);
        setShowModal(false);
      } else {
        setLoading(false);
        toast.warning("Error on updating avatar");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onDeleteAvatar = async () => {
    try {
      const { data } = await deleteAvatar();

      if (!data.deleteAvatar) toast.warning("Error on avatar delete");
      else setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Upload a picture
      </Button>
      <Button onClick={onDeleteAvatar}>Delete current picture </Button>
      <Button onClick={() => setShowModal(false)}>Cancel </Button>
      <input {...getInputProps()} />
    </div>
  );
}

export default AvatarForm;
