export const reducer = (state = { data: []}, action) => {
  switch(action.type) {
    case "TXN_DATA_RECEIVED":
      let oldData = [];
      action.data.forEach(e => {
        oldData.unshift(e);
      });
      return Object.assign({}, state, { data: oldData })
    case 'TXN_DATA_FAILED':
      return state;
    case "PUT_TXN_SUCCESSFUL":
        let latData = [...state.data];
        latData.unshift(action.data);
        return Object.assign({}, state, { data: latData });
    default:
      return state;
  }
}