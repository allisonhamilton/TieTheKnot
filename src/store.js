import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, login: true, usernameLogin: action.usernameLogin };
  }
  if (action.type === "logout-success") {
    return { ...state, login: false, usernameLogin: "" };
  }
};

let store = createStore(
  reducer,
  { login: false, usernameLogin: "", users: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
