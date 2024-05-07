<template>
  <div class="gi_page">
    <a-card title="绘图素材管理" class="general-card">
      <GiTable
        ref="tableRef"
        row-key="id"
        :data="dataList"
        :columns="columns"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="pagination"
        :disabledColumnKeys="['name']"
        @refresh="search"
      >
        <template #custom-left>
          <a-input v-model="queryForm.taskId" placeholder="请输入任务id" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input v-model="queryForm.createTime" placeholder="请输入创建时间" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-tooltip content="导出">
            <a-button v-permission="['ai:drawImg:export']" @click="onExport">
              <template #icon>
                <icon-download />
              </template>
            </a-button>
          </a-tooltip>
        </template>
        <template #name="{ record }">
          <a-link @click="onDetail(record)">{{ record.name }}</a-link>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-link
              v-permission="['ai:drawImg:delete']"
              status="danger"
              :disabled="record.disabled"
              @click="onDelete(record)"
            >
              删除
            </a-link>
          </a-space>
        </template>
      </GiTable>
    </a-card>

    <DrawImgDetailDrawer ref="DrawImgDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { listDrawImg, deleteDrawImg, exportDrawImg, type DrawImgResp, type DrawImgQuery } from '@/apis/ai/drawImg'
import DrawImgDetailDrawer from './DrawImgDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable, useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'AiDrawImg' })

const columns: TableInstanceColumns[] = [
  // { title: '主键', dataIndex: 'id' },
  { title: '任务id', dataIndex: 'taskId' },
  { title: '图片地址', dataIndex: 'imageUrl' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '创建人', dataIndex: 'createUserString' },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['ai:drawImg:update', 'ai:drawImg:delete'])
  }
]

const queryForm: DrawImgQuery = reactive({
  taskId: undefined,
  createTime: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listDrawImg({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.taskId = undefined
  queryForm.createTime = undefined
  search()
}

// 删除
const onDelete = (item: DrawImgResp) => {
  return handleDelete(() => deleteDrawImg(item.id), {
    content: `是否确定删除该条数据？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportDrawImg(queryForm))
}

const DrawImgDetailDrawerRef = ref<InstanceType<typeof DrawImgDetailDrawer>>()
// 详情
const onDetail = (item: DrawImgResp) => {
  DrawImgDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
