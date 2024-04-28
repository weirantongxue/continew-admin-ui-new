<template>
  <div class="gi_page">
    <a-card title="订单信息管理" class="general-card">
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
          <a-input v-model="queryForm.title" placeholder="请输入订单标题" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.orderNo" placeholder="请输入商户订单编号" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.productId" placeholder="请输入支付产品id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.orderStatus" placeholder="请输入订单状态" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:orderInfo:export']" @click="onExport">
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
              v-permission="['ai:orderInfo:delete']"
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

    <OrderInfoAddModal ref="OrderInfoAddModalRef" @save-success="search" />
    <OrderInfoDetailDrawer ref="OrderInfoDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { listOrderInfo, deleteOrderInfo, exportOrderInfo, type OrderInfoResp, type OrderInfoQuery } from '@/apis/ai/orderInfo'
import OrderInfoDetailDrawer from './OrderInfoDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'OrderInfo' })

const columns: TableInstanceColumns[] = [
  { title: '订单id', dataIndex: 'id' },
  { title: '订单标题', dataIndex: 'title' },
  { title: '商户订单编号', dataIndex: 'orderNo' },
  { title: '支付产品id', dataIndex: 'productId' },
  { title: '订单金额(元)', dataIndex: 'totalFee' },
  { title: '订单二维码连接', dataIndex: 'codeUrl' },
  { title: '部门账户信息', dataIndex: 'deptId' },
  { title: '订单状态', dataIndex: 'orderStatus' },
  { title: '创建人', dataIndex: 'createUser' },
  { title: '创建时间', dataIndex: 'createTime' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:orderInfo:update', 'ai:orderInfo:delete'])
  }
]

const queryForm: OrderInfoQuery = reactive({
  title: undefined,
  orderNo: undefined,
  productId: undefined,
  orderStatus: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listOrderInfo({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.title = undefined
  queryForm.orderNo = undefined
  queryForm.productId = undefined
  queryForm.orderStatus = undefined
  search()
}

// 删除
const onDelete = (item: OrderInfoResp) => {
  return handleDelete(() => deleteOrderInfo(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportOrderInfo(queryForm))
}

const OrderInfoDetailDrawerRef = ref<InstanceType<typeof OrderInfoDetailDrawer>>()
// 详情
const onDetail = (item: OrderInfoResp) => {
  OrderInfoDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
