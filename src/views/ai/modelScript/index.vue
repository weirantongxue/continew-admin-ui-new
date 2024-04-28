<template>
  <div class="gi_page">
    <a-card title="模型预设脚本管理" class="general-card">
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
          <a-input v-model="queryForm.name" placeholder="请输入脚本名称" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.modelId" placeholder="请输入模型名称" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-button v-permission="['ai:modelScript:add']" type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:modelScript:export']" @click="onExport">
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
            <a-link v-permission="['ai:modelScript:update']" @click="onUpdate(record)">修改</a-link>
            <a-link
              v-permission="['ai:modelScript:delete']"
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

    <ModelScriptAddModal ref="ModelScriptAddModalRef" @save-success="search" />
    <ModelScriptDetailDrawer ref="ModelScriptDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import {
  listModelScript,
  deleteModelScript,
  exportModelScript,
  type ModelScriptResp,
  type ModelScriptQuery
} from '@/apis/ai/modelScript'
import ModelScriptAddModal from './ModelScriptAddModal.vue'
import ModelScriptDetailDrawer from './ModelScriptDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'AiModelScript' })

const columns: TableInstanceColumns[] = [
  { title: '主键', dataIndex: 'id' },
  { title: '脚本名称', dataIndex: 'name' },
  { title: '模型名称', dataIndex: 'modelId' },
  { title: '预设内容', dataIndex: 'prompt' },
  { title: '封面', dataIndex: 'coverUrl' },
  { title: '组件路径', dataIndex: 'component' },
  { title: '描述', dataIndex: 'description' },
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
    show: has.hasPermOr(['ai:modelScript:update', 'ai:modelScript:delete'])
  }
]

const queryForm: ModelScriptQuery = reactive({
  name: undefined,
  modelId: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listModelScript({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.name = undefined
  queryForm.modelId = undefined
  search()
}

// 删除
const onDelete = (item: ModelScriptResp) => {
  return handleDelete(() => deleteModelScript(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportModelScript(queryForm))
}

const ModelScriptAddModalRef = ref<InstanceType<typeof ModelScriptAddModal>>()
// 新增
const onAdd = () => {
  ModelScriptAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: ModelScriptResp) => {
  ModelScriptAddModalRef.value?.onUpdate(item.id)
}

const ModelScriptDetailDrawerRef = ref<InstanceType<typeof ModelScriptDetailDrawer>>()
// 详情
const onDetail = (item: ModelScriptResp) => {
  ModelScriptDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
