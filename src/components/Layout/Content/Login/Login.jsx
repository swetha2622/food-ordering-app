import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./Login.module.css";

import loginService from "../../../../services/Login-Service";
import { useHistory } from "react-router-dom";
import { loginSuccess } from "../../../../redux/actions";
import { red } from "@material-ui/core/colors";
const Login = (props) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  let history = useHistory();
  if (props.user.token && props.user.token.length > 0 && props.loggedIn) {
    history.push("/admin");
  }
  const handleValidation = () => {
    let validationSuccess = true;
    if(username === '' || password === '') {
      validationSuccess = false;
    } 
    return validationSuccess;
  }
  const handleSubmit = async (evt) => {
    setLoginError(false);
    evt.preventDefault();
    if(handleValidation()) {
      const resp = await loginService.authenticate({
        userName: username,
        password: password,
      });
      if (resp && resp.status === "Successful") {
        props.loginSuccess(resp.payload);
        history.push("/admin");
      } else if (resp && (resp.status === "403" || resp.status === 'error') ){
        setLoginError(true);
        setErrorMessage('Login failed. Please try again.');
      } 
    } else {
      setLoginError(true);
      setErrorMessage('Enter the credentials.');
    }
  };
  return (
    <div className={classes["container"]}>
      <div className={classes["content"]}>
        <h1>Please Log In</h1>
        <form >
          <label>
            <p>Username</p>
            <input 
            type="text" 
            onChange={(e) => setUserName(e.target.value)} 
            value={username}/>
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <div className={classes["margin-10"]}>
            <button className={classes["btn-blue"]} type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div>
          {loginError && <div style={{color: 'red', fontSize: '10px'}}>{errorMessage}</div>}  
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
