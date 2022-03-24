import React, { Component } from "react";

export default class DemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState(this.props);
    console.log("mounted", this.state);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("**************Component update*********");
    console.log("updated state", this.state);
  }

  changeAuthor = () => {
    const author = this.state.postDetails.authorDetails[0];
    this.setState((state, props) => ({
      postDetails: {
        ...state.postDetails,
        authorDetails: author,
      },
    }));
  };

  changeDate = () => {
    const date = this.state.postDetails.createdAt;
    this.setState((state, props) => ({
      postDetails: {
        ...state.postDetails,
        createdAt: new Date(date),
      },
    }));
  };

  doBoth = () => {
    this.changeAuthor();
    console.log(this.state);
    this.changeDate();
  };

  componentWillReceiveProps() {}

  render() {
    return (
      <>
        <button onClick={this.changeAuthor}>ChangeAuthor</button>
        <button onClick={this.changeDate}>ChangeDate</button>
        <button onClick={this.doBoth}>Change Both</button>
        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          Log State
        </button>
      </>
    );
  }
}
