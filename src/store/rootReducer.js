import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import walletTypeReducer from "./walletType/reducer";
import transTypeReducer from "./transactionType/reducer";

const reducer = combineReducers({
  auth: authReducer,
  walletType: walletTypeReducer,
  transType: transTypeReducer,
});

export default reducer;
