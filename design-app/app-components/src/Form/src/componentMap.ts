import type { Component } from 'vue';
import type { ComponentType } from './types/index';

/**
 * Component list, register here to setting it in the form
 */
import ApiRadioGroup from './components/ApiRadioGroup.vue';
// import RadioButtonGroup from './components/RadioButtonGroup.vue';
import ApiSelect from './components/ApiSelect.vue';
import ApiTree from './components/ApiTree.vue';
// import ApiTreeSelect from './components/ApiTreeSelect.vue';
import ApiCascader from './components/ApiCascader.vue';
// import ApiTransfer from './components/ApiTransfer.vue';
// import { BasicUpload } from '/@/components/Upload';
// import { StrengthMeter } from '/@/components/StrengthMeter';
import { IconPicker } from '#/iconPicker';
// import { CountdownInput } from '/@/components/CountDown';

const componentMap = new Map<ComponentType, Component>();

// componentMap.set('InputGroup', Input.Group);
// componentMap.set('InputPassword', Input.Password);
// componentMap.set('InputSearch', Input.Search);
// componentMap.set('InputTextArea', Input.TextArea);
// componentMap.set('AutoComplete', AutoComplete);
//
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiTree', ApiTree);
// componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('ApiRadioGroup', ApiRadioGroup);
componentMap.set('ApiCascader', ApiCascader);
// componentMap.set('ApiTransfer', ApiTransfer);
//
// componentMap.set('MonthPicker', DatePicker.MonthPicker);
// componentMap.set('RangePicker', DatePicker.RangePicker);
// componentMap.set('WeekPicker', DatePicker.WeekPicker);
// componentMap.set('TimePicker', TimePicker);
// componentMap.set('StrengthMeter', StrengthMeter);
componentMap.set('IconPicker', IconPicker);
// componentMap.set('InputCountDown', CountdownInput);
//
// componentMap.set('Upload', BasicUpload);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
