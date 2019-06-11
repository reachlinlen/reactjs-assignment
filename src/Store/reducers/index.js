// const initialState = { "TxnData": {}, ""}
export const reducer = (state = [], action) => {
  switch(action.type) {
    case 'TXN_DATA_RECEIVED':
      // let latestTxnData = state.TxnData;
      // latestTxnData.push(action.data);
      // return Object.assign({...state}, {latestTxnData});
      return [...state, action.data]
    case 'TXN_DATA_FAILED':
      return state;
    default:
      return state;
  }
}