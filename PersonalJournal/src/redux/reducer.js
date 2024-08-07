import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const INITIAL_STATE = {
  user: null,
  journal:null,
};

function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { ...state, user: action.payload };
    case "ADD_USER":
      return { ...state, user: action.payload };
     case "ADD_JOURNAL":
      return { ...state, journal: action.payload };
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