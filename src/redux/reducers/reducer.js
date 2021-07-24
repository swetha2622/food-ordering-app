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
      case ACTION_TYPES.UPDATE_CART:{
          const menuIndex = state.cartItems.findIndex(cartItem => cartItem.menu_id === action.payload.menu_id);
          let updatedCartItems = [...state.cartItems];
          if(menuIndex === -1) {
            updatedCartItems.push(action.payload);
            } else {
              updatedCartItems[menuIndex] = action.payload;
            }
        return {
          ...state,
          cartItems: updatedCartItems
        };
      }
      case ACTION_TYPES.DELETE_FROM_CART : {
        const menuIndex = state.cartItems.findIndex(cartItem => cartItem.menu_id === action.payload.menu_id);
        let updatedCartItems = [...state.cartItems];
        updatedCartItems.splice(menuIndex, 1)
        return {
          ...state,
          cartItems: updatedCartItems
        };
      }
      case ACTION_TYPES.SUBMIT_ORDER:
        return {
          ...state,
          menuItems: [],
          cartItems: []
        };
      default:
        return state;
    }
  };

  export default reducer;