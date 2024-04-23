<template>
  <a-drawer v-model:visible="visible" title="绘图任务详情" :width="width >= 580 ? 580 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="任务id">{{ dataDetail?.taskId }}</a-descriptions-item>
      <a-descriptions-item label="问题">{{ dataDetail?.prompt }}</a-descriptions-item>
      <a-descriptions-item label="拼接图">{{ dataDetail?.mosaicImg }}</a-descriptions-item>
      <a-descriptions-item label="传递id">{{ dataDetail?.nonce }}</a-descriptions-item>
      <a-descriptions-item label="任务状态success">{{ dataDetail?.state }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="创建人id">{{ dataDetail?.createUser }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getDrawTask, type DrawTaskDetailResp } from '@/apis/ai/drawTask'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<DrawTaskDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getDrawTask(dataId.value)
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
