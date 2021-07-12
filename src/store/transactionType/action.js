import { notification } from "antd";
import apiClient from "../../config/apiClient";

export const TRANSACTION_TYPE_API_REQUEST =
  "@TRANSACTION_TYPE/TRANSACTION_TYPE_API_REQUEST";
export const GET_TRANSACTION_TYPE_LIST =
  "@TRANSACTION_TYPE/GET_TRANSACTION_TYPE_LIST";
export const GET_TRANSACTION_TYPE_LIST_REQUEST =
  "@TRANSACTION_TYPE/GET_TRANSACTION_TYPE_LIST_REQUEST";
export const CREATE_TRANSACTION_TYPE_SUCCESS =
  "@TRANSACTION_TYPE/CREATE_TRANSACTION_TYPE_SUCCESS";
export const TRANSACTION_TYPE_API_FAILURE =
  "@TRANSACTION_TYPE/TRANSACTION_TYPE_API_FAILURE";
export const UPDATE_TRANSACTION_TYPE_SUCCESS =
  "@TRANSACTION_TYPE/UPDATE_TRANSACTION_TYPE_SUCCESS";
export const DELETE_TRANSACTION_TYPE_SUCCESS =
  "@TRANSACTION_TYPE/DELETE_TRANSACTION_TYPE_SUCCESS ";

export const createTransType = (payload) => async (dispatch) => {
  dispatch({ type: TRANSACTION_TYPE_API_REQUEST });
  try {
    const { data } = await apiClient.post(
      "/transtype/create-transtype",
      payload
    );
    console.log(data);
    dispatch({
      type: CREATE_TRANSACTION_TYPE_SUCCESS,
      payload: data.data.newObject,
    });
    notification.success({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: TRANSACTION_TYPE_API_REQUEST });
    notification.error({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};

export const getTransType = () => async (dispatch) => {
  dispatch({ type: GET_TRANSACTION_TYPE_LIST_REQUEST });
  try {
    const { data } = await apiClient.get("/transtype/get-all-transtype");
    dispatch({ type: GET_TRANSACTION_TYPE_LIST, payload: data.data.result });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: TRANSACTION_TYPE_API_FAILURE });
    notification.error({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};

export const updateTransType = (payload) => async (dispatch) => {
  dispatch({ type: TRANSACTION_TYPE_API_REQUEST });
  try {
    const { data } = await apiClient.put(
      `/transtype/update-transtype/${payload.idTransType}`,
      payload
    );
    console.log(data);
    dispatch({
      type: UPDATE_TRANSACTION_TYPE_SUCCESS,
      payload: {
        id: payload.idTransType,
        updatedTrans: data.data.updateObject,
      },
    });
    notification.success({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: TRANSACTION_TYPE_API_FAILURE });
    notification.error({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};

export const deleteTransType = (id) => async (dispatch) => {
  dispatch({ type: TRANSACTION_TYPE_API_REQUEST });
  try {
    const { data } = await apiClient.delete(
      `/transtype/delete-transtype/${id}`
    );
    console.log(data);
    dispatch({ type: DELETE_TRANSACTION_TYPE_SUCCESS, payload: id });
    notification.success({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  } catch (error) {
    const { data } = error.response;
    console.log(data);
    dispatch({ type: TRANSACTION_TYPE_API_FAILURE });
    // notification.error({
    //   message: data.data.message,
    //   duration: 3,
    //   onClose: () => notification.destroy(),
    // });
  }
};
