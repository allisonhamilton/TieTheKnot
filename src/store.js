import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return {
      ...state,
      loggedIn: action.loggedIn,
      login: action.login
    };
  }
  if (action.type === "logout-success") {
    return {
      ...state,
      login: action.login,
      loggedIn: ""
    };
  }
  if (action.type === "set-users") {
    return { ...state, users: action.users };
  }
  if (action.type === "set-tasks-twelve") {
    return { ...state, listTwelve: action.tasks };
  }
  if (action.type === "set-tasks-eight") {
    return { ...state, listEight: action.tasks };
  }
  if (action.type === "set-tasks-four") {
    return { ...state, listFour: action.tasks };
  }
  if (action.type === "set-tasks-one") {
    return { ...state, listOne: action.tasks };
  }
  if (action.type === "edit-profile") {
    return { ...state, toggleEditProfile: action.toggleEditProfile };
  }
  if (action.type === "add-task") {
    return { ...state, newTaskAdded: true };
  }
  if (action.type === "deleteTaskEight") {
    return { ...state, listEight: action.deleted };
  }
  if (action.type === "deleteTaskFour") {
    return { ...state, listFour: action.deleted };
  }
  if (action.type === "deleteTaskOne") {
    return { ...state, listOne: action.deleted };
  }
  if (action.type === "deleteTaskTwelve") {
    return { ...state, listTwelve: action.deleted };
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
    listTwelve: [],
    listEight: [],
    listFour: [],
    listOne: [],
    newTaskAdded: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
