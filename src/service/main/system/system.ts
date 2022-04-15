import hrRequest from '@/service'
import { IDataType } from '@/service/type'

export function getPageListData(url: string, queryInfo: any) {
  return hrRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
