import ACTION_TYPES from "../action_types";

const initialState = {
  orders: [],
  getAllOrdersLoading: false
};
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ORDERS:
      return {
        ...state,
        getAllOrdersLoading: false,
        orders: action.payload,
      };
      case ACTION_TYPES.GET_ALL_ORDERS:
        return {
          ...state,
          getAllOrdersLoading: action.isLoading
      };  
    default:
      return state;
  }
};
export default adminReducer;
