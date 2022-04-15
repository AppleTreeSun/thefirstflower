import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../type'

import { IAccount } from '@/service/login/type'

import localCache from '@/utils/cache'

import router from '@/router'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      name: '',
      userInfo: [],
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserName(state, userName: string) {
      state.name = userName
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // routes => router.main.children
      routes.forEach((route) => router.addRoute('main', route))

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      const { id, token, name } = loginResult.data
      commit('changeToken', token)
      commit('changeUserName', name)
      localCache.setCache('token', token)
      localCache.setCache('userName', name)

      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      router.push('/main')
    },
    handleRefresh({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const name = localCache.getCache('userName')
      if (name) {
        commit('changeUserName', name)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    handleLogOut({ commit }) {
      commit('changeToken', '')
      commit('changeUserName', '')
      commit('changeUserInfo', '')
      commit('changeUserMenus', '')
      localCache.deleteCache('token')
      localCache.deleteCache('userName')
      localCache.deleteCache('userInfo')
      localCache.deleteCache('userMenus')
      router.push('/login')
    }
  }
}

export default loginModule
