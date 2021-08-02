import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./Login.module.css";

import loginService from "../../../../services/Login-Service";
import { useHistory } from "react-router-dom";
import { loginSuccess } from "../../../../redux/actions";
const Login = (props) => {
  const [username, setUserName] = useState();
  let history = useHistory();
  const [password, setPassword] = useState();
  if (props.user.token && props.user.token.length > 0 && props.loggedIn) {
    history.push("/admin");
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const resp = await loginService.authenticate({
      userName: username,
      password: password,
    });
    if (resp && resp.status == "Successful") {
      props.loginSuccess(resp.payload);
      history.push("/admin");
    }
  };
  return (
    <div className={classes["container"]}>
      <div className={classes["content"]}>
        <h1>Please Log In</h1>
        <form >
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className={classes["margin-10"]}>
            <button className={classes["btn-blue"]} type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    loggedIn: state.loginReducer.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (payload) => dispatch(loginSuccess(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
