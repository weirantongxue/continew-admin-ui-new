<template>
  <a-drawer v-model:visible="visible" title="AI模型详情" :width="width >= 580 ? 580 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="模型名称">{{ dataDetail?.name }}</a-descriptions-item>
      <a-descriptions-item label="模型类型,1:大语言模型,2:文生图">{{ dataDetail?.modelType }}</a-descriptions-item>
      <a-descriptions-item label="模型图标">{{ dataDetail?.coverUrl }}</a-descriptions-item>
      <a-descriptions-item label="模型地址">{{ dataDetail?.url }}</a-descriptions-item>
      <a-descriptions-item label="apikey">{{ dataDetail?.apiKey }}</a-descriptions-item>
      <a-descriptions-item label="回调地址">{{ dataDetail?.callBack }}</a-descriptions-item>
      <a-descriptions-item label="stream:流式,sync:同步,async:异步">{{ dataDetail?.resType }}</a-descriptions-item>
      <a-descriptions-item label="描述">{{ dataDetail?.introduction }}</a-descriptions-item>
      <a-descriptions-item label="排序值">{{ dataDetail?.sort }}</a-descriptions-item>
      <a-descriptions-item label="状态（1：启用；2：禁用）">{{ dataDetail?.status }}</a-descriptions-item>
      <a-descriptions-item label="是否删除: 0=否, 1=是">{{ dataDetail?.isDelete }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUser }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUser }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="修改时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getModel, type ModelDetailResp } from '@/apis/ai/model'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<ModelDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getModel(dataId.value)
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
