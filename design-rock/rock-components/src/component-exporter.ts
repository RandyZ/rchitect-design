// import { allPredefinedComponents } from "./ScanWmqComponents";
//
// const components = allPredefinedComponents();
// export default components;
export type { WmqFormSchema } from './form';
export type { WmqTableProps, WmqColumns, WmqCellClick } from './table';
export { default as ComponentMap } from './ComponentMap';
export { useForm, transferFormilySchemas } from './form';
export { useTable } from './table';
export { RockIconify as WmqIconify } from './iconify/index'