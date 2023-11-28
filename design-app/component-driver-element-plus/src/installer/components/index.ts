import type { ComponentEntry } from "@rchitect-app/component-driver";
import { RockComponent } from "@rchitect-rock/components";

const components:Record<string, GlobModule> = import.meta.glob('./*.ts', { eager: true })

type AllComponentEntry = Map<string | RockComponent, ComponentEntry>

const allComponents: AllComponentEntry = new Map()

for (const esmPath in components) {
  const esm = components[esmPath] as any
  const componentEntry = esm.default as ComponentEntry
  if (!componentEntry.key) {
    throw new Error(`ComponentEntry.key is required: ${esmPath}`)
  }
  allComponents.set(componentEntry.key, componentEntry)
}
export default allComponents