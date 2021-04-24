import * as authActions from "./action";

const initialState = {
  token: null,
  loading: false,
  error: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case authActions.LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        error: false,
        loading: false,
      };
    }
    case authActions.LOGIN_FAILURE: {
      return { ...state, token: null, error: true, loading: false };
    }
    default:
      return state;
  }
}
