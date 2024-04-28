import http from '@/utils/http'

const BASE_URL = '/ai/paymentInfo'

export interface PaymentInfoResp {
  id: string
  orderNo: string
  transactionId: string
  paymentType: string
  tradeType: string
  tradeState: string
  payerTotal: string
  content: string
  createTime: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface PaymentInfoDetailResp {
  id: string
  orderNo: string
  transactionId: string
  paymentType: string
  tradeType: string
  tradeState: string
  payerTotal: string
  content: string
  createTime: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface PaymentInfoQuery extends PageQuery {
  id: string
  orderNo: string
  transactionId: string
  paymentType: string
  tradeType: string
  tradeState: string
  createTime: string
}

/** @desc 查询支付信息列表 */
export function listPaymentInfo(query: PaymentInfoQuery) {
  return http.get<PageRes<PaymentInfoResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询支付信息详情 */
export function getPaymentInfo(id: string) {
  return http.get<PaymentInfoDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增支付信息 */
export function addPaymentInfo(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改支付信息 */
export function updatePaymentInfo(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除支付信息 */
export function deletePaymentInfo(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出支付信息 */
export function exportPaymentInfo(query: PaymentInfoQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
