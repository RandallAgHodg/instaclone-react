import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import ModalPublication from "../../Modal/ModalPublication/";
import "./PreviewPublications.scss";

function PreviewPublications({ publication }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div onClick={() => setShowModal(true)} className="preview-publication">
        <Image className="preview-publication__image" src={publication.file} />
      </div>
      <ModalPublication
        show={showModal}
        setShow={setShowModal}
        publication={publication}
      />
    </>
  );
}

export default PreviewPublications;
