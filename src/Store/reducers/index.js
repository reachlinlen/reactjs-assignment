// const initialState = { "TxnData": {}, ""}
export const reducer = (state = { data: []}, action) => {
  switch(action.type) {
    case "TXN_DATA_RECEIVED":
      let latData = [...state.data];
      latData.unshift(action.data);
      return Object.assign({}, state, { data: latData })
    case 'TXN_DATA_FAILED':
      return state;
    default:
      return state;
  }
}