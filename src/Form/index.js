import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { display } from '@material-ui/system';
import { grey } from '@material-ui/core/colors';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';

// import './Form.css';
const INIT_VAL = 0;
export default function Form() {
  const [user, setUser] = useState('USER A');
  const [bank, setBank] = useState('American Express');
  const [amt, setAmt] = useState(0);

  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'JWT',
    'Access-Control-Allow-Origin': '*',
  }

  const handleBtnClick = (e) => {
    setUser(e.target.innerHTML);
  }
  const handleBankChange = (e) => {
    setBank(e.target.value);
  }
  const handleClickTx = () => {
    let data = {
      userName: user,
      bankName: bank,
      txnAmt: amt
    }
    axios.post('http://localhost:8081/txn', data, {headers: headers})
    .then(function (res) {
      console.log("Res: "+res);
      // INCLUDE REDUX TO UPDATE THE STORE
    })
    .catch(function (error) {
      console.log("Error: "+error);
    });
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
            <input type="number"  style={{margin: '0 0 0 5vw'}} onChange={handleAmtChange} />
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
