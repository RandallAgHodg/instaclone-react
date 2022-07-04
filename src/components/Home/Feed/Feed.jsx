import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { GET_FOLLOWEDS_PUBLICATION } from "../../../gql/publication.js";
import Like from "../../Modal/ModalPublication/Like/";
import ImageNoFound from "../../../assets/png/avatar.png";
import { useQuery } from "@apollo/client";
import CommentForm from "../../Modal/ModalPublication/CommentForm/CommentForm.jsx";
import ModalPublication from "../../Modal/ModalPublication/ModalPublication.jsx";
import "./Feed.scss";

function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState(null);
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_FOLLOWEDS_PUBLICATION
  );

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getFollowedsPublications } = data;
  const openPublication = (publication) => {
    setPublicationSelect(publication);
    setShowModal(true);
  };
  return (
    <>
      <div className="feed">
        {map(getFollowedsPublications, (publication, index) => (
          <div key={index} className="feed__box">
            <Link to={`/user/${publication.userId.username}`}>
              <div className="feed__box-user">
                <Image src={publication.userId.avatar || ImageNoFound} avatar />
                <span>{publication.userId.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{
                backgroundImage: `url("${publication.file}")`,
              }}
              onClick={() => openPublication(publication)}
            />
            <div className="feed__box-actions">
              <Like publication={publication} />
            </div>
            <div className="feed__box-form">
              <CommentForm publication={publication} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication
          show={showModal}
          setShow={setShowModal}
          publication={publicationSelect}
        />
      )}
    </>
  );
}

export default Feed;
