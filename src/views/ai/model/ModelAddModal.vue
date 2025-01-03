<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 600 ? 600 : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { addModel, getModel, updateModel } from '@/apis/ai/model'
import { type Columns, GiForm, type Options } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { useDict } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改AI模型' : '新增AI模型'))
const formRef = ref<InstanceType<typeof GiForm>>()
const { model_res_type, model_type, model } = useDict('model_res_type', 'model_type', 'model')

const options: Options = {
  form: { size: 'large' },
  btns: { hide: true },
}

const [form, resetForm] = useResetReactive({
  // todo 待补充
})

const columns: Columns = reactive<Columns>([
  {
    label: '模型名称',
    field: 'name',
    type: 'input',
    rules: [{ required: true }],
  },
  {
    label: '模型编码',
    field: 'modelCode',
    type: 'select',
    options: model,
    rules: [{ required: true }],
  },
  {
    label: '模型类型',
    field: 'modelType',
    type: 'select',
    options: model_type,
    rules: [{ required: true }],
  },
  {
    label: '预设prompt',
    field: 'systemPrompt',
    type: 'input',
  },
  {
    label: '模型图标',
    field: 'icon',
    type: 'input',
  },
  {
    label: '模型地址',
    field: 'url',
    type: 'input',
    rules: [{ required: true }],
  },
  {
    label: 'apikey',
    field: 'apiKey',
    type: 'input',
  },
  {
    label: '请求方式',
    field: 'resType',
    type: 'select',
    options: model_res_type,
    rules: [{ required: true }],
  },
  {
    label: '排序值',
    field: 'sort',
    type: 'input-number',
    rules: [{ required: true }],
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
      uncheckedText: '禁用',
    },
  },
])

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
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

// 新增
const onAdd = async () => {
  reset()
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getModel(id)
  Object.assign(form, data)
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style scoped lang="scss"></style>
