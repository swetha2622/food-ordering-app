import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./Login.module.css";
import { Button } from '@material-ui/core';
// import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import loginService from "../../../../services/Login-Service";
import { useHistory } from "react-router-dom";
import { loginSuccess } from "../../../../redux/actions";
const Login = (props) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const [signupUsername, setSignupUserName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  
  const [renterpassword, setReenterPassword] = useState('');
  
  const [role, setRole] = useState('customer');
  
  const [signUpError, setSignUpError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setTabValue] = React.useState(0);

  
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


  const handleSignupValidation = () => {
    let validationSuccess = true;
    if(signupUsername === '' || signupPassword === '' || renterpassword === '' ) {
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
        role: role
      });
      if (resp && resp.status === "Successful") {
        props.loginSuccess(resp.payload);
        if(role === 'admin') {
         history.push("/admin");
        } else {
          history.push("/menu");
        }
      } else if (resp && (resp.status === "403" || resp.status === 'error') ){
        setLoginError(true);
        setErrorMessage('Login failed. Please try again.');
      } 
    } else {
      setLoginError(true);
      setErrorMessage('Enter the credentials.');
    }
  };

  const handleSignup = async (evt) => {
    setSignUpError(false);
    evt.preventDefault();
    if(handleSignupValidation()) {
      const resp = await loginService.signup({
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
  }
  return (
    <div className={classes["container"]}>
      <div className={classes["content"]}>

      {/* <Paper className={classes.root}> */}
      <Tabs
        value={value}
        onChange={(evt, value) => setTabValue(value)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Sign In" {...a11yProps(0)}/>
        <Tab label="Sign Up" {...a11yProps(1)} />
      </Tabs>

        <TabPanel value={value} index={0}>
        <form >
          <label for="name">Username </label>
            <input 
            name="name"
            type="text" 
            onChange={(e) => setUserName(e.target.value)} 
            value={username}/>
          <br/>
          <br/>
          <label for="password">Password </label>
            <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
          <br/>
          <br/>
          <label for="role">Role </label>
          <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}> 
            <option selected value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <div className={classes["margin-10"]}>
          <Button 
            color='primary' 
            variant='contained'
            onClick={handleSubmit}>
            Submit
            </Button>
          </div>
          <div>
          {loginError && <div style={{color: 'red', fontSize: '10px'}}>{errorMessage}</div>}  
          </div>
        </form>
        </TabPanel>

        <TabPanel value={value} index={1}>
        {/* <form > */}

        <form >
        <label for="name">Username </label>
            <input 
            name="name"
            type="text" 
            onChange={(e) => setSignupUserName(e.target.value)} 
            value={signupUsername}/>
          <br/>
          <br/>
          <label for="password">Password </label>
            <input
            name="password"
            type="password"
            onChange={(e) => setSignupPassword(e.target.value)}
            value={signupPassword}
            />
          <br/>
          <br/>
          <label for="reenter-password">Reenter Password </label>
            <input
            name="renter-password"
            type="renter-password"
            onChange={(e) => setReenterPassword(e.target.value)}
            value={renterpassword}
            />
          <br/>

          <div className={classes["margin-10"]}>
          <Button 
            color='primary' 
            variant='contained'
            onClick={handleSignup}>
            Submit
            </Button>
          </div>
          <div>
          {signUpError && <div style={{color: 'red', fontSize: '10px'}}>{errorMessage}</div>}  
          </div>
        </form>
          
        {/* </form> */}
        </TabPanel>

      
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}