import React, { Component, useState, useEffect } from 'react';
import TableHead from './TableHead';
import Row from './Row';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const NO_ROWS = 5;

function Table(props) {
  // const [totalRows, setTotalRows] = useState(0);
  const [rowElements, setRowElements] = useState([]);
  // let allRows;

  useEffect(() => {
    let txnData = (props.txnData === undefined) ? [] : props.txnData;
    let allRows = txnData.map(r => {
      return <Row tranID={r.transID} userName={r.userName} payMode={r.bankName} amt={r.txnAmt} />;
    });
    setRowElements(allRows);
  }, [props.txnData]);

  // const handleBtnClick = () => {
  //   let txnData = (props.txnData === undefined) ? [] : props.txnData;
  //   // let noOfRows = 0;
  //   let allRows = txnData.map(r => {
  //     return <Row tranID={r.transID} userName={r.userName} payMode={r.bankName} amt={r.txnAmt} />;
  //   });
  //   setRowElements(allRows);
  //   // setTotalRows(txnData.length);
  // }
  return (
    <div style={{paddingTop: '20px'}}>
      <table style={{borderCollapse: 'collapse', width: '100%', display: 'inline-grid'}}>
        {/* <Button className="user-a" variant="contained" color="primary" onClick={handleBtnClick}
                                    style={{margin: '2vh 2vw 2vh 2vw'}}>GET TABLE</Button> */}
        <TableHead />
        <React.Fragment>{rowElements}</React.Fragment>
      </table>
    </div>
  );
}
// class Table extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       allRows: []
//     }
//     this.createTable = this.createTable.bind(this);
//   }

//   // state = ({
//   //   allRows: []
//   // });
//   componentDidMount() {
//     let txnData = (this.props.txnData === undefined) ? [] : this.props.txnData;
//     let newRows = txnData.map(r => {
//       return <Row tranID={r[0]} userName={r[1]} payMode={r[2]} amt={r[3]} />;
//     });
//     this.setState({
//       allRows: newRows
//     });
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.txnData.length !== this.props.txnData.length) {
//       let txnData = (this.props.txnData === undefined) ? [] : this.props.txnData;
//       let newRows = txnData.map(r => {
//         return <Row tranID={r[0]} userName={r[1]} payMode={r[2]} amt={r[3]} />;
//       });
//       this.setState({
//         allRows: newRows
//       });
//     }
//   }

//   handleBtnClick = () => {
//     this.createTable();
//   }

//   createTable = () => {
//       let txnData = (this.props.txnData === undefined) ? [] : this.props.txnData;
//       let newRows = txnData.map(r => {
//         return <Row tranID={r.transID} userName={r.userName} payMode={r.bankName} amt={r.txnAmt} />;
//       });
//       this.setState({
//         allRows: newRows
//       });
//   }

//   render() {
//     return (
//       <div style={{paddingTop: '20px'}}>
//         <table style={{borderCollapse: 'collapse', width: '100%', display: 'inline-grid'}}>
//           <Button className="user-a" variant="contained" color="primary" onClick={this.handleBtnClick}
//                                     style={{margin: '2vh 2vw 2vh 2vw'}}>GET TABLE</Button>
//           <TableHead />
//           <React.Fragment>{this.state.allRows}</React.Fragment>
//         </table>
//       </div>
//     );
//   }
// }

const mapStateToProps = (state) => ({
  txnData: state.data
});

export default connect(mapStateToProps, null)(Table);