<template>
  <a-drawer v-model:visible="visible" title="AI模型详情" :width="width >= 600 ? 600 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="模型名称">{{ dataDetail?.name }}</a-descriptions-item>
      <a-descriptions-item label="模型编码">{{ dataDetail?.modelCode }}</a-descriptions-item>
      <a-descriptions-item label="模型类型">{{ dataDetail?.modelType }}</a-descriptions-item>
      <a-descriptions-item label="预设prompt">{{ dataDetail?.systemPrompt }}</a-descriptions-item>
      <a-descriptions-item label="模型图标">{{ dataDetail?.icon }}</a-descriptions-item>
      <a-descriptions-item label="模型地址">{{ dataDetail?.url }}</a-descriptions-item>
      <a-descriptions-item label="apikey">{{ dataDetail?.apiKey }}</a-descriptions-item>
      <a-descriptions-item label="回调地址">{{ dataDetail?.callBack }}</a-descriptions-item>
      <a-descriptions-item label="请求方式">{{ dataDetail?.resType }}</a-descriptions-item>
      <a-descriptions-item label="描述">{{ dataDetail?.introduction }}</a-descriptions-item>
      <a-descriptions-item label="排序值">{{ dataDetail?.sort }}</a-descriptions-item>
      <a-descriptions-item label="状态">{{ dataDetail?.status }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUser }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUser }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="修改时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type ModelDetailResp, getModel as getDetail } from '@/apis/ai/model'

const { width } = useWindowSize()

const dataId = ref('')
const dataDetail = ref<ModelDetailResp>()
const visible = ref(false)

// 查询详情
const getDataDetail = async () => {
  const { data } = await getDetail(dataId.value)
  dataDetail.value = data
}

// 打开
const onOpen = async (id: string) => {
  dataId.value = id
  await getDataDetail()
  visible.value = true
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
