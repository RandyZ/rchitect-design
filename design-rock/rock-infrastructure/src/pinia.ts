import type { App } from 'vue-demi'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { persistGlobalConfig } from './persist'
import { createStorageName } from '@rchitect-rock/tools'

const pinia = createPinia()

pinia.use(
  // @ts-ignore
  createPersistedState(persistGlobalConfig(createStorageName(import.meta.env))),
)

export function setupPinia(app: App<Element>) {
  app.use(pinia)
}
