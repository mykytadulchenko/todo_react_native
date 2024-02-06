import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError, AxiosResponse } from 'axios'
import { put, takeEvery } from 'redux-saga/effects'
import type { IAction, IUser } from '../../types'
import { userActionTypes } from './actionTypes'
import axiosUsersResolvers from './api/axiosResolvers/userResolvers'

export const userActions = {
  setCurrentUser: (token: string) => ({ type: userActionTypes.SET_USER, payload: token }),
  logOut: () => ({ type: userActionTypes.LOG_OUT }),
}

const usersWorkers = {
  *signUp(action: IAction): Generator<any, void, AxiosResponse<string>> {
    const response = yield axiosUsersResolvers.post(`/sign-up`, action.payload)
    if(response instanceof AxiosError) {
      console.log(response)
    } else {
      yield AsyncStorage.setItem('auth_token', response.data)
      yield put(userActions.setCurrentUser(response.data))
    }

  },
  *signIn(action: IAction): Generator<any, void, AxiosResponse<string>> {
    const response = yield axiosUsersResolvers.post(`/sign-in`, action.payload)
    if(response instanceof AxiosError) {
      console.log(response)
    } else {
      yield AsyncStorage.setItem('auth_token', response.data)
      yield put(userActions.setCurrentUser(response.data))
    }
  },
  *logOut(): Generator<any, void, AxiosResponse<string>> {
    yield AsyncStorage.removeItem('auth_token')
    yield put(userActions.logOut())
  }
}

export const asyncUserActions = {
  signUp: (user: IUser) => ({ type: userActionTypes.ASYNC_SIGNUP_USER, payload: user }),
  signIn: (user: IUser) => ({ type: userActionTypes.ASYNC_SIGNIN_USER, payload: user }),
  asyncLogOut: () => ({type: userActionTypes.ASYNC_LOGOUT_USER })
}

export function* usersWatcher() {
  yield takeEvery(userActionTypes.ASYNC_SIGNUP_USER, usersWorkers.signUp)
  yield takeEvery(userActionTypes.ASYNC_SIGNIN_USER, usersWorkers.signIn)
  yield takeEvery(userActionTypes.ASYNC_LOGOUT_USER, usersWorkers.logOut)
}

export default asyncUserActions
