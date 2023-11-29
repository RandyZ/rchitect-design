/**
 * 磐石组件
 */
export enum RockComponent {
  MessageProvider = 'MessageProvider',
  NotificationProvider = 'NotificationProvider',
  DialogProvider = 'DialogProvider',
  Dialog = 'Dialog',
  Drawer = 'Drawer',
  DrawerContent = 'DrawerContent',
  Tag = 'Tag',
  Card = 'Card',
  Menu = 'Menu',
  Divider = 'Divider',
  Space = 'Space',
  Popover = 'Popover',
  Button = 'Button',
  ButtonGroup = 'ButtonGroup',
  Avatar = 'Avatar',
  Statistic = 'Statistic',
  Select = 'Select',
  Input = 'Input',
  InputGroup = 'InputGroup',
  InputGroupLabel = 'InputGroupLabel',
  InputNumber = 'InputNumber',
  Form = 'Form',
  FormItem = 'FormItem',
  Thing = 'Thing',
  Popconfirm = 'Popconfirm',
  /**
   * 三方组件Icon
   */
  Icon = 'Icon',
  /**
   * 磐石自定义组件Iconify
   * 在线ICON库：https://icones.js.org/
   * https://icon-sets.iconify.design/ 
   */
  Iconify = 'Iconify',
  /**
   * 三方组件IconWrapper
   */
  IconWrapper = 'IconWrapper',
  Checkbox = 'Checkbox',
  CheckboxGroup = 'CheckboxGroup',
  Breadcrumb = 'Breadcrumb',
  BreadcrumbItem = 'BreadcrumbItem',
  Modal = 'Modal',
  Empty = 'Empty',
  Upload = 'Upload',
  UploadDragger = 'UploadDragger',
  Tabs = 'Tabs',
  Tab = 'Tab',
  TabPane = 'TabPane',
  Table = 'Table',
  Grid = 'Grid',
  GridItem = 'GridItem',
  Ellipsis = 'Ellipsis',
  Image = 'Image',
  Pagination = 'Pagination',
  Radio = 'Radio',
  RadioGroup = 'RadioGroup',
  RadioButton = 'RadioButton',
  RadioButtonGroup = 'RadioButtonGroup',
  Text = 'Text',
  Config = 'Config',
  DynamicTags = 'DynamicTags',
  ColorPicker = 'ColorPicker',
  Descriptions = 'Descriptions',
  DescriptionsItem = 'DescriptionsItem',
  Switch = 'Switch',
  Layout = 'Layout',
  LayoutHeader = 'LayoutHeader',
  LayoutFooter = 'LayoutFooter',
  LayoutSider = 'LayoutSider',
  LayoutContent = 'LayoutContent',
  LocalePicker = 'LocalePicker',
  Dropdown = 'Dropdown',
  TreeSelect = 'TreeSelect',
  Badge = 'Badge',
  ListItem = 'ListItem',
  List = 'List',
  AutoComplete = 'AutoComplete',
  Cascader = 'Cascader',
  DatePicker = 'DatePicker',
  TimePicker = 'TimePicker',
  Rate = 'Rate',
  Slider = 'Slider',
  Transfer = 'Transfer',
  Mention = 'Mention',
  FormItemGi = 'FormItemGi',
  Tree = 'Tree',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
  DynamicInput = 'DynamicInput',
  PopSelect = 'PopSelect',
  Time = 'Time',
  Scrollbar = 'Scrollbar',
  Element = 'Element',
  Skeleton = 'Skeleton',
  Tooltip = 'Tooltip',
  Result = 'Result',
  Affix = 'Affix',
  GradientText = 'GradientText',
  Spinner = 'Spinner',
  Col = 'Col',
  Row = 'Row',
  CubeTable = 'CubeTable',
  Progress = 'Progress',
  PageHeader = 'PageHeader',
}

export type RockComponentType = keyof typeof RockComponent;

export const toRockComponent = (componentName: string): RockComponent => {
  return RockComponent[componentName as RockComponentType];
}