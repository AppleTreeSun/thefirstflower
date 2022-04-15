<template>
  <div class="login-account">
    <el-form
      :model="account"
      :rules="loginAccountRules"
      label-width="60px"
      size="large"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { loginAccountRules } from '../config/login-account-rules'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.表单验证通过
          if (isKeepPassword) {
            // 2.是否需要记住密码
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 3.提交登录逻辑
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      formRef,
      loginAccountRules,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped></style>
