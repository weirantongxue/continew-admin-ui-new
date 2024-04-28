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
import type { DeptAccountResp } from './type'
import { getDeptAccount, addDeptAccount, updateDeptAccount } from '@/apis/ai/deptAccount'
import { Message } from '@arco-design/web-vue'
import { GiForm, type Columns } from '@/components/GiForm'
import { useForm } from '@/hooks'

const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改部门账户' : '新增部门账户'))
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  {
    label: '部门账户信息',
    field: 'deptId',
    rules: [{ required: true, message: '请输入部门账户信息' }]
  },
]

const { form, resetForm } = useForm<DeptAccountResp>({
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
  const res = await getDeptAccount(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateDeptAccount(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addDeptAccount(form)
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
