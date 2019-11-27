import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";
import MainPage from "./MainPage.jsx";
import store from "./store.js";
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
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.mainPageRender} />
          <Route exact={true} path="/login" render={this.loginPageRender} />
          <Route exact={true} path="/signup" render={this.signupPageRender} />
        </div>
      </BrowserRouter>
    );
  };
}

let App = connect()(UnconnectedApp);

export default App;
