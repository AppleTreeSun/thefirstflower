<template>
  <div class="top-header">
    <el-icon class="icon" @click="handleFoldClick" :size="28">
      <template v-if="isFold">
        <expand />
      </template>
      <template v-else>
        <fold />
      </template>
    </el-icon>
    <div class="content">
      <hr-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, watch } from 'vue'
import UserInfo from './user-info.vue'
import HrBreadcrumb from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import throttle from '@/utils/throttle'
export default defineComponent({
  components: {
    UserInfo,
    HrBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)

    const screenWidth = ref()

    const handleScreenChange = () => {
      screenWidth.value = document.body.clientWidth
    }
    onMounted(() => {
      window.onresize = throttle(handleScreenChange, 300)
    })
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    watch(
      screenWidth,
      (newValue) => {
        if (newValue < 650 && !isFold.value) {
          handleFoldClick()
        } else if (newValue > 650 && isFold.value) {
          handleFoldClick()
        }
      },
      {
        immediate: true
      }
    )

    const breadcrumbs = computed(() => {
      const currentPath = useRoute().path
      const userMenus = useStore().state.login.userMenus
      return mapPathToBreadcrumbs(userMenus, currentPath)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.icon {
  cursor: pointer;
}
.top-header {
  display: flex;
  width: 100%;

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
