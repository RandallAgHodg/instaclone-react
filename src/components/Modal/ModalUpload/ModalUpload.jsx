import { useMutation } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { PUBLISH } from "../../../gql/publication.js";

import "./ModalUpload.scss";

function ModalUpload({ show, setShow }) {
  const [fileUpload, setfileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publish] = useMutation(PUBLISH);
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setfileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const onPublish = async () => {
    try {
      setIsLoading(true);
      const { data } = await publish({
        variables: {
          file: fileUpload.file,
        },
      });
      if (!data.publish.status) {
        toast.warning("Error on publish");
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    setfileUpload(null);
    setShow(false);
  };
  return (
    <Modal size="small" open={show} onClose={onClose} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Drag the video that you want to upload</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>
      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url(${fileUpload.preview})` }}
        />
      )}

      {fileUpload && (
        <Button className="btn-upload btn-action" onClick={onPublish}>
          Upload
        </Button>
      )}
      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publishing...</p>
        </Dimmer>
      )}
    </Modal>
  );
}

export default ModalUpload;
