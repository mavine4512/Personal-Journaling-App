export function addUser(user) {
  return {
    type: "ADD_USER",
    payload: user,
  };
}
export function addJournal(journal){
  return { 
    type: "ADD_JOURNAL",
   payload:journal
  }
}

export function updateProfile(profile) {
  return {
    type: "UPDATE_PROFILE",
    payload: profile,
  };
}