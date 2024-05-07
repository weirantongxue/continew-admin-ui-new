<template>
  <div class="gi_page">
    <a-card title="对话消息管理" class="general-card">
      <GiTable
        ref="tableRef"
        row-key="id"
        :data="dataList"
        :columns="columns"
        :loading="loading"
        :scroll="{ x: '200%', y: '100%', minWidth: 1000 }"
        :pagination="pagination"
        :disabledColumnKeys="['name']"
        @refresh="search"
      >
        <template #custom-left>
          <a-input v-model="queryForm.itemId" placeholder="请输入会话id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.messageId" placeholder="请输入消息id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.taskId" placeholder="请输入任务id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.createTime" placeholder="请输入创建时间" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.createUser" placeholder="请输入创建人" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:chatMessage:export']" @click="onExport">
              <template #icon>
                <icon-download />
              </template>
            </a-button>
          </a-tooltip>
        </template>
        <template #id="{ record }">
          <a-link @click="onDetail(record)">{{ record.id }}</a-link>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-link
              v-permission="['ai:chatMessage:delete']"
              status="danger"
              :disabled="record.disabled"
              @click="onDelete(record)"
            >
              删除
            </a-link>
          </a-space>
        </template>
      </GiTable>
    </a-card>

    <ChatMessageDetailDrawer ref="ChatMessageDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import {
  listChatMessage,
  deleteChatMessage,
  exportChatMessage,
  type ChatMessageResp,
  type ChatMessageQuery
} from '@/apis/ai/chatMessage'
import ChatMessageDetailDrawer from './ChatMessageDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'AiMsg' })

const columns: TableInstanceColumns[] = [
  { title: '主键', slotName: 'id' },
  { title: '会话id', dataIndex: 'itemId' },
  { title: '消息id', dataIndex: 'messageId' },
  { title: '任务id', dataIndex: 'taskId' },
  { title: '提问', dataIndex: 'question', ellipsis: true, tooltip: true, width: 100 },
  { title: '回答', dataIndex: 'answer', ellipsis: true, tooltip: true, width: 100 },
  { title: '模型名称', dataIndex: 'model' },
  { title: '是否采纳,0:未点击.1:采纳.2,未采纳', dataIndex: 'adopt' },
  { title: 'ip信息', dataIndex: 'ip' },
  { title: '输入词块数', dataIndex: 'promptTokens' },
  { title: '输出词块数', dataIndex: 'completionTokens' },
  { title: '总词块数', dataIndex: 'totalTokens' },
  { title: '总请求耗时', dataIndex: 'responseTime' },
  { title: '聊天耗时', dataIndex: 'chatResponseTime' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '创建人', dataIndex: 'createUserString' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:chatMessage:delete'])
  }
]

const queryForm: ChatMessageQuery = reactive({
  itemId: undefined,
  messageId: undefined,
  taskId: undefined,
  createTime: undefined,
  createUser: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listChatMessage({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.itemId = undefined
  queryForm.messageId = undefined
  queryForm.taskId = undefined
  queryForm.createTime = undefined
  queryForm.createUser = undefined
  search()
}

// 删除
const onDelete = (item: ChatMessageResp) => {
  return handleDelete(() => deleteChatMessage(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportChatMessage(queryForm))
}

const ChatMessageDetailDrawerRef = ref<InstanceType<typeof ChatMessageDetailDrawer>>()
// 详情
const onDetail = (item: ChatMessageResp) => {
  ChatMessageDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
