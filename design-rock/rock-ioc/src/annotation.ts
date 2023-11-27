export declare module Annotation {
  export type Prototype = {
    constructor: Function
  } & any

  export type Constructor = { new(...args: any[]): {} };

  export interface FunctionAnnotation {
    <T>(target: Prototype, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<T>): void;
  }

  export interface ConstructorAnnotation {
    <T extends Constructor>(constructor: T): T;
  }
  export interface PropertyAnnotation {
    (target: Prototype, propertyKey: PropertyKey): void;
  }
  export interface ParameterAnnotation {
    (target: Prototype, propertyKey: PropertyKey, parameterIndex: number): void;
  }
}