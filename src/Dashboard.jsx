//login and signup icons
//if logged in, have a log out button and a welcome <user name> section
//profile page icon
//the logo in the middle
//menu items with links 1-wedding planning tool (to do list) 2-search bar 3-wedding crafts 4- wedding blog ideas

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedDashboard extends Component {
  render = () => {
    return (
      <div className="container-dashboard">
        <Link to="/" className="link">
          To homepage
        </Link>
        <div className="dashboard-right">
          <Link to="/login" className="link">
            <img
              src="uploads/loginimg.png"
              height="60px"
              className="icon"
              aria-label="login"
            />
          </Link>
          <Link to="/signup" className="link">
            <img
              src="uploads/52477-200.png"
              height="40px"
              className="icon"
              aria-label="signup"
            />
          </Link>
          <Link to="/profile" className="link">
            My profile page
          </Link>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  console.log("STATE FOR DASHBOARD", state);
  return {
    loggedIn: state.loggedIn,
    users: state.users
  };
};

let Dashboard = connect(mapStateToProps)(UnconnectedDashboard);

export default Dashboard;
