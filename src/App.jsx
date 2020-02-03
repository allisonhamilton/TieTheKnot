import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import MainPage from "./MainPage.jsx";
import Dashboard from "./Dashboard.jsx";
import Profile from "./Profile.jsx";
import Checklist from "./Checklist.jsx";
import TaskDescription from "./TaskDescription.jsx";
import "./app.css";

class UnconnectedApp extends Component {
  componentDidMount = () => {
    let updateUsers = async () => {
      let response = await fetch("/allusers");
      let responseBody = await response.text();
      let body = JSON.parse(responseBody);
      this.props.dispatch({ type: "set-users", users: body.user });
    };
    setInterval(updateUsers, 100);
  };
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
    let userId = routerData.match.params._id;

    let user = this.props.users.filter(user => {
      return user._id === userId;
    });

    return <Profile user={user[0]} />;
  };
  checklistPageRender = () => {
    return <Checklist />;
  };
  checklistDescriptionPageRender = routerData => {
    let checklistItem = routerData.match.params.item;

    return <TaskDescription />;
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
            path="/profile/:_id"
            render={this.profilePageRender}
          />
          <Route
            exact={true}
            path="/checklist"
            render={this.checklistPageRender}
          />
          <Route
            exact={true}
            path="/checklist/description/:item"
            render={this.checklistDescriptionPageRender}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return {
    users: state.users,
    loggedIn: state.loggedIn,
    login: state.login,
    toggleEditProfile: state.toggleEditProfile
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
