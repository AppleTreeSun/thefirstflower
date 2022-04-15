import type { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'
export default function globalRegister(app: App) {
  registerElement(app)
  registerProperties(app)
}
