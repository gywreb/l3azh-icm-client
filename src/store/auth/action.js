import { notification } from "antd";
import apiClient from "../../config/apiClient";
import { ROUTES } from "../../constants/routes";

export const LOGIN_REQUEST = "@AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@AUTH/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@AUTH/LOGIN_FAILURE";
export const GET_CURRENT = "@AUTH/GET_CURRENT";
export const LOGOUT = "@AUTH/LOGOUT";

export const getCurrent = (history) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const token = window.localStorage.getItem("token");
    const { data } = await apiClient.get("/account/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GET_CURRENT, payload: { infoShow: data.data, token } });
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } catch (error) {
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

export const login = (payload, history) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await apiClient.post("/auth/login", payload);
    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
    typeof window !== undefined &&
      window.localStorage.setItem("token", data.data.token);
    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.data.token}`;
    history.push("/walletType");
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

export const logout = (history) => (dispatch) => {
  window.localStorage.removeItem("token");
  delete apiClient.defaults.headers.common["Authorization"];
  dispatch({ type: LOGOUT });
  history.push(ROUTES.login);
};
