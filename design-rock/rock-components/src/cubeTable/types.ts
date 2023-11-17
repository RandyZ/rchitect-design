export type { S2DataConfig, S2Options, ThemeCfg, Meta, Fields, Data, S2RenderOptions } from '@antv/s2';
export { S2Event } from '@antv/s2';
import { S2RenderOptions, OffsetConfig } from '@antv/s2';
export declare class CubeSheetTable {
    render(reloadData?: boolean, options?: S2RenderOptions): void;
    changeSheetSize(width?: number, height?: number): void;
    resetScrollOffset(animate: boolean): void;
    isCanScrollY(): boolean;
    updateScrollOffset(offsetConfig: OffsetConfig): void;
    getScrollOffset(): OffsetConfig;
    isScrollToBottom(deltaY: number): boolean;
    on(): void;
}