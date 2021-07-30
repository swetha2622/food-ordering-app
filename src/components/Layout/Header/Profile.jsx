import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import classes from "./Header.module.css";
import common from "../Content/Content.module.css";
import { logoutSuccess } from "../../../redux/actions";

const Profile = (props) => {
  let history = useHistory();
  console.log('------history-----',history);
  const logoutUser = () => {
    console.log('logoutUser');
    props.logout();
    history.push('/')
}
  if(props.loggedIn) {
    return <div
          className={common["column-container"]}
          >
          <div
              className={[classes["user-profile"], common["row-container"]].join(" ")}>
              <div className={common["row-container"]}>
              <AiOutlineLogout color="#ffffff" fontSize="2rem" onClick={() => logoutUser()}/>
              </div>
          </div>
          </div>
    } else {
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
    }
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    loggedIn: state.loginReducer.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);