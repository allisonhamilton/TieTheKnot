import React, { Component } from "react";
import { connect } from "react-redux";
import "./checklist.css";

class UnconnectedChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      items: []
    };
  }
  addItemChange = event => {
    this.setState({ input: event.target.value });
  };
  addItemSubmit = event => {
    event.preventDefault();
    {
      this.setState({
        input: "",
        items: this.state.items.concat(this.state.input)
      });
    }
  };
  deleteItemClick = () => {
    console.log("deleting item");
    this.state.items.filter((item, index) => {
      console.log("Is the item deleted", index);
      return index !== i;
    });
  };
  saveChecklist = async () => {
    let data = new FormData();
    data.append("checklist", this.state.items);
    let response = await fetch("/saveChecklist", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("success or not ", body.success);
    if (!body.success) {
      alert("your checklist has not been saved, please try agian");
    }
    {
      this.props.dispatch({
        type: "new-checklist",
        checklist: this.props.checklist.concat(this.state.items)
      });
      alert("Your checklist has been saved to your profile!");
      this.setState({ items: [] });
    }
  };
  deleteItemClick = i => {
    console.log("whats i", i);
    return this.state.items.filter(index => {
      return index !== i;
    });
  };
  render = () => {
    return (
      <div>
        <div>Checklist page, everything you need to plan your wedding</div>
        <div>
          <ul>
            {this.state.items.map((item, i) => {
              return (
                <li>
                  {item}
                  <button onClick={this.deleteItemClick}>
                    <img
                      src="/uploads/delete-xx.png"
                      height="8px"
                      width="8px"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <div>
            <form onSubmit={this.addItemSubmit}>
              <input
                type="text"
                placeholder="Add wedding to do..."
                value={this.state.input}
                onChange={this.addItemChange}
              />
              <input type="submit" value="Add to checklist" />
            </form>
            <div>
              <button onClick={this.saveChecklist}>Save your checklist</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    checklist: state.checklist
  };
};
let Checklist = connect(mapStateToProps)(UnconnectedChecklist);

export default Checklist;
