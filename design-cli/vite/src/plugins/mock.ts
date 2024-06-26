/**
 * Mock plugin for development and production.
 * @see https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

export const configMockPlugin = (isBuild: boolean) => {
  console.info('MockPlugin isBuild', isBuild)
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '@/../mock/_mock-server.ts';
      setupProdMockServer();
    `
  })
};
