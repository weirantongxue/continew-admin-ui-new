import http from '@/utils/http'

const BASE_URL = '/ai/pay/config'

export interface PayConfigResp {
  id: string
  name: string
  icon: string
  way: string
  sort: string
  remark: string
  params: string
  isDefault: string
  status: string
  createTime: string
  createUser: string
  createUserString: string
  updateUserString: string
}
export interface PayConfigDetailResp {
  id: string
  name: string
  icon: string
  way: string
  sort: string
  remark: string
  params: string
  isDefault: string
  status: string
  isDeleted: string
  createTime: string
  createUser: string
  updateTime: string
  updateUser: string
  createUserString: string
  updateUserString: string
}
export interface PayConfigQuery extends PageQuery {
  id: string
  name: string
  status: string
}

/** @desc 查询支付配置列表 */
export function listPayConfig(query: PayConfigQuery) {
  return http.get<PageRes<PayConfigResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询支付配置详情 */
export function getPayConfig(id: string) {
  return http.get<PayConfigDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增支付配置 */
export function addPayConfig(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改支付配置 */
export function updatePayConfig(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除支付配置 */
export function deletePayConfig(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出支付配置 */
export function exportPayConfig(query: PayConfigQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
