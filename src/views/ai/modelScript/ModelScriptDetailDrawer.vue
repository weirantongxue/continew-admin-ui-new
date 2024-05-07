<template>
  <a-drawer v-model:visible="visible" title="模型预设脚本详情" :width="720" :footer="false">
    <a-descriptions title="基本信息" :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="脚本名称">{{ dataDetail?.name }}</a-descriptions-item>
      <a-descriptions-item label="模型名称">{{ dataDetail?.modelId }}</a-descriptions-item>
      <a-descriptions-item label="预设内容">{{ dataDetail?.prompt }}</a-descriptions-item>
<!--      <a-descriptions-item label="封面">{{ dataDetail?.coverUrl }}</a-descriptions-item>-->
      <a-descriptions-item label="组件路径">{{ dataDetail?.component }}</a-descriptions-item>
      <a-descriptions-item label="描述">{{ dataDetail?.description }}</a-descriptions-item>
      <a-descriptions-item label="排序值">{{ dataDetail?.sort }}</a-descriptions-item>
      <a-descriptions-item label="状态">{{ dataDetail?.status }}</a-descriptions-item>
<!--      <a-descriptions-item label="创建人">{{ dataDetail?.createUser }}</a-descriptions-item>-->
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
<!--      <a-descriptions-item label="修改人">{{ dataDetail?.updateUser }}</a-descriptions-item>-->
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="修改时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>

    <a-descriptions
      title="封面"
      :column="2"
      size="large"
      class="general-description http"
      style="margin-top: 20px; position: relative"
    >
      <a-descriptions-item :span="2">
        <a-typography-paragraph>
          {{ dataDetail?.coverUrl }}
        </a-typography-paragraph>
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getModelScript, type ModelScriptDetailResp } from '@/apis/ai/modelScript'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<ModelScriptDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getModelScript(dataId.value)
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
