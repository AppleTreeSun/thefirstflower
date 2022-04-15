<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  size="large"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  size="large"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.label"
                    v-bind="option"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  size="large"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItems } from '../type'
export default defineComponent({
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    formItems: {
      type: Array as PropType<IFormItems[]>,
      default: () => []
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 30px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xs: 24, // <768px 显示1个
        sm: 12, // <992px 显示2个
        md: 12, // <1200px 显示3个
        lg: 8, // <1920px 显示4个
        xl: 8 // >1920px 显示4个
      })
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit('update:model-value', { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  padding-top: 18px;
}
</style>
