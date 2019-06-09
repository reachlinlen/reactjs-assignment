import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';
import {rootSaga} from '../sagas';

function Form(props) {
  const [user, setUser] = useState('USER A');
  const [bank, setBank] = useState('American Express');
  const [amt, setAmt] = useState(0);

  const handleBtnClick = (e) => {
    setUser(e.target.innerHTML);
  }
  const handleBankChange = (e) => {
    setBank(e.target.value);
  }
  const handleClickTx = () => {
    if (amt === 0 || amt > 5000 || amt < 0 || amt === "") {
      setAmt(0);
      alert("Please enter transaction amount between 0 and 5000");
    } else {
      let data = {
        "userName": user,
        "bankName": bank,
        "txnAmt": amt
      }
      props.recordTxn(data);
      setAmt(0);
    }
  }
  const handleAmtChange = (e) => {
    setAmt(e.target.value);
  }
  return (
    <div className="form-container" style={{width: '50vw', height: '30vh', border: '1px solid #000', display: 'inline-flex', margin: '2vh 0 0 15vw', backgroundColor: '#b6b9ba'}}>
      <div className="buttons" style={{display: 'inline-grid'}}>
        <Button className="user-a" variant="contained" color="primary" onClick={handleBtnClick}
                                    style={{margin: '2vh 2vw 2vh 2vw'}}>USER A</Button>
        <Button className="user-b" variant="contained" color="primary" onClick={handleBtnClick}
                                    style={{margin: '2vh 2vw 2vh 2vw'}}>USER B</Button>
        <Button className="user-c" variant="contained" color="primary" onClick={handleBtnClick}
                                    style={{margin: '2vh 2vw 2vh 2vw'}}>USER C</Button>
      </div>
      <div className="column-2" style={{display: 'inline-grid'}}>
        <div className="bank-radio-buttons">
          <RadioGroup className="radio-buttons" style={{display: 'inline-block', padding: '2vh 0 0 4vw'}} 
                        value={bank} onChange={handleBankChange} >
            <FormControlLabel value="American Express" control={<Radio color="primary"/>} label="American Express" />
            <FormControlLabel value="Visa" control={<Radio color="primary"/>} label="Visa" style={{padding: '0 2vw 0 2vw'}} />
            <FormControlLabel value="DBS PayLah!" control={<Radio color="primary"/>} label="DSB Paylah" />
          </RadioGroup>
        </div>
        <div className="transaction" style={{display: 'inline-flex'}}>
          <div >
            <input type="number"  style={{margin: '0 0 0 5vw'}} value={amt} placeholder={0} onChange={handleAmtChange} min={0} max={5000}/>
            <p style={{margin: '0 0 0 5vw', fontSize: '1.1vh'}}>***Maximum Allowed amount is 5000 INR</p>
          </div>
          <div>
            <Button className="transfer" variant="contained" color="primary" onClick={handleClickTx}
                    style={{margin: '0 0 0 4vw'}}>Transfer</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    recordTxn: (data) => dispatch({ type: 'TXN_PUT_RECORD', payload: data })
  };
};

export default connect(null, mapDispatchToProps)(Form);
