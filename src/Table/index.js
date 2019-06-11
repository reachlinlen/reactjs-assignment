import React, { useState, useEffect } from 'react';
import TableHead from './TableHead';
import Row from './Row';
import { connect } from 'react-redux';

const NO_ROWS = 5;

function Table(props) {
  const [totalRows, setTotalRows] = useState(0);
  let allRows, noOfRows = 0, raw=[];
  allRows = (
    <React.Fragment>
      <Row tranID={raw[0]} userName={raw[1]} payMode={raw[2]} amt={raw[3]} />
      <Row tranID={raw[0]} userName={raw[1]} payMode={raw[2]} amt={raw[3]} />
      <Row tranID={raw[0]} userName={raw[1]} payMode={raw[2]} amt={raw[3]} />
      <Row tranID={raw[0]} userName={raw[1]} payMode={raw[2]} amt={raw[3]} />
      <Row tranID={raw[0]} userName={raw[1]} payMode={raw[2]} amt={raw[3]} />
    </React.Fragment>
  );
  // const rowDetails = [
  //         ['transId01', 'USER - A', 'American Express', 500],
  //         ['transId02', 'USER - B', 'VISA', 3500],
  //         ['transId03', 'USER - C', 'DBS PayLah', 2500],
  //       ];
  useEffect(() => {
    let txnData = (props.txnData === undefined) ? [] : props.txnData;
    allRows = txnData.map(r => {
      // noOfRows = noOfRows + 1;
      return <Row tranID={r[0]} userName={r[1]} payMode={r[2]} amt={r[3]} />;
    });
    // if (noOfRows > totalRows) setTotalRows(noOfRows);
  }, [props.data]);

  return (
    <div style={{paddingTop: '20px'}}>
      <table style={{borderCollapse: 'collapse', width: '100%', display: 'inline-grid'}}>
        <TableHead />
        <React.Fragment>{allRows}</React.Fragment>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  txnData: state
};

export default connect(mapStateToProps, null)(Table);