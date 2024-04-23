import http from '@/utils/http'

const BASE_URL = '/ai/item'

export interface ItemResp {
  id: string
  name: string
  modelScriptId: string
  lastMessage: string
  number: string
  createTime: string
  createUser: string
  createUserString: string
  updateUserString: string
}
export interface ItemDetailResp {
  id: string
  name: string
  modelScriptId: string
  lastMessage: string
  number: string
  isDeleted: string
  createTime: string
  createUser: string
  updateTime: string
  updateUser: string
  createUserString: string
  updateUserString: string
}
export interface ItemQuery extends PageQuery {
  name: string
  modelScriptId: string
  createTime: string
  createUser: string
}

/** @desc 查询AI会话列表 */
export function listItem(query: ItemQuery) {
  return http.get<PageRes<ItemResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询AI会话详情 */
export function getItem(id: string) {
  return http.get<ItemDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增AI会话 */
export function addItem(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改AI会话 */
export function updateItem(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除AI会话 */
export function deleteItem(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出AI会话 */
export function exportItem(query: ItemQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
