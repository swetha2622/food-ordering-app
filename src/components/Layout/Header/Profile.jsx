import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import classes from "./Header.module.css";
import common from "../Content/Content.module.css";
const Profile = (props) => {
  let history = useHistory();

  return (
    <div
      className={common["column-container"]}
      onClick={() => history.push("/login")}
    >
      <div
        className={[classes["user-profile"], common["row-container"]].join(" ")}
      >
        <div className={common["row-container"]}>
          <FaRegUserCircle color="#ffffff" fontSize="2rem" />
        </div>
      </div>
    </div>
  );
};
export default Profile;

const ProfileDetails = (props) => {
  return <div className={classes["user-details"]}></div>;
};
