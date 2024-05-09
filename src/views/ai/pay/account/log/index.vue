<template>
  <div class="gi_page">
    <a-card title="账户扣费记录管理" class="general-card">
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
          <a-input v-model="queryForm.deptId" placeholder="请输入部门账户信息" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.messageId" placeholder="请输入消息id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input
            v-model="queryForm.modelType"
            placeholder="请输入模型类型,1:大语言模型,2:文生图"
            allow-clear
            @change="search"
          >
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.token" placeholder="请输入消耗代币" allow-clear @change="search">
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
            <a-button v-permission="['ai:deptAccountLog:export']" class="gi_hover_btn-border" @click="onExport">
              <template #icon>
                <icon-download />
              </template>
            </a-button>
          </a-tooltip>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-link
              v-permission="['ai:deptAccountLog:delete']"
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
  </div>
</template>

<script setup lang="ts">
import {
  listDeptAccountLog,
  deleteDeptAccountLog,
  exportDeptAccountLog,
  type DeptAccountLogResp,
  type DeptAccountLogQuery
} from '@/apis/ai/deptAccountLog'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'DeptAccountLog' })

const columns: TableInstanceColumns[] = [
  // { title: '主键', dataIndex: 'id' },
  { title: '部门账户信息', dataIndex: 'deptId' },
  { title: '消息id', dataIndex: 'messageId' },
  { title: '模型类型', dataIndex: 'modelType' },
  { title: '消耗代币', dataIndex: 'token' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '创建人', dataIndex: 'createUser' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:deptAccountLog:delete'])
  }
]

const queryForm = reactive<DeptAccountLogQuery>({
  deptId: undefined,
  messageId: undefined,
  modelType: undefined,
  token: undefined,
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
} = useTable((p) => listDeptAccountLog({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.deptId = undefined
  queryForm.messageId = undefined
  queryForm.modelType = undefined
  queryForm.token = undefined
  queryForm.createTime = undefined
  queryForm.createUser = undefined
  search()
}

// 删除
const onDelete = (item: DeptAccountLogResp) => {
  return handleDelete(() => deleteDeptAccountLog(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportDeptAccountLog(queryForm))
}
</script>

<style lang="scss" scoped></style>
