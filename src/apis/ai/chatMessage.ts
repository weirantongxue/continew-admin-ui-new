import http from '@/utils/http'

const BASE_URL = '/ai/message'

export interface ChatMessageResp {
  id: string
  itemId: string
  messageId: string
  taskId: string
  question: string
  answer: string
  model: string
  adopt: string
  ip: string
  promptTokens: string
  completionTokens: string
  totalTokens: string
  responseTime: string
  chatResponseTime: string
  createTime: string
  createUser: string
  createUserString: string
  updateUserString: string
}
export interface ChatMessageDetailResp {
  id: string
  itemId: string
  messageId: string
  taskId: string
  question: string
  answer: string
  model: string
  adopt: string
  ip: string
  promptTokens: string
  completionTokens: string
  totalTokens: string
  responseTime: string
  chatResponseTime: string
  isDeleted: string
  createTime: string
  createUser: string
  updateTime: string
  updateUser: string
  createUserString: string
  updateUserString: string
}
export interface ChatMessageQuery extends PageQuery {
  itemId: string
  messageId: string
  taskId: string
  createTime: string
  createUser: string
}

/** @desc 查询对话消息列表 */
export function listChatMessage(query: ChatMessageQuery) {
  return http.get<PageRes<ChatMessageResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询对话消息详情 */
export function getChatMessage(id: string) {
  return http.get<ChatMessageDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增对话消息 */
export function addChatMessage(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改对话消息 */
export function updateChatMessage(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除对话消息 */
export function deleteChatMessage(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出对话消息 */
export function exportChatMessage(query: ChatMessageQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
