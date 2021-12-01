import { LOCATION_CHANGE } from 'connected-react-router';
import ACTION_TYPES from "../action_types";
const user = {
  firstName: localStorage.getItem("firstName")
    ? localStorage.getItem("firstName")
    : "",
  lastName: localStorage.getItem("lastName")
    ? localStorage.getItem("lastName")
    : "",
    userName: localStorage.getItem("userName")
    ? localStorage.getItem("userName")
    : "",
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
};
const initialState = {
  user: user,
  loading: false,
  loggedIn: user.token.length > 0 ? true : false,
};
const loginReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case LOCATION_CHANGE: {
      console.log(action);
      if(action.payload.location.pathname === '/') {
        localStorage.clear();
        return {
          ...state,
          loggedIn: false,
        };
      } else 
      return state;
    }
    case ACTION_TYPES.LOGIN_SUCCSS:
      let user = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        token: action.payload.jwt,
      };

      localStorage.setItem("firstName", action.payload.firstName);
      localStorage.setItem("lastName", action.payload.lastName);
      localStorage.setItem("userName", action.payload.userName);
      localStorage.setItem("token", action.payload.jwt);
      return {
        ...state,
        user: user,
        loggedIn: true,
      };
    case ACTION_TYPES.LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
