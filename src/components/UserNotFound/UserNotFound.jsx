import React from "react";
import { Link } from "react-router-dom";
import "./UserNotFound.scss";

function UserNotFound() {
  return (
    <div className="user-not-found">
      <p>User not found</p>
      <p>Is posible that the link was incorrect or user was removed</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default UserNotFound;
