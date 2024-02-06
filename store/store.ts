import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { itemReducer } from './reducers/itemReducer'
import { userReducer } from './reducers/userReducer'
import { all } from 'redux-saga/effects'
import { usersWatcher } from './actions/userActions'
import { itemsWatcher } from './actions/itemActions'

const rootReducer = combineReducers({ user: userReducer, items: itemReducer })
const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

function* rootWatcher() {
  yield all([usersWatcher(), itemsWatcher()])
}

sagaMiddleware.run(rootWatcher)

export default store
