import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from './Form';
import Table from './Table';
import LineChart from './LineChart';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{display: 'inline-grid'}}>
        <Form />
        <Table />
        <LineChart />
      </div>
    );
  }
}

export default App;