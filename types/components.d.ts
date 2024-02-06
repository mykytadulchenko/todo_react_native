import { IListItem, IUser } from '.'

export interface IListItemLayout {
  data: Array<IListItem>
}

export interface IListItemComponent {
  key: string
  itemData: IListItem
}

export interface IFiltersComponent {
  activeCounter: number
  isAnyFinished: boolean
}

export interface IUserProfile {
  user: IUser
}

export interface ISignupForm {
  switchState: boolean
  switchForm: (a: boolean) => void
}

export type ISigninForm = ISignupForm
