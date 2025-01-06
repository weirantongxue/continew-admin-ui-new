<template>
  <div class="table-page">
    <GiTable
      title="AI模型管理"
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 2000 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['name']"
      @refresh="search"
    >
      <template #toolbar-left>
        <a-input-search v-model="queryForm.name" placeholder="请输入模型名称" allow-clear @search="search" />
        <a-select
          v-model="queryForm.modelName"
          :options="model"
          placeholder="基座模型"
          allow-clear
          style="width: 150px"
          @change="search"
        />
        <a-select
          v-model="queryForm.modelType"
          :options="model_type"
          placeholder="模型类型"
          allow-clear
          style="width: 150px"
          @change="search"
        />
        <a-select
          v-model="queryForm.modelType"
          :options="status"
          placeholder="状态"
          allow-clear
          style="width: 150px"
          @change="search"
        />
        <a-input-search v-model="queryForm.createUser" placeholder="请输入创建人" allow-clear @search="search" />
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #toolbar-right>
        <a-button v-permission="['ai:model:add']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <template #default>新增</template>
        </a-button>
        <a-button v-permission="['ai:model:export']" @click="onExport">
          <template #icon><icon-download /></template>
          <template #default>导出</template>
        </a-button>
      </template>
      <template #modelName="{ record }">
        <GiCellTag :value="record.modelName" :dict="model" />
      </template>
      <template #modelType="{ record }">
        <GiCellTag :value="record.modelType" :dict="model_type" />
      </template>
      <template #resType="{ record }">
        <GiCellTag :value="record.resType" :dict="model_res_type" />
      </template>
      <template #status="{ record }">
        <GiCellTag :value="record.status" :dict="status" />
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['ai:model:detail']" title="详情" @click="onDetail(record)">详情</a-link>
          <a-link v-permission="['ai:model:update']" title="修改" @click="onUpdate(record)">修改</a-link>
          <a-link
            v-permission="['ai:model:delete']"
            status="danger"
            :disabled="record.disabled"
            :title="record.disabled ? '不可删除' : '删除'"
            @click="onDelete(record)"
          >
            删除
          </a-link>
        </a-space>
      </template>
    </GiTable>

    <ModelAddModal ref="ModelAddModalRef" @save-success="search" />
    <ModelDetailDrawer ref="ModelDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import ModelAddModal from './ModelAddModal.vue'
import ModelDetailDrawer from './ModelDetailDrawer.vue'
import { type ModelQuery, type ModelResp, deleteModel, exportModel, listModel } from '@/apis/ai/model'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useDownload, useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'AiModel' })

const { model_res_type, model_type, model, status } = useDict('model_res_type', 'model_type', 'model', 'status')

const queryForm = reactive<ModelQuery>({
  name: undefined,
  modelName: undefined,
  modelType: undefined,
  status: undefined,
  createUser: undefined,
  sort: ['id,desc'],
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete,
} = useTable((page) => listModel({ ...queryForm, ...page }), { immediate: true })
const columns = ref<TableInstanceColumns[]>([
  // { title: '主键', dataIndex: 'id', slotName: 'id', fixed: !isMobile() ? 'left' : undefined, minWidth: 140, ellipsis: true, tooltip: true },
  { title: '模型名称', dataIndex: 'name', slotName: 'name', minWidth: 140, ellipsis: true, tooltip: true, fixed: !isMobile() ? 'left' : undefined },
  { title: '基座模型', dataIndex: 'modelName', slotName: 'modelName' },
  { title: '模型类型', dataIndex: 'modelType', slotName: 'modelType' },
  { title: '预设prompt', dataIndex: 'systemPrompt', slotName: 'systemPrompt', minWidth: 140, ellipsis: true, tooltip: true },
  { title: '模型图标', dataIndex: 'icon', slotName: 'icon' },
  { title: '模型地址', dataIndex: 'url', slotName: 'url', minWidth: 140, ellipsis: true, tooltip: true },
  { title: 'apikey', dataIndex: 'apiKey', slotName: 'apiKey', minWidth: 140, ellipsis: true, tooltip: true },
  { title: '回调地址', dataIndex: 'callBack', slotName: 'callBack' },
  { title: '请求方式', dataIndex: 'resType', slotName: 'resType' },
  { title: '描述', dataIndex: 'introduction', slotName: 'introduction' },
  { title: '排序值', dataIndex: 'sort', slotName: 'sort' },
  { title: '状态', dataIndex: 'status', slotName: 'status' },
  { title: '创建人', dataIndex: 'createUserString', slotName: 'createUser', width: 140, ellipsis: true, tooltip: true, show: false },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime', width: 180 },
  { title: '修改人', dataIndex: 'updateUserString', slotName: 'updateUser', width: 140, ellipsis: true, tooltip: true, show: false },
  { title: '修改时间', dataIndex: 'updateTime', slotName: 'updateTime', width: 180 },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 160,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:model:detail', 'ai:model:update', 'ai:model:delete']),
  },
])

// 重置
const reset = () => {
  queryForm.name = undefined
  queryForm.modelName = undefined
  queryForm.modelType = undefined
  queryForm.status = undefined
  queryForm.createUser = undefined
  search()
}

// 删除
const onDelete = (record: ModelResp) => {
  return handleDelete(() => deleteModel(record.id), {
    content: `是否确定删除该条数据？`,
    showModal: true,
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
const onUpdate = (record: ModelResp) => {
  ModelAddModalRef.value?.onUpdate(record.id)
}

const ModelDetailDrawerRef = ref<InstanceType<typeof ModelDetailDrawer>>()
// 详情
const onDetail = (record: ModelResp) => {
  ModelDetailDrawerRef.value?.onOpen(record.id)
}
</script>

<style scoped lang="scss"></style>
