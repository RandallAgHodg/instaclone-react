import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow.js";
import { useQuery } from "@apollo/client";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./UsersNotFolloweds.scss";

function UsersNotFolloweds() {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);
  if (loading) return null;
  const { getNotFolloweds } = data;
  return (
    <div className="not-followeds">
      <h3>Users you can follow</h3>
      {map(getNotFolloweds, (user, index) => (
        <Link
          key={index}
          to={`/user/${user.username}`}
          className="not-followeds__user"
        >
          <Image src={user.avatar || ImageNoFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default UsersNotFolloweds;
