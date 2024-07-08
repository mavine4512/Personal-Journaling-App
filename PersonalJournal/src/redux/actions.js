export function addUser(user) {
  return {
    type: "ADD_USER",
    payload: user,
  };
}

export function updateProfile(profile) {
  return {
    type: "UPDATE_PROFILE",
    payload: profile,
  };
}