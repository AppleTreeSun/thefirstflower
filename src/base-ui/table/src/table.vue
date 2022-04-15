<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        type="index"
        width="60"
        align="center"
      />
      <template v-for="item in tableItems" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template v-slot="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-show="showFooter">
      <slot name="footer">
        <el-pagination
          small
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="sizes, prev, pager, next"
          :total="tableCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ITableItem } from '../type'
export default defineComponent({
  props: {
    tableItems: {
      type: Array as PropType<ITableItem[]>,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableCount: {
      type: Number,
      default: 0
    },
    showSelectColumn: {
      type: Boolean,
      default: true
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '默认内容'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectChange = (value: any) => {
      emit('selectChange', value)
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
