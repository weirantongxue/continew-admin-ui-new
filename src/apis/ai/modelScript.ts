import http from '@/utils/http'

const BASE_URL = '/ai/modelScript'

export interface ModelScriptResp {
  id: string
  name: string
  modelId: string
  prompt: string
  coverUrl: string
  component: string
  description: string
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
export interface ModelScriptDetailResp {
  id: string
  name: string
  modelId: string
  prompt: string
  coverUrl: string
  component: string
  description: string
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
export interface ModelScriptQuery extends PageQuery {
  name: string
  modelId: string
  prompt: string
  sort: string
  status: string
  isDelete: string
  createUser: string
  createTime: string
}

/** @desc 查询模型预设脚本列表 */
export function listModelScript(query: ModelScriptQuery) {
  return http.get<PageRes<ModelScriptResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询模型预设脚本详情 */
export function getModelScript(id: string) {
  return http.get<ModelScriptDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增模型预设脚本 */
export function addModelScript(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改模型预设脚本 */
export function updateModelScript(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除模型预设脚本 */
export function deleteModelScript(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出模型预设脚本 */
export function exportModelScript(query: ModelScriptQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
