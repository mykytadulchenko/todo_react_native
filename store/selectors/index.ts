import type { IListItem, IState, IUser } from '../../types'

export const getDataSelector = (state: IState): Array<IListItem> => state.items.data
export const getSelectAllSelector = (state: IState): boolean => state.items.selectAll
export const getFilterSelector = (state: IState): string => state.items.filter
export const getAuthStatus = (state: IState): boolean => state.user.isAuth
export const getUserSelector = (state: IState): IUser | null => state.user.currentUser
