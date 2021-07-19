import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import reducer from "./reducer";
import loginReducer from "./loginReducer";
import adminReducer from "./adminReducer";
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    reducer,
    loginReducer,
    adminReducer,
  });
export default rootReducer;
