<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #status="{ row }">
        <el-button
          plain
          size="small"
          :type="row.status ? 'success' : 'danger'"
          >{{ row.status ? '可用' : '禁用' }}</el-button
        >
      </template>
      <template #image="{ row }">
        <el-image
          style="width: 70px; height: 80px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
          fit="cover"
          preview-teleported
        ></el-image>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
