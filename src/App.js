import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from './Form';
import Table from './Table';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{display: 'inline-grid'}}>
        <Form />
        <Table />
      </div>
    );
  }
}

export default App;