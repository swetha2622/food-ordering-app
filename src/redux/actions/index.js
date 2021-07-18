import ACTION_TYPES from '../action_types';
import menuService from '../../services/Menu-Service';

export const getMenuItems = (bool) => {
  return {
    type: ACTION_TYPES.FETCH_MENU_DETAILS,
    isLoading: bool
  };
};

export const getMenuItemsIsSuccess = (payload) => {
    return {
      type: ACTION_TYPES.FETCH_MENU_DETAILS_IS_SUCCESS,
      payload
    };
};

export const updateCart = (payload) => {
  return {
    type: ACTION_TYPES.UPDATE_CART,
    payload
  };
};

export const asyncGetMenuItems = () => {
  return (dispatch) => {
    dispatch(getMenuItems(true));
    const getData = async () => {
        const data = await menuService.fetchAllItems();
        dispatch(getMenuItems(false));
        dispatch(getMenuItemsIsSuccess(data));
    }
    getData();
    };
};