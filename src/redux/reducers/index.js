import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import reducer from "./reducer";
import loginReducer from "./loginReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    reducer,
    loginReducer,
  });
export default rootReducer;
