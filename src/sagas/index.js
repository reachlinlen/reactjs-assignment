import axios from 'axios';
// import * as actions from '../actions/authorization';
import { call, put, takeEvery } from 'redux-saga/effects';
import "regenerator-runtime/runtime";

// const mongoose = require('mongoose');
const headers = {
    'Content-Type': 'application/json',
    'crossDomain': true,
    // 'Authorization': 'JWT',
    // 'Access-Control-Allow-Origin': '*',
    'Content-Security-Policy': `default-src 'none'; script-src 'self';
                                connect-src 'self';img-src 'self';style-src 'self';`,
    'X-Content-Type-Options': 'nosniff', 
    'Pragma': 'no-cache',
};
const URL = "http://localhost:8081";

function* getTxnAPI() {
  return axios.get(URL+"/txn")
                .then(res => {
                    console.log(res)
                    let data = res.data
                    return data
                })
                .catch(error => error);
}

function* recordTxnAPI(action) {
  return axios.put(URL+"/txn", { headers : headers, body: action })
                .then(res => res)
                .catch(error => error);
}

function* getTxn() {
    const { data, error } = yield call(getTxnAPI);
    data ? yield put({ type: "TXN_DATA_RECEIVED", data: data}) : 
          yield put({ type: "TXN_DATA_FAILED", data: error});
}

function* recordTxn(action) {
    const { res, error } = yield call(recordTxnAPI, action.payload );
    // yield put({ type: "TXN_DATA_RECEIVED", data: action.payload });
    // if (error) yield put({ type: 'PUT_TXN_ERROR', error});
}

export function* rootSaga() {
    yield takeEvery("TXN_PUT_RECORD", recordTxn);
    yield takeEvery("TXN_GET_RECORD", getTxn);
}