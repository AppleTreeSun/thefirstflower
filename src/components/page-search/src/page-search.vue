<template>
  <div class="page-search">
    <hr-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh" size="large" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="Search"
            size="large"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hr-form>
  </div>
</template>

<script lang="ts">
import HrForm from '@/base-ui/form'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    HrForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // 处理重置
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    // 处理搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  color: red;
  font-size: 27px;
  font-weight: 700;
  margin-bottom: 20px;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
