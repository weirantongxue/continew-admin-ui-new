<template>
  <div class="gi_page">
    <a-card title="支付信息管理" class="general-card">
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
          <a-input v-model="queryForm.id" placeholder="请输入支付记录id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.orderNo" placeholder="请输入商户订单编号" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.transactionId" placeholder="请输入支付系统交易编号" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.paymentType" placeholder="请输入支付类型" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.tradeType" placeholder="请输入交易类型" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.tradeState" placeholder="请输入交易状态" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.createTime" placeholder="请输入创建时间" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:paymentInfo:export']" @click="onExport">
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
              v-permission="['ai:paymentInfo:delete']"
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

    <PaymentInfoDetailDrawer ref="PaymentInfoDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { listPaymentInfo, deletePaymentInfo, exportPaymentInfo, type PaymentInfoResp, type PaymentInfoQuery } from '@/apis/ai/paymentInfo'
import PaymentInfoDetailDrawer from './PaymentInfoDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'PaymentInfo' })

const columns: TableInstanceColumns[] = [
  { title: '支付记录id', slotName: 'id' },
  { title: '商户订单编号', dataIndex: 'orderNo' },
  { title: '支付系统交易编号', dataIndex: 'transactionId' },
  { title: '支付类型', dataIndex: 'paymentType' },
  { title: '交易类型', dataIndex: 'tradeType' },
  { title: '交易状态', dataIndex: 'tradeState' },
  { title: '支付金额(元)', dataIndex: 'payerTotal' },
  // { title: '通知参数', dataIndex: 'content' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:paymentInfo:update', 'ai:paymentInfo:delete'])
  }
]

const queryForm: PaymentInfoQuery = reactive({
  id: undefined,
  orderNo: undefined,
  transactionId: undefined,
  paymentType: undefined,
  tradeType: undefined,
  tradeState: undefined,
  createTime: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listPaymentInfo({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.id = undefined
  queryForm.orderNo = undefined
  queryForm.transactionId = undefined
  queryForm.paymentType = undefined
  queryForm.tradeType = undefined
  queryForm.tradeState = undefined
  queryForm.createTime = undefined
  search()
}

// 删除
const onDelete = (item: PaymentInfoResp) => {
  return handleDelete(() => deletePaymentInfo(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportPaymentInfo(queryForm))
}


const PaymentInfoDetailDrawerRef = ref<InstanceType<typeof PaymentInfoDetailDrawer>>()
// 详情
const onDetail = (item: PaymentInfoResp) => {
  PaymentInfoDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
