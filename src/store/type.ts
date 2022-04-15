import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'

interface IRootState {
  name: string
}

interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

type IStoreType = IRootState & IRootWithModule

export { IRootState, IStoreType }
