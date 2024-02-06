import { Buffer } from 'buffer'
import { IAction, IUserState } from '../../types'
import { userActionTypes } from '../actions/actionTypes'

const userState: any = {
  isAuth: false,
  currentUser: null,
  token: null,
}

export const userReducer = (state: IUserState = userState, action: IAction) => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      if (!action.payload) return state
      const decodedData = JSON.parse(Buffer.from(action.payload.split('.')[1], 'base64').toString('ascii'))
      const currentUser = {
        id: decodedData.id,
        login: decodedData.login,
      }
      return { ...state, currentUser, isAuth: true }
    case userActionTypes.LOG_OUT:
      return { ...state, currentUser: null, isAuth: false }
    default:
      return state
  }
}
