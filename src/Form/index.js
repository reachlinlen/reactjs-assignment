import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { display } from '@material-ui/system';
import { grey } from '@material-ui/core/colors';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';

// import './Form.css';
const INIT_VAL = 0;
export default function Form() {
  return (
    <div className="form-container" style={{width: '50vw', height: '30vh', border: '1px solid #000', display: 'inline-flex', margin: '2vh 0 0 15vw', backgroundColor: 'grey'}}>
      <div className="buttons" style={{display: 'inline-grid'}}>
        <Button className="user-a" variant="contained" color="primary" style={{margin: '2vh 2vw 2vh 2vw'}}>USER A</Button>
        <Button className="user-b" variant="contained" color="primary" style={{margin: '2vh 2vw 2vh 2vw'}}>USER B</Button>
        <Button className="user-c" variant="contained" color="primary" style={{margin: '2vh 2vw 2vh 2vw'}}>USER C</Button>
      </div>
      <div className="column-2" style={{display: 'inline-grid'}}>
        <div className="bank-radio-buttons">
          <RadioGroup className="radio-buttons" style={{display: 'inline-block', padding: '2vh 0 0 4vw'}} >
            <FormControlLabel value="American Express" control={<Radio color="primary"/>} label="American Express" />
            <FormControlLabel value="Visa" control={<Radio color="primary"/>} label="Visa" style={{padding: '0 2vw 0 2vw'}} />
            <FormControlLabel value="DBS PayLAh!" control={<Radio color="primary"/>} label="DSB Paylah" />
          </RadioGroup>
        </div>
        <div className="transaction" pattern="[0-9]*" value={INIT_VAL} style={{display: 'inline-flex'}}>
          <div >
            <input type="text" style={{margin: '0 0 0 5vw'}}/>
            <p style={{margin: '0 0 0 5vw', fontSize: '1.3vh'}}>***Maximum Allowed amount is 5000 INR</p>
          </div>
          <div>
            <Button className="transfer" variant="contained" color="primary" style={{margin: '0 0 0 4vw'}}>Transfer</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
