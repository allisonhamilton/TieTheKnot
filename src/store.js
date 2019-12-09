import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, login: true, loggedIn: action.loggedIn };
  }
  if (action.type === "logout-success") {
    return { ...state, login: false, loggedIn: action.loggedIn };
  }
  if (action.type === "set-users") {
    return { ...state, users: action.users };
  }
  if (action.type === "edit-profile") {
    return { ...state, toggleEditProfile: action.toggleEditProfile };
  }
  if (action.type === "new-checklist") {
    return { ...state, checklist: action.checklist };
  }
  return state;
};

let store = createStore(
  reducer,
  {
    login: false,
    loggedIn: "",
    users: [],
    toggleEditProfile: false,
    checklist: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
