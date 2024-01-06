import type { RockText } from "#/text";
import type { RockCard } from "#/card";

interface Type<T> {
  prototype:T;
}

export type Component<T = unknown> = (string | symbol | Type<T>);

const RockComponents = {
  Text: Symbol.for('Text') as Component<RockText>,
  Card: Symbol.for('Card') as Component<RockCard>
}
type ComponentTypes = {
  [K in keyof typeof Test]:typeof Test[K];
}


export const toRockComponent1 = <K extends keyof typeof RockComponents>(componentName:K):ComponentTypes[K] => {
  return RockComponents[componentName] as ComponentTypes[K];
}

function getComponent<K extends keyof typeof Test, V = typeof Test[K]>(key:K):Component<V> {
  return Test[key] as Component<V>;
}