import http from '@/utils/http'

const BASE_URL = '/ai/drawImg'

export interface DrawImgResp {
  id: string
  taskId: string
  imageUrl: string
  createTime: string
  createUser: string
  createUserString: string
  updateUserString: string
}
export interface DrawImgDetailResp {
  id: string
  taskId: string
  imageUrl: string
  isDeleted: string
  createTime: string
  createUser: string
  updateTime: string
  updateUser: string
  createUserString: string
  updateUserString: string
}
export interface DrawImgQuery extends PageQuery {
  taskId: string
}

/** @desc 查询绘图素材列表 */
export function listDrawImg(query: DrawImgQuery) {
  return http.get<PageRes<DrawImgResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询绘图素材详情 */
export function getDrawImg(id: string) {
  return http.get<DrawImgDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增绘图素材 */
export function addDrawImg(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改绘图素材 */
export function updateDrawImg(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除绘图素材 */
export function deleteDrawImg(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出绘图素材 */
export function exportDrawImg(query: DrawImgQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
