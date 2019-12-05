import React, { Component } from "react";
import { connect } from "react-redux";
import "./checklist.css";

class UnconnectedChecklist extends Component {
  render = () => {
    return <div>checklist page</div>;
  };
}

let Checklist = connect()(UnconnectedChecklist);

export default Checklist;
