import * as walletTypeActions from "./action";

const initialState = {
  loading: false,
  list: [],
  error: false,
};

export default function walletTypeReducer(state = initialState, action) {
  switch (action.type) {
    case walletTypeActions.WALLET_TYPE_API_REQUEST: {
      return { ...state, loading: true };
    }
    case walletTypeActions.WALLET_TYPE_API_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case walletTypeActions.CREATE_WALLET_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    }
    case walletTypeActions.UPDATE_WALLET_TYPE_SUCCESS: {
      const updatedIndex = state.list.findIndex(
        (walletType) => walletType.idWalletType === action.payload.id
      );
      let updatedList = [
        ...state.list.slice(0, updatedIndex),
        action.payload.updatedWallet,
        ...state.list.slice(updatedIndex + 1),
      ];
      return { ...state, loading: false, list: [...updatedList] };
    }
    case walletTypeActions.DELETE_WALLET_TYPE_SUCCESS: {
      const filteredList = state.list.filter(
        (walletType) => walletType.idWalletType !== action.payload
      );
      return { ...state, loading: false, list: [...filteredList] };
    }
    case walletTypeActions.GET_WALLET_TYPE_LIST: {
      return { ...state, loading: false, list: [...action.payload] };
    }
    default:
      return state;
  }
}
