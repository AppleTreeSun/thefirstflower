<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="aside" :width="isCollapse ? '60px' : '210px'">
        <nav-aside :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <top-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavAside from './cpns/nav-aside'
import TopHeader from './cpns/top-header'
export default defineComponent({
  components: {
    NavAside,
    TopHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.page-info {
  border-radius: 5px;
  background-color: #fff;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.page-header {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
  height: 48px !important;
}

.page-content {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}

.aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: 0.3s linear;
  // 取消溢出滚动条
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
