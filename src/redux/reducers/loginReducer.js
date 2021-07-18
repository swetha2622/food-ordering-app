import ACTION_TYPES from "../action_types";
const user = {
  firstName: localStorage.getItem("firstName")
    ? localStorage.getItem("firstName")
    : "",
  lastName: localStorage.getItem("lastName")
    ? localStorage.getItem("lastName")
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
    case ACTION_TYPES.LOGIN_SUCCSS:
      let user = {
        firstName: action.payload.lastName,
        lastName: action.payload.lastName,
        token: action.payload.jwt,
      };

      localStorage.setItem("firstName", action.payload.firstName);
      localStorage.setItem("lastName", action.payload.lastName);
      localStorage.setItem("token", action.payload.jwt);
      return {
        ...state,
        user: user,
        loggedIn: true,
      };
    case ACTION_TYPES.LOGOUT_SUCCESS:
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
