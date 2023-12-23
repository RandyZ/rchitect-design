import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.glob('@/mock/**/*.ts', { eager: true })

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  // @ts-ignore
  mockModules.push(...(modules[key].default || modules[key]))
})

/**
 * Used in a production environment. Need to manually import all modules
 */
export const setupProdMockServer = () => createProdMockServer(mockModules)
