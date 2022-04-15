import hrRequest from '../index'
import { IAccount } from './type'
import { IDataType } from '../type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  LoginUserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return hrRequest.post<IDataType>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hrRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(roleId: number) {
  return hrRequest.get<IDataType>({
    url: LoginAPI.LoginUserMenus + roleId + '/menu',
    showLoading: false
  })
}
