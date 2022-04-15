<template>
  <div class="user-info">
    <div class="top-control">
      <el-icon :size="23"
        ><component
          @click="handleScreenChange"
          :is="isFullScreen ? 'scale-to-original' : 'full-screen'"
        ></component
      ></el-icon>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30"> {{ $store.state.login.name }} </el-avatar>
        <span class="name">{{ $store.state.login.name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="User">用户管理</el-dropdown-item>
          <el-dropdown-item icon="Setting">github地址</el-dropdown-item>
          <el-dropdown-item icon="Close" @click="handleLogOut"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ScreenFull from 'screenfull'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const isFullScreen = ref(false)

    const store = useStore()

    const handleScreenChange = () => {
      if (ScreenFull.isEnabled) {
        ScreenFull.toggle()
        isFullScreen.value = !isFullScreen.value
      }
    }
    const handleLogOut = () => {
      ElMessageBox.confirm('确认退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customStyle: {
          'margin-top': '-180px'
        },
        center: true
      })
        .then(() => {
          store.dispatch('login/handleLogOut')
          ElMessage({
            type: 'success',
            message: '已退出登录!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消退出登录!'
          })
        })
    }
    return {
      isFullScreen,
      handleScreenChange,
      handleLogOut
    }
  }
})
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  .top-control {
    width: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.name {
  margin-left: 10px;
}
</style>
