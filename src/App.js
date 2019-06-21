import React, { useEffect } from "react";
import Form from './Form';
import Table from './Table';
import LineChart from './LineChart';
import connect from 'react-redux';

function App(props) {

  useEffect(() => {
    props.getTxn();
  }, []);

  return (
    <div style={{display: 'inline-grid', paddingLeft: '50px'}}>
      <Form />
      <Table />
      <LineChart />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    getTxn: () => dispatch({ type: "TXN_GET_RECORD" })
  }
}

export default connect(mapDispatchToProps, null)(App);