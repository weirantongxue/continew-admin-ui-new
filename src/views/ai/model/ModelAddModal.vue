<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :modal-style="{ maxWidth: '520px' }"
    width="90%"
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import type { ModelResp } from './type'
import { getModel, addModel, updateModel } from '@/apis/ai/model'
import { Message } from '@arco-design/web-vue'
import { GiForm, type Columns } from '@/components/GiForm'
import { useForm } from '@/hooks'

const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改AI模型' : '新增AI模型'))
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  {
    label: '模型名称',
    field: 'name',
    type: 'input',
    rules: [{ required: true, message: '请输入模型名称' }]
  },
  {
    label: '模型类型',
    field: 'modelType',
    type: 'select',
    options: [
      { label: '大语言模型', value: '1' },
      { label: '文生图', value: '2' }
      // 添加更多选项...
    ],
    rules: [{ required: true, message: '请输入模型类型' }]
  },
  {
    label: '模型图标',
    field: 'coverUrl',
    type: 'input'
  },
  {
    label: '模型地址',
    field: 'url',
    type: 'input',
    rules: [{ required: true, message: '请输入模型地址' }]
  },
  {
    label: 'apikey',
    field: 'apiKey',
    type: 'input'
  },
  {
    label: '回调地址',
    field: 'callBack',
    type: 'input'
  },
  {
    label: '接口类型',
    field: 'resType',
    type: 'select',
    options: [
      { label: '流式', value: 'stream' },
      { label: '同步', value: 'sync' },
      { label: '异步', value: 'async' }
      // 添加更多选项...
    ],
    rules: [{ required: true, message: '请输入接口类型' }]
  },
  {
    label: '描述',
    field: 'introduction',
    type: 'input'
  },
  {
    label: '排序值',
    field: 'sort',
    type: 'input',
    rules: [{ required: true, message: '请输入排序值' }]
  },
  {
    label: '状态',
    field: 'status',
    type: 'switch',
    props: {
      type: 'round',
      checkedValue: 1,
      uncheckedValue: 2,
      checkedText: '启用',
      uncheckedText: '禁用'
    }
  }
]

const { form, resetForm } = useForm<ModelResp>({
  sort: 999,
  status: 1
})

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

const visible = ref(false)
// 新增
const onAdd = () => {
  reset()
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const res = await getModel(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateModel(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addModel(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

defineExpose({ onAdd, onUpdate })
</script>
