import { notification } from "antd";
import apiClient from "../../config/apiClient";

export const LOGIN_REQUEST = "@AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@AUTH/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@AUTH/LOGIN_FAILURE";

export const login = (payload) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await apiClient.post("/auth/login", payload);
    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
    typeof window !== undefined &&
      window.localStorage.setItem("token", data.data.token);
    notification.success({
      message: data.data.message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  } catch (error) {
    //console.log(error);
    const { data } = error.response;
    console.log(data.data);
    let message = "";
    if (data.data.errors) message = data.data.errors[0].msg;
    else message = data.data.message;
    dispatch({ type: LOGIN_FAILURE });
    notification.error({
      message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};
