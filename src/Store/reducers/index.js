const initialState = { data: []}
export const reducer = (state={initialState}, action) => {
  switch(action.type) {
    case 'TXN_DATA_RECEIVED':
      return {...state, data: action.data};
    case 'TXN_DATA_FAILED':
      return {...state};
    default:
      return {...state};
  }
}