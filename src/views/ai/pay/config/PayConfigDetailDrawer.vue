<template>
  <a-drawer v-model:visible="visible" title="支付配置详情" :width="width >= 580 ? 580 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="支付名称">{{ dataDetail?.name }}</a-descriptions-item>
      <a-descriptions-item label="渠道图标">{{ dataDetail?.icon }}</a-descriptions-item>
      <a-descriptions-item label="支付方式: [1=余额支付, 2=微信支付, 3=支付宝支付]">{{ dataDetail?.way }}</a-descriptions-item>
      <a-descriptions-item label="备注信息">{{ dataDetail?.remark }}</a-descriptions-item>
      <a-descriptions-item label="配置参数">{{ dataDetail?.params }}</a-descriptions-item>
      <a-descriptions-item label="默认支付: [0=否的, 1=是的]">{{ dataDetail?.isDefault }}</a-descriptions-item>
      <a-descriptions-item label="方式状态: [0=关闭, 1=开启]">{{ dataDetail?.status }}</a-descriptions-item>
      <a-descriptions-item label="是否删除: [0=否, 1=是]">{{ dataDetail?.isDeleted }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
<!--      <a-descriptions-item label="创建人">{{ dataDetail?.createUser }}</a-descriptions-item>-->
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
<!--      <a-descriptions-item label="修改人">{{ dataDetail?.updateUser }}</a-descriptions-item>-->
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="排序编号">{{ dataDetail?.sort }}</a-descriptions-item>

    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getPayConfig, type PayConfigDetailResp } from '@/apis/ai/payConfig'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<PayConfigDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getPayConfig(dataId.value)
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
