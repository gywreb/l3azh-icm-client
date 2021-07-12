import { notification } from "antd";
import apiClient from "../../config/apiClient";

export const WALLET_TYPE_API_REQUEST = "@WALLET_TYPE/WALLET_TYPE_API_REQUEST";
export const GET_WALLET_TYPE_LIST = "@WALLET_TYPE/GET_WALLET_TYPE_LIST";
export const CREATE_WALLET_TYPE_SUCCESS =
  "@WALLET_TYPE/CREATE_WALLET_TYPE_SUCCESS";
export const WALLET_TYPE_API_FAILURE = "@WALLET_TYPE/WALLET_TYPE_API_FAILURE";
export const UPDATE_WALLET_TYPE_SUCCESS =
  "@WALLET_TYPE/UPDATE_WALLET_TYPE_SUCCESS";
export const DELETE_WALLET_TYPE_SUCCESS =
  "@WALLET_TYPE/DELETE_WALLET_TYPE_SUCCESS ";

export const createWalletType = (payload) => async (dispatch) => {
  dispatch({ type: WALLET_TYPE_API_REQUEST });
  try {
    const { data } = await apiClient.post(
      "/wallettype/create-wallettype",
      payload
    );
    console.log(data);
    dispatch({
      type: CREATE_WALLET_TYPE_SUCCESS,
      payload: data.data.newObject,
    });
    notification.success({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: WALLET_TYPE_API_FAILURE });
    notification.error({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};

export const getWalletList = () => async (dispatch) => {
  dispatch({ type: WALLET_TYPE_API_REQUEST });
  try {
    const { data } = await apiClient.get("/wallettype/get-all-wallettype");
    dispatch({ type: GET_WALLET_TYPE_LIST, payload: data.data.result });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: WALLET_TYPE_API_FAILURE });
    notification.error({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};

export const updateWalletType = (payload) => async (dispatch) => {
  dispatch({ type: WALLET_TYPE_API_REQUEST });
  try {
    const { data } = await apiClient.put(
      `/wallettype/update-wallettype/${payload.idWalletType}`,
      payload
    );
    console.log(data);
    dispatch({
      type: UPDATE_WALLET_TYPE_SUCCESS,
      payload: {
        id: payload.idWalletType,
        updatedWallet: data.data.updateObejct,
      },
    });
    notification.success({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: WALLET_TYPE_API_FAILURE });
    notification.error({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};

export const deleteWalletType = (id) => async (dispatch) => {
  dispatch({ type: WALLET_TYPE_API_REQUEST });
  try {
    const { data } = await apiClient.delete(
      `/wallettype/delete-wallettype/${id}`
    );
    console.log(data);
    dispatch({ type: DELETE_WALLET_TYPE_SUCCESS, payload: id });
    notification.success({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  } catch (error) {
    const { data } = error.response;
    console.log(data);
    dispatch({ type: WALLET_TYPE_API_FAILURE });
    // notification.error({
    //   message: data.data.message,
    //   duration: 3,
    //   onClose: () => notification.destroy(),
    // });
  }
};
