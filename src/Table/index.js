import React, { Component, useState, useEffect, useLayoutEffect } from 'react';
import TableHead from './TableHead';
import Row from './Row';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const NOROWS_PAGE = 5;
function Table(props) {
  const [rowElements, setRowElements] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageButtons, setPageButtons] = useState([]); 
  // [a,b,t] => a is list of pages ['>'&'<' in string; other pages in nos]
  //         => b is pageButtons in JSX format
  //         => t is totpages

  useEffect(() => {
    let txnData = props.txnData, latestTxns = [];
    if (txnData.length > NOROWS_PAGE) {
      if (pageNo === 1) latestTxns = txnData.slice(0,NOROWS_PAGE);
      else latestTxns = txnData.slice((pageNo-1)*NOROWS_PAGE).slice(0,NOROWS_PAGE);
    } else latestTxns = txnData;
    let allRows = latestTxns.map(r => {
      return <Row tranID={r.tranID} userName={r.userName} payMode={r.bankName} amt={r.txnAmt} />;
    });
    setRowElements(allRows);
  }, [pageNo, props.txnData]);

  useEffect(() => {
  let currTotPages = Math.trunc(props.txnData.length/NOROWS_PAGE) + 
                               (props.txnData.length%NOROWS_PAGE !== 0 ? 1 : 0);
  let locPageBut, prevTotPages;
  if (pageButtons.length > 0) {
    locPageBut = [...pageButtons[0]];
    if (locPageBut.length > 0) {
      if (locPageBut[locPageBut.length-1] === '>') locPageBut.pop();
      if (locPageBut[0] === '<') locPageBut.shift();
      prevTotPages = Math.max(...locPageBut);
    } else prevTotPages = 0;
  } else {  
    locPageBut = [];
    prevTotPages = 0;
  }
  if (prevTotPages !== currTotPages && currTotPages > 1) {
    switch (currTotPages) {
      case 2:
        createPageBut([1,2], currTotPages);
        break;
      case 3:
        createPageBut([1,2,3], currTotPages);
        break
      case 4:
        createPageBut([1,2,3,4], currTotPages);
        break;
      case 5:
        createPageBut([1,2,3,4,5], currTotPages);
        break;
      case 6:
        createPageBut([1,2,3,4,5,'>'], currTotPages);
        break;
      default:
        if (pageButtons[0] !== undefined) createPageBut(pageButtons[0], currTotPages);
        else createPageBut([1,2,3,4,5,'>'], currTotPages);
        break;
    }
   }  
  }, [props.txnData]);

  const createPageBut = (pages, currTotPages) => {
    let newPageButtons = 
                pages.map(e => {
                  if (e === '>' || e === '<') {
                    return <Button className="user-a" variant="contained" color="primary" onClick={handleArrowBtnClick}
                          style={{margin: '2vh 2vw 2vh 2vw'}}>{e}</Button>;
                  }
                  return <Button className="user-a" variant="contained" color="primary" onClick={handlePageBtnClick}
                          style={{margin: '2vh 2vw 2vh 2vw'}}>{e}</Button>;
                });
    setPageButtons([pages, newPageButtons, currTotPages]);
  }

  const handlePageBtnClick = (e) => {
    setPageNo(e.target.innerHTML);  // set Current Page as clicked page
  }

  const handleArrowBtnClick = (e) => {
    let totPages = pageButtons[2], len = pageButtons[0].length, listPages = [];
    if (pageButtons[0][len-1] === '>') {pageButtons[0].pop(); --len;}
    if (pageButtons[0][0] === '<') {pageButtons[0].shift(); --len;}
    if (e.target.innerText === '<') 
      for(let ind=0; ind<len; ind++) listPages[ind] = --pageButtons[0][ind];
    else
      for(let ind=0; ind<len; ind++) listPages[ind] = ++pageButtons[0][ind];
    if (listPages[listPages.length-1] !== totPages) listPages.push('>');
    if (listPages[0] !== 1) listPages.unshift('<');
    createPageBut(listPages);
  }
  
  return (
    <div style={{paddingTop: '20px'}}>
      <table style={{borderCollapse: 'collapse', width: '100%', display: 'inline-grid'}}>
        <TableHead />
        <React.Fragment>{rowElements}</React.Fragment>
      </table>
      <div>
        <ul>{pageButtons[1]}</ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  txnData: state.data
});

export default connect(mapStateToProps, null)(Table);