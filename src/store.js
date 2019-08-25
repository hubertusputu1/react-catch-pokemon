import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducer/index';
import IndexSaga from './redux/saga/index';
import { persistStore } from 'redux-persist';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const configureStore = preloadState => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    preloadState,
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  return {
    ...store,
    persistor: persistStore(store),
    runSaga: sagaMiddleware.run(IndexSaga),
  };
};

export default configureStore;
