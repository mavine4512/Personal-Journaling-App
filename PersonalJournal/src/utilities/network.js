import { Platform, ToastAndroid, Alert } from "react-native";
export const OS_VERSION = Platform.OS === "android" ? "1.0.1" : "1.0.1";
import { BaseUrl as baseUrl } from "./baseUrl";
import axios from "axios";

export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_LOGOUT = "login/logout";
export const API_DASHBOARD = "dashboard/index";
export const API_PROFILE = "user/settings";
export const API_ADDCLEANUPEVENT = "cleanup/add";
export const API_CLEANUPLIST = "cleanup/list";


function networkConfig(action, endpoint = "", data, token = "") {
  const api = axios.create({
    baseURL: baseUrl,
  });
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  switch (action) {
    case "get": {
      return api.get(endpoint);
    }
    case "post": {
      return api.post(endpoint, data);
    }
    default: {
      return null;
    }
  }
}

export const callGet = (url) => {
  return networkConfig("get", url, undefined, "");
};

export const callPost = (url, data, token) => {
  return networkConfig("post", url, data, token);
};
