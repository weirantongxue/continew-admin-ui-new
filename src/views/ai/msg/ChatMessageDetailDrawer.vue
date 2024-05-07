<template>
  <a-drawer v-model:visible="visible" title="对话详情" :width="720" :footer="false">
    <a-descriptions title="基本信息" :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="会话id">{{ dataDetail?.itemId }}</a-descriptions-item>
      <a-descriptions-item label="消息id">{{ dataDetail?.messageId }}</a-descriptions-item>
      <a-descriptions-item label="任务id">{{ dataDetail?.taskId }}</a-descriptions-item>
      <a-descriptions-item label="模型名称">{{ dataDetail?.model }}</a-descriptions-item>
      <a-descriptions-item label="是否采纳">{{ dataDetail?.adopt }}</a-descriptions-item>
      <a-descriptions-item label="ip信息">{{ dataDetail?.ip }}</a-descriptions-item>
      <a-descriptions-item label="输入词块数">{{ dataDetail?.promptTokens }}</a-descriptions-item>
      <a-descriptions-item label="输出词块数">{{ dataDetail?.completionTokens }}</a-descriptions-item>
      <a-descriptions-item label="总词块数">{{ dataDetail?.totalTokens }}</a-descriptions-item>
      <!-- <a-descriptions-item label="总请求耗时">{{ dataDetail?.responseTime }}</a-descriptions-item> -->
      <a-descriptions-item label="总请求耗时">
        <a-tag v-if="dataDetail?.responseTime > 60000" color="red"> {{ dataDetail?.responseTime }}ms </a-tag>
        <a-tag v-else-if="dataDetail?.responseTime > 30000" color="orange"> {{ dataDetail?.responseTime }}ms </a-tag>
        <a-tag v-else color="green">{{ dataDetail?.responseTime }} ms</a-tag>
      </a-descriptions-item>
      <!-- <a-descriptions-item label="聊天耗时">{{ dataDetail?.chatResponseTime }}</a-descriptions-item> -->

      <a-descriptions-item label="聊天耗时">
        <a-tag v-if="dataDetail?.chatResponseTime > 60000" color="red"> {{ dataDetail?.chatResponseTime }}ms </a-tag>
        <a-tag v-else-if="dataDetail?.chatResponseTime > 30000" color="orange">
          {{ dataDetail?.chatResponseTime }}ms
        </a-tag>
        <a-tag v-else color="green">{{ dataDetail?.chatResponseTime }} ms</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions
      title="提问"
      :column="2"
      size="large"
      class="general-description http"
      style="margin-top: 20px; position: relative"
    >
      <a-descriptions-item :span="2">
        <a-typography-paragraph copyable>
          {{ dataDetail?.question }}
        </a-typography-paragraph>
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions
      title="回答"
      :column="2"
      size="large"
      class="general-description http"
      style="margin-top: 20px; position: relative"
    >
      <a-descriptions-item :span="2">
        <a-typography-paragraph copyable>
          {{ dataDetail?.answer }}
        </a-typography-paragraph>
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getChatMessage, type ChatMessageDetailResp } from '@/apis/ai/chatMessage'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<ChatMessageDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getChatMessage(dataId.value)
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
