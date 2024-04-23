<template>
  <a-drawer v-model:visible="visible" title="绘图素材详情" :width="width >= 580 ? 580 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="主键">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="任务id">{{ dataDetail?.taskId }}</a-descriptions-item>
      <a-descriptions-item label="图片地址">{{ dataDetail?.imageUrl }}</a-descriptions-item>
      <a-descriptions-item label="是否删除: [0=否, 1=是]">{{ dataDetail?.isDeleted }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUser }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUser }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getDrawImg, type DrawImgDetailResp } from '@/apis/ai/drawImg'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const visible = ref(false)
const dataId = ref('')
const dataDetail = ref<DrawImgDetailResp>()
// 查询详情
const getDataDetail = async () => {
  const res = await getDrawImg(dataId.value)
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
