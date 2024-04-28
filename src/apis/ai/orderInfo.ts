import http from '@/utils/http'

const BASE_URL = '/ai/orderInfo'

export interface OrderInfoResp {
  id: string
  title: string
  orderNo: string
  productId: string
  totalFee: string
  codeUrl: string
  deptId: string
  orderStatus: string
  createUser: string
  createTime: string
  createUserString: string
  updateUserString: string
}
export interface OrderInfoDetailResp {
  id: string
  title: string
  orderNo: string
  productId: string
  totalFee: string
  codeUrl: string
  deptId: string
  orderStatus: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface OrderInfoQuery extends PageQuery {
  title: string
  orderNo: string
  productId: string
  orderStatus: string
}

/** @desc 查询订单信息列表 */
export function listOrderInfo(query: OrderInfoQuery) {
  return http.get<PageRes<OrderInfoResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询订单信息详情 */
export function getOrderInfo(id: string) {
  return http.get<OrderInfoDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增订单信息 */
export function addOrderInfo(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改订单信息 */
export function updateOrderInfo(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除订单信息 */
export function deleteOrderInfo(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出订单信息 */
export function exportOrderInfo(query: OrderInfoQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
