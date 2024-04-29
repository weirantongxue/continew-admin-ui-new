<template>
  <div class="gi_page">
    <a-card title="AI模型管理" class="general-card">
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
          <a-input v-model="queryForm.name" placeholder="请输入模型名称" allow-clear @change="search">
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
          <a-input v-model="queryForm.apiKey" placeholder="请输入apikey" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input
            v-model="queryForm.resType"
            placeholder="请输入stream:流式,sync:同步,async:异步"
            allow-clear
            @change="search"
          >
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.status" placeholder="请输入状态（1：启用；2：禁用）" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-button v-permission="['ai:model:add']" type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:model:export']" @click="onExport">
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
            <a-link v-permission="['ai:model:update']" @click="onUpdate(record)">修改</a-link>
            <a-link
              v-permission="['ai:model:delete']"
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

    <ModelAddModal ref="ModelAddModalRef" @save-success="search" />
    <ModelDetailDrawer ref="ModelDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { listModel, deleteModel, exportModel, type ModelResp, type ModelQuery } from '@/apis/ai/model'
import ModelAddModal from './ModelAddModal.vue'
import ModelDetailDrawer from './ModelDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'AiModel' })

const columns: TableInstanceColumns[] = [
  { title: '主键', slotName: 'id' },
  { title: '模型名称', dataIndex: 'name' },
  { title: '模型类型,1:大语言模型,2:文生图', dataIndex: 'modelType' },
  { title: '模型图标', dataIndex: 'coverUrl' },
  { title: '模型地址', dataIndex: 'url' },
  { title: 'apikey', dataIndex: 'apiKey' },
  { title: '回调地址', dataIndex: 'callBack' },
  { title: 'stream:流式,sync:同步,async:异步', dataIndex: 'resType' },
  { title: '描述', dataIndex: 'introduction' },
  { title: '排序值', dataIndex: 'sort' },
  { title: '状态（1：启用；2：禁用）', dataIndex: 'status' },
  { title: '创建人', dataIndex: 'createUser' },
  { title: '创建时间', dataIndex: 'createTime' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:model:update', 'ai:model:delete'])
  }
]

const queryForm: ModelQuery = reactive({
  name: undefined,
  modelType: undefined,
  apiKey: undefined,
  resType: undefined,
  status: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listModel({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.name = undefined
  queryForm.modelType = undefined
  queryForm.apiKey = undefined
  queryForm.resType = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: ModelResp) => {
  return handleDelete(() => deleteModel(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportModel(queryForm))
}

const ModelAddModalRef = ref<InstanceType<typeof ModelAddModal>>()
// 新增
const onAdd = () => {
  ModelAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: ModelResp) => {
  ModelAddModalRef.value?.onUpdate(item.id)
}

const ModelDetailDrawerRef = ref<InstanceType<typeof ModelDetailDrawer>>()
// 详情
const onDetail = (item: ModelResp) => {
  ModelDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
