<template>
  <a-drawer v-model:visible="visible" title="绘图任务详情" :width="720" :footer="false">
    <a-descriptions title="基本信息" :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="任务id">{{ dataDetail?.taskId }}</a-descriptions-item>
      <!-- <a-descriptions-item label="问题">{{ dataDetail?.prompt }}</a-descriptions-item> -->
      <!-- <a-descriptions-item label="拼接图">{{ dataDetail?.mosaicImg }}</a-descriptions-item> -->
      <a-descriptions-item label="传递id">{{ dataDetail?.nonce }}</a-descriptions-item>
      <!-- <a-descriptions-item label="任务状态">{{ dataDetail?.state }}</a-descriptions-item> -->
      <a-descriptions-item label="任务状态">
        <a-tag v-if="dataDetail?.state !== 'success'" color="orange">失败</a-tag>
        <a-tag v-else color="green">成功</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions
      title="prompt"
      :column="2"
      size="large"
      class="general-description http"
      style="margin-top: 20px; position: relative"
    >
      <a-descriptions-item :span="2">
        <a-typography-paragraph copyable>
          {{ dataDetail?.prompt }}
        </a-typography-paragraph>
      </a-descriptions-item>
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
