import { createStore, applyMiddleware } from 'redux'
import rootReducer from './../redux/reducer';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './../redux/saga';

const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  return store
}