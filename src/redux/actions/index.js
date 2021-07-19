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
