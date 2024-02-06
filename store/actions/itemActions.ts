import { AxiosError, AxiosResponse } from 'axios'
import { put, takeEvery } from 'redux-saga/effects'
import type { IAction, IListItem, IUser } from '../../types'
import { itemActionTypes } from './actionTypes'
import axiosItemsResolver from './api/axiosResolvers/itemsResolver'
import asyncUserActions from './userActions'

export const itemActions = {
  setData: (data: Array<IListItem>) => ({
    type: itemActionTypes.SET_DATA,
    payload: data,
  }),
  setFilter: (value: string) => ({
    type: itemActionTypes.SET_FILTER,
    payload: value,
  }),
  selectAll: (data: Array<IListItem>) => ({
    type: itemActionTypes.SELECT_ALL,
    payload: data,
  }),
}

function* workerHandler(request: any, dataAction: any = itemActions.setData): Generator<any, void, AxiosResponse> {
  const response = yield request
  if (response instanceof AxiosError && response.response!.status === 401) {
    yield put(asyncUserActions.asyncLogOut())
  } else if(response instanceof AxiosError) {
    console.log(response)
  } else {
    yield put(dataAction(response.data))
  }
}

const itemsWorkers = {
  *fetchData(action: IAction): Generator<any, void, AxiosResponse> {
    const { id } = action.payload
    yield workerHandler(axiosItemsResolver.get(`/${id}`))
  },
  *addNewItem(action: IAction): Generator<any, void, AxiosResponse> {
    const { userId, value } = action.payload
    yield workerHandler(axiosItemsResolver.post('/', { userId, value }))
  },
  *editItem(action: IAction): Generator<any, void, AxiosResponse> {
    const { listItem } = action.payload
    yield workerHandler(axiosItemsResolver.put(`/${listItem.id}`, listItem))
  },
  *removeItem(action: IAction): Generator<any, void, AxiosResponse> {
    const { listItem } = action.payload
    yield workerHandler(axiosItemsResolver.delete(`/${listItem.id}`))
  },
  *processSelectAll(action: IAction): Generator<any, void, AxiosResponse> {
    const { userId, selectAll } = action.payload
    yield workerHandler(yield axiosItemsResolver.put('/bulk-select', { userId, selectAll }), itemActions.selectAll)
  },
  *processRemoveSelected(action: IAction): Generator<any, void, AxiosResponse> {
    yield workerHandler(axiosItemsResolver.delete('/bulk-remove'))
  },
}

export const asyncItemActions = {
  fetchData: (user: IUser) => ({
    type: itemActionTypes.ASYNC_FETCH_DATA,
    payload: user,
  }),
  addNewItem: (user: IUser, value: string) => ({
    type: itemActionTypes.ASYNC_ADD_ITEM,
    payload: { userId: user.id, value },
  }),
  editItem: (listItem: IListItem) => ({
    type: itemActionTypes.ASYNC_EDIT_ITEM,
    payload: { listItem },
  }),
  removeItem: (listItem: IListItem) => ({
    type: itemActionTypes.ASYNC_REMOVE_ITEM,
    payload: { listItem },
  }),
  processSelectAll: (user: IUser, selectAll: boolean) => ({
    type: itemActionTypes.ASYNC_SELECT_ALL,
    payload: { userId: user.id, selectAll },
  }),
  processRemoveSelected: (user: IUser) => ({
    type: itemActionTypes.ASYNC_REMOVE_SELECTED,
    payload: { userId: user.id },
  }),
}

export function* itemsWatcher() {
  yield takeEvery(itemActionTypes.ASYNC_FETCH_DATA, itemsWorkers.fetchData)
  yield takeEvery(itemActionTypes.ASYNC_ADD_ITEM, itemsWorkers.addNewItem)
  yield takeEvery(itemActionTypes.ASYNC_EDIT_ITEM, itemsWorkers.editItem)
  yield takeEvery(itemActionTypes.ASYNC_REMOVE_ITEM, itemsWorkers.removeItem)
  yield takeEvery(itemActionTypes.ASYNC_SELECT_ALL, itemsWorkers.processSelectAll)
  yield takeEvery(itemActionTypes.ASYNC_REMOVE_SELECTED, itemsWorkers.processRemoveSelected)
}

export default asyncItemActions
