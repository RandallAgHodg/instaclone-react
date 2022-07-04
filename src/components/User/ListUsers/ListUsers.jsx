import { map, size } from "lodash";
import ImageNoFound from "../../../assets/png/avatar.png";
import { Image } from "semantic-ui-react";
import React from "react";
import "./ListUsers.scss";
import { Link } from "react-router-dom";

function ListUsers({ setShow, users }) {
  return (
    <div className="list-users">
      {size(users) === 0 ? (
        <p className="list-users__not-users">Users not found</p>
      ) : (
        map(users, (user, index) => (
          <Link
            onClick={() => setShow(false)}
            key={index}
            to={`/user/${user.username}`}
            className="list-users__user"
          >
            <Image src={user.avatar || ImageNoFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default ListUsers;
