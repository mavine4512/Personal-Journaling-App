import { User } from '@utilities/types'; 

export function addUser(user) {
  return {
    type: "ADD_USER",
    payload: user,
  };
}