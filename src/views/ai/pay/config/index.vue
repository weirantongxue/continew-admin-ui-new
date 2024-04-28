<template>
  <div class="gi_page">
    <a-card title="支付配置管理" class="general-card">
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
          <a-input v-model="queryForm.id" placeholder="请输入主键" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.name" placeholder="请输入支付名称" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.status" placeholder="请输入方式状态: [0=关闭, 1=开启]" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-button v-permission="['ai:payConfig:add']" type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:payConfig:export']" @click="onExport">
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
            <a-link v-permission="['ai:payConfig:update']" @click="onUpdate(record)">修改</a-link>
            <a-link
              v-permission="['ai:payConfig:delete']"
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

    <PayConfigAddModal ref="PayConfigAddModalRef" @save-success="search" />
    <PayConfigDetailDrawer ref="PayConfigDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { listPayConfig, deletePayConfig, exportPayConfig, type PayConfigResp, type PayConfigQuery } from '@/apis/ai/payConfig'
import PayConfigAddModal from './PayConfigAddModal.vue'
import PayConfigDetailDrawer from './PayConfigDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'PayConfig' })

const columns: TableInstanceColumns[] = [
  { title: '主键', dataIndex: 'id' },
  { title: '支付名称', dataIndex: 'name' },
  { title: '渠道图标', dataIndex: 'icon' },
  { title: '支付方式: [1=余额支付, 2=微信支付, 3=支付宝支付]', dataIndex: 'way' },
  { title: '排序编号', dataIndex: 'sort' },
  { title: '备注信息', dataIndex: 'remark' },
  { title: '配置参数', dataIndex: 'params' },
  { title: '默认支付: [0=否的, 1=是的]', dataIndex: 'isDefault' },
  { title: '方式状态: [0=关闭, 1=开启]', dataIndex: 'status' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '创建人', dataIndex: 'createUser' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:payConfig:update', 'ai:payConfig:delete'])
  }
]

const queryForm: PayConfigQuery = reactive({
  id: undefined,
  name: undefined,
  status: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listPayConfig({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.id = undefined
  queryForm.name = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: PayConfigResp) => {
  return handleDelete(() => deletePayConfig(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportPayConfig(queryForm))
}

const PayConfigAddModalRef = ref<InstanceType<typeof PayConfigAddModal>>()
// 新增
const onAdd = () => {
  PayConfigAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: PayConfigResp) => {
  PayConfigAddModalRef.value?.onUpdate(item.id)
}

const PayConfigDetailDrawerRef = ref<InstanceType<typeof PayConfigDetailDrawer>>()
// 详情
const onDetail = (item: PayConfigResp) => {
  PayConfigDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
