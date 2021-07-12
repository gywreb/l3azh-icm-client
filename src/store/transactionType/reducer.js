import * as transTypeAction from "./action";

const initialState = {
  listLoading: false,
  loading: false,
  list: [],
  error: false,
};

export default function transTypeReducer(state = initialState, action) {
  switch (action.type) {
    case transTypeAction.GET_TRANSACTION_TYPE_LIST_REQUEST: {
      return { ...state, listLoading: true };
    }
    case transTypeAction.TRANSACTION_TYPE_API_REQUEST: {
      return { ...state, loading: true };
    }
    case transTypeAction.TRANSACTION_TYPE_API_FAILURE: {
      return { ...state, loading: false, error: true, listLoading: false };
    }
    case transTypeAction.CREATE_TRANSACTION_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    }
    case transTypeAction.UPDATE_TRANSACTION_TYPE_SUCCESS: {
      const updatedIndex = state.list.findIndex(
        (transType) => transType.idTransType === action.payload.id
      );
      let updatedList = [
        ...state.list.slice(0, updatedIndex),
        action.payload.updatedTrans,
        ...state.list.slice(updatedIndex + 1),
      ];
      return { ...state, loading: false, list: [...updatedList] };
    }
    case transTypeAction.DELETE_TRANSACTION_TYPE_SUCCESS: {
      const filteredList = state.list.filter(
        (transType) => transType.idTransType !== action.payload
      );
      return { ...state, loading: false, list: [...filteredList] };
    }
    case transTypeAction.GET_TRANSACTION_TYPE_LIST: {
      return { ...state, listLoading: false, list: [...action.payload] };
    }
    default:
      return state;
  }
}
