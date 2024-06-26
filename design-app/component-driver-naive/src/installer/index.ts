import { App } from 'vue-demi';
import {
  RockComponent,
  ComponentEntry,
  withInstall,
  toRockComponent,
} from "@rchitect-app/component-driver"
import { isUndefined } from 'lodash-es'
import { ComponentDict } from '@rchitect-rock/components';
import {
  NTag,
  NCard,
  NDivider,
  NSpace,
  NPopover,
  NButton,
  NAvatar,
  NStatistic,
  NSelect,
  NInput,
  NThing,
  NPopconfirm,
  NIcon,
  NIconWrapper,
  NCheckbox,
  NCheckboxGroup,
  NButtonGroup,
  NModal,
  NEmpty,
  NUpload,
  NUploadDragger,
  NTabs,
  NTabPane,
  NGrid,
  NGridItem,
  NEllipsis,
  NImage,
  NMessageProvider,
  NPagination,
  NRadio,
  NRadioButton,
  NRadioGroup,
  NText,
  NConfigProvider,
  NDynamicTags,
  NColorPicker,
  NDescriptions,
  NDescriptionsItem,
  NNotificationProvider,
  NDialogProvider,
  NSwitch,
  NMenu,
  NBreadcrumb,
  NBreadcrumbItem,
  NLayout,
  NLayoutSider,
  NLayoutFooter,
  NLayoutContent,
  NLayoutHeader,
  NForm,
  NFormItem,
  NDropdown,
  NInputNumber,
  NTreeSelect,
  NBadge,
  NListItem,
  NList,
  NAutoComplete,
  NCascader,
  NDatePicker,
  NTimePicker,
  NRate,
  NSlider,
  NTransfer,
  NMention,
  NFormItemGi,
  NTree,
  NH1,
  NH2,
  NH3,
  NH4,
  NH5,
  NH6,
  NInputGroupLabel,
  NInputGroup,
  NDrawer,
  NDrawerContent,
  NDynamicInput,
  NPopselect,
  NTime,
  NScrollbar,
  NElement,
  NSkeleton,
  NTooltip,
  NTab,
  NResult,
  NAffix,
  NGradientText,
  NCol,
  NRow,
  NDialog,
  NSpin,
  NProgress,
  NPageHeader
} from 'naive-ui';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AtomSpinner } from 'epic-spinners'
const allComponents: ComponentDict = {
  [RockComponent.MessageProvider]: NMessageProvider,
  [RockComponent.NotificationProvider]: NNotificationProvider,
  [RockComponent.DialogProvider]: NDialogProvider,
  [RockComponent.Dialog]: NDialog,
  [RockComponent.Drawer]: NDrawer,
  [RockComponent.DrawerContent]: NDrawerContent,
  [RockComponent.Tag]: NTag,
  [RockComponent.Card]: NCard,
  [RockComponent.Menu]: NMenu,
  [RockComponent.Divider]: NDivider,
  [RockComponent.Space]: NSpace,
  [RockComponent.Popover]: NPopover,
  [RockComponent.Button]: NButton,
  [RockComponent.ButtonGroup]: NButtonGroup,
  [RockComponent.Avatar]: NAvatar,
  [RockComponent.Statistic]: NStatistic,
  [RockComponent.Select]: NSelect,
  [RockComponent.Input]: NInput,
  [RockComponent.InputGroup]: NInputGroup,
  [RockComponent.InputGroupLabel]: NInputGroupLabel,
  [RockComponent.InputNumber]: NInputNumber,
  [RockComponent.Form]: NForm,
  [RockComponent.FormItem]: NFormItem,
  [RockComponent.Thing]: NThing,
  [RockComponent.Popconfirm]: NPopconfirm,
  [RockComponent.Icon]: NIcon,
  [RockComponent.IconWrapper]: NIconWrapper,
  [RockComponent.Iconify]: null,
  [RockComponent.Checkbox]: NCheckbox,
  [RockComponent.CheckboxGroup]: NCheckboxGroup,
  [RockComponent.Breadcrumb]: NBreadcrumb,
  [RockComponent.BreadcrumbItem]: NBreadcrumbItem,
  [RockComponent.Modal]: NModal,
  [RockComponent.Empty]: NEmpty,
  [RockComponent.Upload]: NUpload,
  [RockComponent.UploadDragger]: NUploadDragger,
  [RockComponent.Tabs]: NTabs,
  [RockComponent.Tab]: NTab,
  [RockComponent.TabPane]: NTabPane,
  [RockComponent.Table]: null,
  [RockComponent.Grid]: NGrid,
  [RockComponent.GridItem]: NGridItem,
  [RockComponent.Ellipsis]: NEllipsis,
  [RockComponent.Image]: NImage,
  [RockComponent.Pagination]: NPagination,
  [RockComponent.Radio]: NRadio,
  [RockComponent.RadioButton]: NRadioButton,
  [RockComponent.RadioGroup]: NRadioGroup,
  [RockComponent.Text]: NText,
  [RockComponent.Config]: NConfigProvider,
  [RockComponent.DynamicTags]: NDynamicTags,
  [RockComponent.ColorPicker]: NColorPicker,
  [RockComponent.Descriptions]: NDescriptions,
  [RockComponent.DescriptionsItem]: NDescriptionsItem,
  [RockComponent.Switch]: NSwitch,
  [RockComponent.Layout]: NLayout,
  [RockComponent.LayoutHeader]: NLayoutHeader,
  [RockComponent.LayoutFooter]: NLayoutFooter,
  [RockComponent.LayoutSider]: NLayoutSider,
  [RockComponent.LayoutContent]: NLayoutContent,
  [RockComponent.Dropdown]: NDropdown,
  [RockComponent.TreeSelect]: NTreeSelect,
  [RockComponent.Badge]: NBadge,
  [RockComponent.ListItem]: NListItem,
  [RockComponent.List]: NList,
  [RockComponent.LocalePicker]: null,
  [RockComponent.AutoComplete]: NAutoComplete,
  [RockComponent.Cascader]: NCascader,
  [RockComponent.DatePicker]: NDatePicker,
  [RockComponent.TimePicker]: NTimePicker,
  [RockComponent.Rate]: NRate,
  [RockComponent.Slider]: NSlider,
  [RockComponent.Transfer]: NTransfer,
  [RockComponent.Mention]: NMention,
  [RockComponent.FormItemGi]: NFormItemGi,
  [RockComponent.Tree]: NTree,
  [RockComponent.H1]: NH1,
  [RockComponent.H2]: NH2,
  [RockComponent.H3]: NH3,
  [RockComponent.H4]: NH4,
  [RockComponent.H5]: NH5,
  [RockComponent.H6]: NH6,
  [RockComponent.DynamicInput]: NDynamicInput,
  [RockComponent.PopSelect]: NPopselect,
  [RockComponent.Time]: NTime,
  [RockComponent.Scrollbar]: NScrollbar,
  [RockComponent.Element]: NElement,
  [RockComponent.Skeleton]: NSkeleton,
  [RockComponent.Tooltip]: NTooltip,
  [RockComponent.Result]: NResult,
  [RockComponent.Affix]: NAffix,
  [RockComponent.GradientText]: NGradientText,
  // [RockComponent.Spinner]: AtomSpinner,
  [RockComponent.Spinner]: NSpin,
  [RockComponent.Col]: NCol,
  [RockComponent.Row]: NRow,
  [RockComponent.Progress]: NProgress,
  [RockComponent.PageHeader]: NPageHeader
};
export const install: (
  componentName: string,
  app?: App
) => ComponentEntry | undefined = (componentName: string | RockComponent, app?: App) => {
  const comIndex = toRockComponent(componentName);
  const component = allComponents[comIndex];
  if (!isUndefined(component)) {
    if (component !== null) {
      app?.use(withInstall(component));
    }
    return { key: componentName, value: component } as ComponentEntry;
  }
};
