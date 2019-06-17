import axios from 'axios';
// import * as actions from '../actions/authorization';
import { call, put, takeEvery } from 'redux-saga/effects';
import "regenerator-runtime/runtime";

// const mongoose = require('mongoose');
const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'JWT',
    // 'Access-Control-Allow-Origin': '*',
    'Content-Security-Policy': `default-src 'none'; script-src 'self';
                                connect-src 'self';img-src 'self';style-src 'self';`,
    'X-Content-Type-Options': 'nosniff',
    'Pragma': 'no-cache',
};
const URL = 'http://localhost:8081';

// mongoose.connect(mongodb+srv://dbUser:<dbPassword>@transaction-9gekk.mongodb.net/test?retryWrites=true&w=majority);
function* getTxnAPI() {
  return axios.get(URL+'/txn', {headers: headers})
                .then(res => res)
                .catch(error => error);
}

function* recordTxnAPI(action) {
  return axios.put(URL+'/txn', { headers : headers, body: action })
                .then(res => res)
                .catch(error => error);
}

function* getTxn(action) {
    const { res, error } = yield call(getTxnAPI);
    res ? yield put({ type: 'TXN_DATA_RECEIVED', res}) : 
          yield put({ type: 'TXN_DATA_FAILED', error});
}

function* recordTxn(action) {
    const { res, error } = yield call(recordTxnAPI, action.payload );
    yield put({ type: 'TXN_DATA_RECEIVED', data: action.payload });
    // if (error) yield put({ type: 'PUT_TXN_ERROR', error});
}

export function* rootSaga() {
    yield takeEvery('TXN_PUT_RECORD', recordTxn);
    yield takeEvery('TXN_GET_RECORD', getTxn);
}