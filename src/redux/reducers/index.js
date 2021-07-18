import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import reducer from './reducer';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    reducer
  });
export default rootReducer;
