import { Platform, ToastAndroid, Alert } from "react-native";
import axios from "axios";
import { BaseUrl as baseUrl } from "./baseUrl";

export const OS_VERSION = Platform.OS === "android" ? "1.0.1" : "1.0.1";

export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_JOURNAL_LIST = "/journals/list";
export const API_ADDNEW = "/journal";
export const API_UPDATE = "/update/journal";
export const API_JOURNAL_DELETE = "/delete/journal";
export const API_PROFILE = "/user/settings";

function networkConfig(action, endpoint = "", data = {}, token = "") {
  const api = axios.create({
    baseURL: baseUrl,
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  switch (action) {
    case "get":
      return api.get(endpoint).catch(handleError);
    case "post":
      return api.post(endpoint, data).catch(handleError);
    case "put":
      return api.put(endpoint, data).catch(handleError);
    case "delete":
      return api.delete(endpoint).catch(handleError);
    default:
      return Promise.reject(new Error('Invalid action'));
  }
}

function handleError(error) {
  console.error('Network Error:', error);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Error Response:', error.response.data);
    console.error('Error Status:', error.response.status);
    console.error('Error Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error Request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error Message:', error.message);
  }

  return Promise.reject(error);
}

export const callGet = (url) => {
  return networkConfig("get", url);
};

export const callPost = (url, data, token) => {
  return networkConfig("post", url, data, token);
};

export const callDelete = (url) => {
  return networkConfig('delete', url);
};

export const callUpdate = (url, data, token) => {
  return networkConfig('put', url, data, token); 
};
