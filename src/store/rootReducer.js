import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import walletTypeReducer from "./walletType/reducer";

const reducer = combineReducers({
  auth: authReducer,
  walletType: walletTypeReducer,
});

export default reducer;
