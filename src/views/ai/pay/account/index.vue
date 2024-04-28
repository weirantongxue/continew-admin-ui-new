<template>
  <div class="gi_page">
    <a-card title="部门账户管理" class="general-card">
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
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-button v-permission="['front:deptAccount:add']" type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-tooltip content="导出">
            <a-button v-permission="['front:deptAccount:export']" @click="onExport">
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
            <a-link v-permission="['front:deptAccount:update']" @click="onUpdate(record)">修改</a-link>
            <a-link
              v-permission="['front:deptAccount:delete']"
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

    <DeptAccountAddModal ref="DeptAccountAddModalRef" @save-success="search" />
    <DeptAccountDetailDrawer ref="DeptAccountDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { listDeptAccount, deleteDeptAccount, exportDeptAccount, type DeptAccountResp, type DeptAccountQuery } from '@/apis/ai/deptAccount'
import DeptAccountAddModal from './DeptAccountAddModal.vue'
import DeptAccountDetailDrawer from './DeptAccountDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'Account' })

const columns: TableInstanceColumns[] = [
  { title: '主键', dataIndex: 'id' },
  { title: '代币余额', dataIndex: 'balanceToken' },
  { title: '赠送代币', dataIndex: 'giveToken' },
  { title: '充值代币', dataIndex: 'rechargeToken' },
  { title: '充值金额', dataIndex: 'rechargeAmount' },
  { title: '部门账户信息', dataIndex: 'deptId' },
  { title: '创建人', dataIndex: 'createUser' },
  { title: '创建时间', dataIndex: 'createTime' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['front:deptAccount:update', 'front:deptAccount:delete'])
  }
]

const queryForm: DeptAccountQuery = reactive({
  deptId: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listDeptAccount({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.deptId = undefined
  search()
}

// 删除
const onDelete = (item: DeptAccountResp) => {
  return handleDelete(() => deleteDeptAccount(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportDeptAccount(queryForm))
}

const DeptAccountAddModalRef = ref<InstanceType<typeof DeptAccountAddModal>>()
// 新增
const onAdd = () => {
  DeptAccountAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: DeptAccountResp) => {
  DeptAccountAddModalRef.value?.onUpdate(item.id)
}

const DeptAccountDetailDrawerRef = ref<InstanceType<typeof DeptAccountDetailDrawer>>()
// 详情
const onDetail = (item: DeptAccountResp) => {
  DeptAccountDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
