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
    label: '模型类型,1:大语言模型,2:文生图',
    field: 'modelType',
    rules: [{ required: true, message: '请输入模型类型,1:大语言模型,2:文生图' }]
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
    label: 'stream:流式,sync:同步,async:异步',
    field: 'resType',
    type: 'input',
    rules: [{ required: true, message: '请输入stream:流式,sync:同步,async:异步' }]
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
    label: '状态（1：启用；2：禁用）',
    field: 'status',
    type: 'input'
  },
  {
    label: '是否删除: 0=否, 1=是',
    field: 'isDelete',
    type: 'input'
  },
  {
    label: '创建人',
    field: 'createUser',
    type: 'input'
  },
  {
    label: '创建时间',
    field: 'createTime',
    type: 'input'
  }
]

const { form, resetForm } =
  useForm <
  {
    // todo 待补充
  }

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
