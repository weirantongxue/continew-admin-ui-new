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
import type { PayConfigResp } from './type'
import { getPayConfig, addPayConfig, updatePayConfig } from '@/apis/ai/payConfig'
import { Message } from '@arco-design/web-vue'
import { GiForm, type Columns } from '@/components/GiForm'
import { useForm } from '@/hooks'
const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改支付配置' : '新增支付配置'))
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  {
    label: '支付名称',
    field: 'name',
    type: 'input',
    rules: [{ required: true, message: '请输入支付名称' }]
  },
  {
    label: '渠道图标',
    field: 'icon',
    type: 'input',
    rules: [{ required: true, message: '请输入渠道图标' }]
  },
  {
    label: '支付方式',
    field: 'way',
    type: 'input',
    rules: [{ required: true, message: '请输入支付方式' }]
  },
  {
    label: '备注信息',
    field: 'remark',
    type: 'input',
    rules: [{ required: true, message: '请输入备注信息' }]
  },
  {
    label: '配置参数',
    field: 'params',
    type: 'input',
    rules: [{ required: true, message: '请输入配置参数' }]
  },
  {
    label: '默认支付',
    field: 'isDefault',
    type: 'input',
    rules: [{ required: true, message: '请输入默认支付' }]
  },
  {
    label: '状态',
    field: 'status',
    rules: [{ required: true, message: '请输入方式状态' }]
  },
  {
    label: '排序编号',
    field: 'sort',
    type: 'input',
    rules: [{ required: true, message: '请输入排序编号' }]
  },
]

const { form, resetForm } = useForm<PayConfigResp>({
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
  const res = await getPayConfig(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updatePayConfig(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addPayConfig(form)
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
