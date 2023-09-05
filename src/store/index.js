import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { ignoredPaths: [] }
    })
      .concat(thunk)
      .concat(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);

export default store;
