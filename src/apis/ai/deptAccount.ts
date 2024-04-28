import http from '@/utils/http'

const BASE_URL = '/ai/deptAccount'

export interface DeptAccountResp {
  id: string
  balanceToken: string
  giveToken: string
  rechargeToken: string
  rechargeAmount: string
  deptId: string
  createUser: string
  createTime: string
  createUserString: string
  updateUserString: string
}
export interface DeptAccountDetailResp {
  id: string
  balanceToken: string
  giveToken: string
  rechargeToken: string
  rechargeAmount: string
  deptId: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface DeptAccountQuery extends PageQuery {
  deptId: string
}

/** @desc 查询部门账户列表 */
export function listDeptAccount(query: DeptAccountQuery) {
  return http.get<PageRes<DeptAccountResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询部门账户详情 */
export function getDeptAccount(id: string) {
  return http.get<DeptAccountDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增部门账户 */
export function addDeptAccount(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改部门账户 */
export function updateDeptAccount(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除部门账户 */
export function deleteDeptAccount(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出部门账户 */
export function exportDeptAccount(query: DeptAccountQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
