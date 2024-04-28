<template>
  <a-drawer v-model:visible="visible" title="部门账户详情" :width="width >= 580 ? 580 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="代币余额">{{ dataDetail?.balanceToken }}</a-descriptions-item>
      <a-descriptions-item label="赠送代币">{{ dataDetail?.giveToken }}</a-descriptions-item>
      <a-descriptions-item label="充值代币">{{ dataDetail?.rechargeToken }}</a-descriptions-item>
      <a-descriptions-item label="充值金额">{{ dataDetail?.rechargeAmount }}</a-descriptions-item>
      <a-descriptions-item label="部门账户信息">{{ dataDetail?.deptId }}</a-descriptions-item>
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
import { getDeptAccount, type DeptAccountDetailResp } from '@/apis/ai/deptAccount'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<DeptAccountDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getDeptAccount(dataId.value)
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
