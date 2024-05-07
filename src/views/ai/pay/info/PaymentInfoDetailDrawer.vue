<template>
  <a-drawer v-model:visible="visible" title="支付信息详情" :width="720" :footer="false">
    <a-descriptions title="基本信息" :column="2" size="large" class="general-description">
      <a-descriptions-item label="支付记录id">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="商户订单编号">{{ dataDetail?.orderNo }}</a-descriptions-item>
      <a-descriptions-item label="支付系统交易编号">{{ dataDetail?.transactionId }}</a-descriptions-item>
      <a-descriptions-item label="支付类型">{{ dataDetail?.paymentType }}</a-descriptions-item>
      <a-descriptions-item label="交易类型">{{ dataDetail?.tradeType }}</a-descriptions-item>
      <a-descriptions-item label="交易状态">{{ dataDetail?.tradeState }}</a-descriptions-item>
      <a-descriptions-item label="支付金额(元)">{{ dataDetail?.payerTotal }}</a-descriptions-item>
<!--      <a-descriptions-item label="通知参数">{{ dataDetail?.content }}</a-descriptions-item>-->
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>

    <a-descriptions
      title="通知参数"
      :column="2"
      size="large"
      class="general-description http"
      style="margin-top: 20px; position: relative"

    >
      <a-descriptions-item :span="2">
        <a-tabs type="card">
          <a-tab-pane title="参数">
            <JsonPretty v-if="dataDetail?.content" :json="dataDetail?.content" />
            <span v-else>无</span>
          </a-tab-pane>
        </a-tabs>
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getPaymentInfo, type PaymentInfoDetailResp } from '@/apis/ai/paymentInfo'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<PaymentInfoDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getPaymentInfo(dataId.value)
  dataDetail.value = res.data
}

// 打开详情
const onDetail = async (id: string) => {
  dataId.value = id
  await getDataDetail()
  visible.value = true
}

defineExpose({ onDetail })
</script>

<style lang="scss" scoped></style>
