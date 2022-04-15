import { createStore, useStore as useVuexStore, Store } from 'vuex'

import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'zhr'
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/handleRefresh')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
