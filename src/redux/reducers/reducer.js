import ACTION_TYPES from '../action_types';

const initialState = {
  menuItems: [
    {
      "ingredients": [
        {
          "ingredientID": 1,
          "ingredientName": "Tomato",
          "availableQuantity": 10,
          "totalQuantity": 100
        },
        {
          "ingredientID": 2,
          "ingredientName": "Onion",
          "availableQuantity": 1000,
          "totalQuantity": 100
        }
      ],
      "menu_id": 1,
      "menu_name": "Tomato Soup",
      "price": 3.99,
      "menu_group_id": 1,
      "menu_group_name": "Soups",
      "description": "Delicious soup made from fresh tomatoes.",
      "totalQuantity": 50,
      "availableQuantity": 39
    },
    {
      "ingredients": [
        {
          "ingredientID": 1,
          "ingredientName": "Tomato",
          "availableQuantity": 10,
          "totalQuantity": 100
        },
        {
          "ingredientID": 3,
          "ingredientName": "Tamarind",
          "availableQuantity": 1000,
          "totalQuantity": 50
        }
      ],
      "menu_id": 2,
      "menu_name": "Rasam",
      "price": 3.99,
      "menu_group_id": 1,
      "menu_group_name": "Soups",
      "description": "Spicy vegetable soup with tamarind sauce.",
      "totalQuantity": 50,
      "availableQuantity": 44
    },
    {
      "ingredients": [
        {
          "ingredientID": 5,
          "ingredientName": "Potato",
          "availableQuantity": 1000,
          "totalQuantity": 100
        },
        {
          "ingredientID": 6,
          "ingredientName": "Peas",
          "availableQuantity": 1000,
          "totalQuantity": 50
        }
      ],
      "menu_id": 3,
      "menu_name": "Samosa",
      "price": 4.99,
      "menu_group_id": 2,
      "menu_group_name": "Appetizers-Veg",
      "description": "Crisp turnovers filled with mildly spiced potatoes and peas.",
      "totalQuantity": 50,
      "availableQuantity": 49
    },
    {
      "ingredients": [
        {
          "ingredientID": 7,
          "ingredientName": "Cauliflower",
          "availableQuantity": 1000,
          "totalQuantity": 200
        },
        {
          "ingredientID": 8,
          "ingredientName": "Rice flour",
          "availableQuantity": 1000,
          "totalQuantity": 100
        }
      ],
      "menu_id": 4,
      "menu_name": "Gobi Manchurian",
      "price": 8.99,
      "menu_group_id": 2,
      "menu_group_name": "Appetizers-Veg",
      "description": "Batter fried cauliflower florets cooked in flavorful Manchurian sauce.",
      "totalQuantity": 50,
      "availableQuantity": 50
    },
    {
      "ingredients": [
        {
          "ingredientID": 2,
          "ingredientName": "Onion",
          "availableQuantity": 1000,
          "totalQuantity": 100
        },
        {
          "ingredientID": 9,
          "ingredientName": "Goat meat",
          "availableQuantity": 1000,
          "totalQuantity": 100
        }
      ],
      "menu_id": 5,
      "menu_name": "Goat Sukka",
      "price": 13.99,
      "menu_group_id": 3,
      "menu_group_name": "Appetizers-Non Veg",
      "description": "Goat cooked in mild sauce and fried.",
      "totalQuantity": 50,
      "availableQuantity": 48
    },
    {
      "ingredients": [
        {
          "ingredientID": 2,
          "ingredientName": "Onion",
          "availableQuantity": 1000,
          "totalQuantity": 100
        },
        {
          "ingredientID": 10,
          "ingredientName": "Chicken",
          "availableQuantity": 1000,
          "totalQuantity": 100
        }
      ],
      "menu_id": 6,
      "menu_name": "Chicken 65",
      "price": 11.99,
      "menu_group_id": 3,
      "menu_group_name": "Appetizers-Non Veg",
      "description": "Marinated chicken fried with spices and curry leaves.",
      "totalQuantity": 50,
      "availableQuantity": 49
    },
    {
      "ingredients": [
        {
          "ingredientID": 1,
          "ingredientName": "Tomato",
          "availableQuantity": 10,
          "totalQuantity": 100
        }
      ],
      "menu_id": 7,
      "menu_name": "Dal Tadaka",
      "price": 10.99,
      "menu_group_id": 4,
      "menu_group_name": "Entrees-Veg",
      "description": "Lentil cooked with fresh spices.",
      "totalQuantity": 50,
      "availableQuantity": 50
    },
    {
      "ingredients": [
        {
          "ingredientID": 10,
          "ingredientName": "Chicken",
          "availableQuantity": 1000,
          "totalQuantity": 100
        },
        {
          "ingredientID": 4,
          "ingredientName": "Rice",
          "availableQuantity": 1000,
          "totalQuantity": 100
        }
      ],
      "menu_id": 8,
      "menu_name": "vijayawada Spl Chicken Biryani(Boneless)",
      "price": 10.99,
      "menu_group_id": 5,
      "menu_group_name": "Biryanis",
      "description": "Boneless Chicken cooked in Basmati rice with special herbs and spices",
      "totalQuantity": 50,
      "availableQuantity": 50
    }
  ],
  menuItemsLoading: true,
  cartItems: [],
  submittedOrder: false,
  orderStatusLoading: false,
  orderStatus: [],
  orderStatusError: false
}
const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ACTION_TYPES.FETCH_MENU_DETAILS:
      return {
        ...state,
        menuItemsLoading: action.isLoading
      };
    case ACTION_TYPES.FETCH_MENU_DETAILS_IS_SUCCESS:
      return {
        ...state,
        menuItemsLoading: action.isLoading,
        // menuItems: action.payload
      };
    case ACTION_TYPES.FETCH_MENU_DETAILS_IS_FAILURE:
      return {
        ...state,
        menuItemsLoading: action.isLoading,
        // menuItems: []
      };
    case ACTION_TYPES.UPDATE_CART: {
      const menuIndex = state.cartItems.findIndex(cartItem => cartItem.menu_id === action.payload.menu_id);
      let updatedCartItems = [...state.cartItems];
      if (menuIndex === -1) {
        updatedCartItems.push(action.payload);
      } else {
        updatedCartItems[menuIndex] = action.payload;
      }
      return {
        ...state,
        cartItems: updatedCartItems
      };
    }
    case ACTION_TYPES.DELETE_FROM_CART: {
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
        cartItems: [],
      };
    case ACTION_TYPES.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        submittedOrderSuccess: action.payload
      };
    case ACTION_TYPES.FETCH_ORDER_STATUS:
      return {
        ...state,
        orderStatusLoading: action.isLoading
      };
    case ACTION_TYPES.FETCH_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        orderStatus: action.payload
      };
    case ACTION_TYPES.FETCH_ORDER_STATUS_FAILURE:
      return {
        ...state,
        orderStatus: [],
        orderStatusError: true
      };
    default:
      return state;
  }
};

export default reducer;