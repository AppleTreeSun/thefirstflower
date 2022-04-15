type IFormType = 'input' | 'password' | 'select' | 'datepicker'

interface IFormItems {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
}

interface IForm {
  formItems: IFormItems[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}

export { IFormItems, IForm }
