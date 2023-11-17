import { App, Component } from 'vue';
import { DataDictionary } from '@rchitect-design/types';
import { RockComponent } from '@rchitect-rock/components';

export type ComponentEntry = { key: RockComponent; value: Component };
export type Installer = (app?: App) => ComponentEntry | undefined;

export type { WithInstall, CustomComponent } from '@rchitect-rock/components';
export { withInstall } from '@rchitect-rock/components';

export type RockComponentDetailDict = DataDictionary<Component>;
