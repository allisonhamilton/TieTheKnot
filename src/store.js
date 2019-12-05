import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, login: true, loggedIn: action.loggedIn };
  }
  if (action.type === "logout-success") {
    return { ...state, login: false, loggedIn: action.loggedIn };
  }

  return state;
};

let store = createStore(
  reducer,
  { login: false, loggedIn: "", users: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
