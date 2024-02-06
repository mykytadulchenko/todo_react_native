import { IAction, IItemState } from '../../types'
import { itemActionTypes } from '../actions/actionTypes'

const itemState: IItemState = {
  data: [],
  filter: 'All',
  selectAll: true,
}

export const itemReducer = (state: IItemState = itemState, action: IAction) => {
  switch (action.type) {
    case itemActionTypes.SET_DATA:
      return { ...state, data: action.payload }
    case itemActionTypes.SET_FILTER:
      return { ...state, filter: action.payload }
    case itemActionTypes.SELECT_ALL:
      return { ...state, data: action.payload, selectAll: !state.selectAll }
    default:
      return state
  }
}
