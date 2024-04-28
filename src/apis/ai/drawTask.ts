import http from '@/utils/http'

const BASE_URL = '/ai/drawTask'

export interface DrawTaskResp {
  id: string
  taskId: string
  prompt: string
  mosaicImg: string
  nonce: string
  state: string
  createTime: string
  createUser: string
  createUserString: string
  updateUserString: string
}
export interface DrawTaskDetailResp {
  id: string
  taskId: string
  prompt: string
  mosaicImg: string
  nonce: string
  state: string
  isDeleted: string
  createTime: string
  createUser: string
  updateTime: string
  updateUser: string
  createUserString: string
  updateUserString: string
}
export interface DrawTaskQuery extends PageQuery {
  taskId: string
  state: string
}

/** @desc 查询绘图任务列表 */
export function listDrawTask(query: DrawTaskQuery) {
  return http.get<PageRes<DrawTaskResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询绘图任务详情 */
export function getDrawTask(id: string) {
  return http.get<DrawTaskDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增绘图任务 */
export function addDrawTask(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改绘图任务 */
export function updateDrawTask(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除绘图任务 */
export function deleteDrawTask(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出绘图任务 */
export function exportDrawTask(query: DrawTaskQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
