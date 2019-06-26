import axios from 'axios';
// import * as actions from '../actions/authorization';
import { call, put, takeEvery } from 'redux-saga/effects';
import "regenerator-runtime/runtime";

const headers = {
    'Content-Type': 'application/json',
    'crossDomain': true,
    // 'Authorization': 'JWT',
    'Content-Security-Policy': `default-src 'none'; script-src 'self';
                                connect-src 'self';img-src 'self';style-src 'self';`,
    'X-Content-Type-Options': 'nosniff', 
    'Pragma': 'no-cache',
};
const URL = "http://localhost:8081";

function getTxnAPI() {
  return axios.get(URL+"/txn");
}

function recordTxnAPI(action) {
  return axios.put(URL+"/txn", { headers : headers, body: action });
}

function* getTxn() {
    try {
      const res = yield call(getTxnAPI);
      if (res) {
        yield put({ type: "TXN_DATA_RECEIVED", data: res.data});
      }
    } catch (error) {
      yield put({ type: "TXN_DATA_FAILED", data: error});
    }
}

function* recordTxn(action) {
  try {
    const res = yield call(recordTxnAPI, action.payload );
    console.log(res);
    if (res.data === "Transaction PUT Request Completed") {
      yield put({ type: "PUT_TXN_SUCCESSFUL", data: action.payload });
    }
  } catch (error) {
    yield put({ type: "PUT_TXN_ERROR", data: error});
  }
}

export function* rootSaga() {
    yield takeEvery("TXN_PUT_RECORD", recordTxn);
    yield takeEvery("TXN_GET_RECORD", getTxn);
}