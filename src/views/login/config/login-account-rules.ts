export const loginAccountRules = {
  name: [
    { required: true, message: '账号为必填内容', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '账号为5-10位字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码为必填内容', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码为3位以上字母或数字',
      trigger: 'blur'
    }
  ]
}
