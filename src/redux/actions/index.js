import ACTION_TYPES from "../action_types";
import menuService from "../../services/Menu-Service";
import adminService from "../../services/Admin.Service";
import userService from "../../services/User.Service";
import { push } from 'connected-react-router';

export const getMenuItems = (bool) => {
  return {
    type: ACTION_TYPES.FETCH_MENU_DETAILS,
    isLoading: bool,
  };
};

export const getAllOrders = (bool) => {
  return {
    type: ACTION_TYPES.GET_ALL_ORDERS,
    isLoading: bool,
  };
};

export const getMenuItemsIsFailure = (bool) => {
  return {
    type: ACTION_TYPES.FETCH_MENU_DETAILS_IS_FAILURE,
    isLoading: bool,
  };
};

export const submitOrder = (bool) => {
  return {
    type: ACTION_TYPES.SUBMIT_ORDER,
    isLoading: bool,
  };
};

export const submitOrderIsSuccess = (bool) => {
  return {
    type: ACTION_TYPES.SUBMIT_ORDER_IS_SUCCESS,
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
      if(data && data.Status !== 'error') {
      dispatch(getMenuItems(false));
      dispatch(getMenuItemsIsSuccess(data));
      } else {
        dispatch(getMenuItems(false));
        // dispatch(getMenuItemsIsFailure(false));
      }
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
    type: ACTION_TYPES.LOGOUT_USER,
  };
};
export const getAllOrdersSuccess = (payload) => {
  return {
    type: ACTION_TYPES.GET_ORDERS,
    payload,
  };
};

export const updateOrderIsSuccess = (payload) => {
  return {
    type: ACTION_TYPES.UPDATE_ORDER_SUCCESS,
    payload,
  };
};


export const fetchOrderStatus = (bool) => {
  return {
    type: ACTION_TYPES.FETCH_ORDER_STATUS,
    isLoading: bool,
  };
};

export const fechOrderStatusSuccess = (payload) => {
  return {
    type: ACTION_TYPES.FETCH_ORDER_STATUS_SUCCESS,
    payload,
  };
};

export const fechOrderStatusFailure = (bool) => {
  return {
    type: ACTION_TYPES.FETCH_ORDER_STATUS_FAILURE,
    isLoading: bool,
  };
};

export const asyncGetAllOrders = () => {
  return (dispatch) => {
    dispatch(getAllOrders(true));
    const getData = async () => {
      const data = await adminService.fetchAllOrders();
      dispatch(getAllOrdersSuccess(data));
      dispatch(getAllOrders(false));
    };
    getData();
  };
};

export const asyncSumbitOrder = (payload, email) => {
  return (dispatch) => {
    dispatch(submitOrder(true));
    const postData = async () => {
      const res = await menuService.submitOrder(payload);
      if(res.Status !== 'error') {
        if(payload.Status === 'cancel') {
          alert('Order has been cancelled succesfully.');
         if(email){
          dispatch(asyncFetchOrderStatus(email))
         }
        }
      else if(payload.Status === 'initial') {
        alert('Order has been placed succesfully.');
        dispatch(push('/'));
      } else {
        alert('Order has been updated succesfully.')
        dispatch(updateOrderIsSuccess(true));
      }
      dispatch(submitOrder(false));
    } else {
      alert('Order updating the order.')
      dispatch(submitOrder(false));
      window.location.reload();
    }
    };
    postData();
  };
};

export const asyncFetchOrderStatus = (emailId) => {
  return (dispatch) => {
    dispatch(fetchOrderStatus(true));
    const getData = async () => {
      const data = await userService.fetchOrderStatus(emailId);
      if(data) {
      dispatch(fechOrderStatusSuccess(data));
      } else {
        dispatch(fechOrderStatusFailure(false));
      }
      dispatch(fetchOrderStatus(false));
    };
    getData();
  };
};