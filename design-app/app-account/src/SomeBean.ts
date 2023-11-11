export interface SomeBeanRequired {
  testMethod: () => void
  testProp: string
}

export interface SomeBeanProvide {
  testMethod: () => void
  testProp: string
}

export class SomeBeanProvideImpl implements SomeBeanProvide {
  testProp = 'testProp';

  testMethod() {
    console.log('testMethod');
  }
}