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
import { getModelScript, addModelScript, updateModelScript } from '@/apis/ai/modelScript'
import { Message } from '@arco-design/web-vue'
import { GiForm, type Columns } from '@/components/GiForm'
import { useForm } from '@/hooks'

const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改模型预设脚本' : '新增模型预设脚本'))
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  {
    label: '脚本名称',
    field: 'name',
    type: 'input',
    rules: [{ required: true, message: '请输入脚本名称' }]
  },
  {
    label: '模型名称',
    field: 'modelId',
    type: 'input',
    rules: [{ required: true, message: '请输入模型名称' }]
  },
  {
    label: '预设内容',
    field: 'prompt',
    type: 'input',
    rules: [{ required: true, message: '请输入预设内容' }]
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
    type: 'input',
    rules: [{ required: true, message: '请输入状态（1：启用；2：禁用）' }]
  },
  {
    label: '是否删除: 0=否, 1=是',
    field: 'isDelete',
    type: 'input',
    rules: [{ required: true, message: '请输入是否删除: 0=否, 1=是' }]
  },
  {
    label: '创建人',
    field: 'createUser',
    type: 'input',
    rules: [{ required: true, message: '请输入创建人' }]
  },
  {
    label: '创建时间',
    field: 'createTime',
    type: 'input',
    rules: [{ required: true, message: '请输入创建时间' }]
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
  const res = await getModelScript(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateModelScript(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addModelScript(form)
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
