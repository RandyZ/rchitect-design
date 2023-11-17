import type { VxeGridProps, VxeTableEvents } from 'vxe-table';
import type { VxeGridPropTypes } from 'vxe-table';

export type WmqTableProps<D = any> = VxeGridProps<D> & {
  api?: Function;
  params?: Object;
  title?: string;
  pagination?: boolean | VxeGridPropTypes.PagerConfig;
  afterFetch?: Function;
};
export type WmqColumns = VxeGridPropTypes.Columns;

export type WmqCellClick = VxeTableEvents.CellClick;
