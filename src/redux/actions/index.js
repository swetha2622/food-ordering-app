import ACTION_TYPES from "../action_types";
import menuService from "../../services/Menu-Service";
import { push } from "connected-react-router";
import adminService from "../../services/Admin.Service";
export const getMenuItems = (bool) => {
  return {
    type: ACTION_TYPES.FETCH_MENU_DETAILS,
    isLoading: bool,
  };
};

export const getMenuItemsIsSuccess = (payload) => {
  return {
    type: ACTION_TYPES.FETCH_MENU_DETAILS_IS_SUCCESS,
    payload,
  };
};

export const updateCart = (payload) => {
  return {
    type: ACTION_TYPES.UPDATE_CART,
    payload: payload,
  };
};

export const deleteCartItem = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_FROM_CART,
    payload: payload,
  };
};

export const asyncGetMenuItems = () => {
  return (dispatch) => {
    dispatch(getMenuItems(true));
    const getData = async () => {
      const data = await menuService.fetchAllItems();
      // const data = [{"menu_id":1,"menu_name":"Tomato Soup","price":3.99,"menu_group_id":1,"menu_group_name":"Soups","description":"Delicious soup made from fresh tomatoes."},{"menu_id":2,"menu_name":"Rasam","price":3.99,"menu_group_id":1,"menu_group_name":"Soups","description":"Spicy vegetable soup with tamarind sauce."},{"menu_id":3,"menu_name":"Chicken 65","price":9.99,"menu_group_id":3,"menu_group_name":"Appetizers-Non Veg","description":"Marinated chicken fried with spices and curry leaves."},
      // {"menu_id":1,"menu_name":"Tomato Soup","price":3.99,"menu_group_id":1,"menu_group_name":"Soups","description":"Delicious soup made from fresh tomatoes."},{"menu_id":2,"menu_name":"Rasam","price":3.99,"menu_group_id":1,"menu_group_name":"Soups","description":"Spicy vegetable soup with tamarind sauce."},{"menu_id":3,"menu_name":"Chicken 65","price":9.99,"menu_group_id":3,"menu_group_name":"Appetizers-Non Veg","description":"Marinated chicken fried with spices and curry leaves."},
      // {"menu_id":1,"menu_name":"Tomato Soup","price":3.99,"menu_group_id":1,"menu_group_name":"Soups","description":"Delicious soup made from fresh tomatoes."},{"menu_id":2,"menu_name":"Rasam","price":3.99,"menu_group_id":1,"menu_group_name":"Soups","description":"Spicy vegetable soup with tamarind sauce."},{"menu_id":3,"menu_name":"Chicken 65","price":9.99,"menu_group_id":3,"menu_group_name":"Appetizers-Non Veg","description":"Marinated chicken fried with spices and curry leaves."}]
      dispatch(getMenuItems(false));
      dispatch(getMenuItemsIsSuccess(data));
    };
    getData();
  };
};
export const loginSuccess = (payload) => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCSS,
    payload,
  };
};
export const logoutSuccess = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCSS,
  };
};
export const getAllOrdersSuccess = (payload) => {
  return {
    type: ACTION_TYPES.GET_ORDERS,
    payload,
  };
};

export const asyncGetAllOrders = () => {
  return (dispatch) => {
    const getData = async () => {
      const data = await adminService.fetchAllOrders();
      dispatch(getAllOrdersSuccess(data));
    };
    getData();
  };
};
