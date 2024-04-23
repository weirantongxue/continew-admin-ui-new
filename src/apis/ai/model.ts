import http from '@/utils/http'

const BASE_URL = '/ai/model'

export interface ModelResp {
  id: string
  name: string
  modelType: string
  coverUrl: string
  url: string
  apiKey: string
  callBack: string
  resType: string
  introduction: string
  sort: string
  status: string
  createUser: string
  createTime: string
  createUserString: string
  updateUserString: string
}
export interface ModelDetailResp {
  id: string
  name: string
  modelType: string
  coverUrl: string
  url: string
  apiKey: string
  callBack: string
  resType: string
  introduction: string
  sort: string
  status: string
  isDelete: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface ModelQuery extends PageQuery {
  name: string
  modelType: string
}

/** @desc 查询AI模型列表 */
export function listModel(query: ModelQuery) {
  return http.get<PageRes<ModelResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询AI模型详情 */
export function getModel(id: string) {
  return http.get<ModelDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增AI模型 */
export function addModel(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改AI模型 */
export function updateModel(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除AI模型 */
export function deleteModel(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出AI模型 */
export function exportModel(query: ModelQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
