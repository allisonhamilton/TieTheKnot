import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, login: action.login };
  }
  if (action.type === "logout-success") {
    return { ...state, login: false, userLoggedIn: action.userLoggedIn };
  }
};

let store = createStore(
  reducer,
  { login: false, userLoggedIn: "", users: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
