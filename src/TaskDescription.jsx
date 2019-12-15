import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedTaskDescription extends Component {
  render = () => {
    return <div>"Hiiiiiiiiiiiiii youuuuuuuuuu"</div>;
  };
}

let TaskDescription = connect()(UnconnectedTaskDescription)

export default TaskDescription