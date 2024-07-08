import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const INITIAL_STATE = {
  user: null,
  profile: null,
};

function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };
    case "ADD_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({ appState: appReducer });
export default persistReducer(persistConfig, rootReducer);