<template>
  <div class="page-content">
    <hr-table
      v-bind="contentTableConfig"
      :tableData="pageList"
      :tableCount="pageCount"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button v-if="isCreate">新建数据</el-button>
      </template>
      <template #createAt="{ row }">
        <strong>{{ $filters.formatTime(row.createAt) }}</strong>
      </template>
      <template #updateAt="{ row }">
        <strong>{{ $filters.formatTime(row.updateAt) }}</strong>
      </template>
      <template #handler>
        <el-button type="text" icon="Edit" size="small" v-if="isUpdate"
          >编辑</el-button
        >
        <el-button type="text" icon="Delete" size="small" v-if="isDelete"
          >删除</el-button
        >
      </template>

      <!-- 在page-content中设置跨组件插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="{ row }"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="row"></slot>
        </template>
      </template>
    </hr-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import HrTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'
export default defineComponent({
  components: {
    HrTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isDelete = usePermission(props.pageName, 'delete')
    const isUpdate = usePermission(props.pageName, 'update')
    const isQuery = usePermission(props.pageName, 'query')

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    const pageList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const pageCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 获取其他的动态插槽的名称
    const otherPropSlots = props.contentTableConfig?.tableItems.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    return {
      pageList,
      pageCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      isQuery
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
