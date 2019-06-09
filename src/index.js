import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootSaga } from './sagas/index';
import { reducer } from './Store/reducers';

const sagaMidware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMidware))
);
sagaMidware.run(rootSaga);
() => dispatch({ type: 'TXN_GET_RECORD' });

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById("container")
);

// module.hot.accept();