import ACTION_TYPES from '../action_types';
const initialState = {
    menuItems: [],
    menuItemsLoading: true,
    cartItems: []
}
const reducer = (state = initialState, action) => {
console.log(action);
    switch (action.type) {
      case ACTION_TYPES.FETCH_MENU_DETAILS:
        return {
          ...state,
          menuItemsLoading: true
        };
      case ACTION_TYPES.FETCH_MENU_DETAILS_IS_SUCCESS:
        return {
          ...state,
          menuItemsLoading: false,
          menuItems: action.payload
        };
      case ACTION_TYPES.UPDATE_CART:
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload]
        };
      default:
        return state;
    }
  };

  export default reducer;