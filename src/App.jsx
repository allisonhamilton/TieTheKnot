import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import MainPage from "./MainPage.jsx";
import Dashboard from "./Dashboard.jsx";
import Profile from "./Profile.jsx";
import Checklist from "./Checklist.jsx";
import "./app.css";

class UnconnectedApp extends Component {
  mainPageRender = () => {
    return <MainPage />;
  };
  loginPageRender = () => {
    return <Login />;
  };
  signupPageRender = () => {
    return <Signup />;
  };
  profilePageRender = routerData => {
    let userId = routerData.match.params.pid;
    let user = this.props.users.find(user => {
      return user._id === userId
    });
    return <Profile user={user}/>;
  };
  checklistPageRender = () => {
    return <Checklist />;
  };
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Dashboard />
          <Route exact={true} path="/" render={this.mainPageRender} />
          <Route exact={true} path="/login" render={this.loginPageRender} />
          <Route exact={true} path="/signup" render={this.signupPageRender} />
          <Route
            exact={true}
            path="/profile/:pid"
            render={this.profilePageRender}
          />
          <Route
            exact={true}
            path="/checklist"
            render={this.checklistPageRender}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  console.log("state in app", state);
  return {
    users: state.users,
    loggedIn: state.loggedIn,
    login: state.login
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
