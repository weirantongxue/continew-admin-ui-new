<template>
  <div class="gi_page">
    <a-card title="AI会话管理" class="general-card">
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
          <a-input v-model="queryForm.name" placeholder="请输入会话名称" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.modelScriptId" placeholder="请输入脚本id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.createTime" placeholder="请输入创建时间" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:item:export']" @click="onExport">
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
              v-permission="['ai:item:delete']"
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

    <ItemDetailDrawer ref="ItemDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { listItem, deleteItem, exportItem, type ItemResp, type ItemQuery } from '@/apis/ai/item'
import ItemDetailDrawer from './ItemDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'AiItem' })

const columns: TableInstanceColumns[] = [
  // { title: '主键', slotName: 'id' },
  { title: '会话名称', slotName: 'name' },
  { title: '脚本id', dataIndex: 'modelScriptId',width: 80},
  // { title: '最后一条消息', dataIndex: 'lastMessage' },
  { title: '消息数', dataIndex: 'number',width: 80 },
  { title: '创建时间', dataIndex: 'createTime',width: 200 },
  { title: '创建人', dataIndex: 'createUserString'},
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:item:delete'])
  }
]

const queryForm: ItemQuery = reactive({
  name: undefined,
  modelScriptId: undefined,
  createTime: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listItem({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.name = undefined
  queryForm.modelScriptId = undefined
  queryForm.createTime = undefined
  search()
}

// 删除
const onDelete = (item: ItemResp) => {
  return handleDelete(() => deleteItem(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportItem(queryForm))
}

const ItemDetailDrawerRef = ref<InstanceType<typeof ItemDetailDrawer>>()
// 详情
const onDetail = (item: ItemResp) => {
  ItemDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
