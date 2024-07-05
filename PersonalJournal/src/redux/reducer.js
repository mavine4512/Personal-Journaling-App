import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const INITIAL_STATE = {
  user: null,
  nameShameItem: null,
  notification: 0,
  isPortrait: Boolean,
  initialOrientation: Boolean,
  deviceDimension: {},
};

function defaultReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_NOTIFICATION":
      return { ...state, notification: action.payload };
    case "ADD_USER":
      return { ...state, user: action.payload };
    case "NAMESHAME_ITEM":
      return { ...state, nameShameItem: action.payload };
    case "RESET":
      return { ...INITIAL_STATE };
    case "TOAST":
      return { ...state, toast: action.payload };
    case "DEVICE_ORIENTATION":
      return { ...state, isPortrait: action.payload };
    case "DEVICE_DIMENSION":
      return { ...state, deviceDimension: action.payload };
    case "INITIAL_DEVICE_ORIENTATION":
      return { ...state, initialOrientation: action.payload };
    default:
      return state;
  }
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = combineReducers({ appState: defaultReducer });
export default persistReducer(persistConfig, reducer);