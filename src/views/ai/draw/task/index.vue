<template>
  <div class="gi_page">
    <a-card title="绘图任务管理" class="general-card">
      <GiTable
        ref="tableRef"
        row-key="id"
        :data="dataList"
        :columns="columns"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="pagination"
        :disabledColumnKeys="['name']"
        @refresh="search"
      >
        <template #custom-left>
          <a-input v-model="queryForm.taskId" placeholder="请输入任务id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.state" placeholder="请输入任务状态success" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:drawTask:export']" @click="onExport">
              <template #icon>
                <icon-download />
              </template>
            </a-button>
          </a-tooltip>
        </template>
        <template #name="{ record }">
          <a-link @click="onDetail(record)">{{ record.name }}</a-link>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-link
              v-permission="['ai:drawTask:delete']"
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

    <DrawTaskDetailDrawer ref="DrawTaskDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { listDrawTask, deleteDrawTask, exportDrawTask, type DrawTaskResp, type DrawTaskQuery } from '@/apis/ai/drawTask'
import DrawTaskDetailDrawer from './DrawTaskDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'AiDrawTask' })

const columns: TableInstanceColumns[] = [
  { title: '主键', dataIndex: 'id' },
  { title: '任务id', dataIndex: 'taskId' },
  { title: '问题', dataIndex: 'prompt' },
  { title: '拼接图', dataIndex: 'mosaicImg' },
  { title: '传递id', dataIndex: 'nonce' },
  { title: '任务状态success', dataIndex: 'state' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '创建人', dataIndex: 'createUser' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:drawTask:update', 'ai:drawTask:delete'])
  }
]

const queryForm: DrawTaskQuery = reactive({
  taskId: undefined,
  state: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listDrawTask({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.taskId = undefined
  queryForm.state = undefined
  search()
}

// 删除
const onDelete = (item: DrawTaskResp) => {
  return handleDelete(() => deleteDrawTask(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportDrawTask(queryForm))
}

const DrawTaskDetailDrawerRef = ref<InstanceType<typeof DrawTaskDetailDrawer>>()
// 详情
const onDetail = (item: DrawTaskResp) => {
  DrawTaskDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
