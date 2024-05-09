import http from '@/utils/http'

const BASE_URL = '/ai/deptAccountLog'

export interface DeptAccountLogResp {
  id: string
  deptId: string
  messageId: string
  modelType: string
  token: string
  createTime: string
  createUser: string
  createUserString: string
  updateUserString: string
}
export interface DeptAccountLogDetailResp {
  id: string
  deptId: string
  messageId: string
  modelType: string
  token: string
  createTime: string
  createUser: string
  createUserString: string
  updateUserString: string
}
export interface DeptAccountLogQuery {
  deptId: string
  messageId: string
  modelType: string
  token: string
  createTime: string
  createUser: string
  sort: Array<string>
}
export interface DeptAccountLogPageQuery extends DeptAccountLogQuery, PageQuery {}

/** @desc 查询账户扣费记录列表 */
export function listDeptAccountLog(query: DeptAccountLogPageQuery) {
  return http.get<PageRes<DeptAccountLogResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询账户扣费记录详情 */
export function getDeptAccountLog(id: string) {
  return http.get<DeptAccountLogDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增账户扣费记录 */
export function addDeptAccountLog(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改账户扣费记录 */
export function updateDeptAccountLog(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除账户扣费记录 */
export function deleteDeptAccountLog(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出账户扣费记录 */
export function exportDeptAccountLog(query: DeptAccountLogQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
