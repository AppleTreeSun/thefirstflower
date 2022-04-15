export const loginPhoneRules = {
  number: [
    { required: true, message: '手机号为必填内容', trigger: 'blur' },
    {
      pattern: /^1[3-9]{2}[0-9]{8}$/,
      message: '手机号格式错误',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '验证码为必填内容', trigger: 'blur' },
    { pattern: /^[0-9]{6}$/, message: '验证码格式不正确', trigger: 'blur' }
  ]
}
