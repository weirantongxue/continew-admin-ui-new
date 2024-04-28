<template>
  <a-drawer v-model:visible="visible" title="订单信息详情" :width="width >= 580 ? 580 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="订单id">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="订单标题">{{ dataDetail?.title }}</a-descriptions-item>
      <a-descriptions-item label="商户订单编号">{{ dataDetail?.orderNo }}</a-descriptions-item>
      <a-descriptions-item label="支付产品id">{{ dataDetail?.productId }}</a-descriptions-item>
      <a-descriptions-item label="订单金额(元)">{{ dataDetail?.totalFee }}</a-descriptions-item>
      <a-descriptions-item label="订单二维码连接">{{ dataDetail?.codeUrl }}</a-descriptions-item>
      <a-descriptions-item label="部门账户信息">{{ dataDetail?.deptId }}</a-descriptions-item>
      <a-descriptions-item label="订单状态">{{ dataDetail?.orderStatus }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUser }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUser }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getOrderInfo, type OrderInfoDetailResp } from '@/apis/ai/orderInfo'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<OrderInfoDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getOrderInfo(dataId.value)
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
