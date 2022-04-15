<template>
  <div class="login-phone">
    <el-form
      :model="phone"
      :rules="loginPhoneRules"
      label-width="80px"
      size="large"
    >
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.number"></el-input>
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { loginPhoneRules } from '../config/login-phone-rules'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''
    })
    // 2.拿到el-form的组件实例
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = () => {
      formRef.value?.validate((value) => {
        if (value) {
          console.log('启动手机登录逻辑')
        }
      })
    }
    return {
      phone,
      loginPhoneRules,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped>
.get-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
