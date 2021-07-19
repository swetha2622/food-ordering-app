import ACTION_TYPES from "../action_types";

const initialState = {
  orders: [],
};
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
export default adminReducer;
