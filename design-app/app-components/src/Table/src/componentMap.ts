import type { Component } from 'vue';
import {
  ElInput as Input,
  ElCheckbox as Checkbox,
  ElInputNumber as InputNumber,
  ElSwitch as Switch,
  ElDatePicker as DatePicker,
  ElTimePicker as TimePicker,
  ElAutocomplete as AutoComplete
} from 'element-plus';


import type { ComponentType } from './types/componentType';
import { ApiSelect, ApiRadioGroup } from '../../Form';
import {Lib as ComponentLib} from "@rchitect-rock/components";
import {resolveByKey} from "@rchitect-rock/ioc";

const componentMap = new Map<ComponentType, Component>();
let isInit = false;

function _init(){
  if (isInit) return;
  const driverComponentMap = resolveByKey(ComponentLib.types.ComponentMap);
  const Select = driverComponentMap.get('Select');
  const RadioGroup = driverComponentMap.get('RadioGroup');
  const RadioButtonGroup = driverComponentMap.get('RadioButtonGroup');
  componentMap.set('Input', Input);
  componentMap.set('InputNumber', InputNumber);
  componentMap.set('Select', Select);
  componentMap.set('ApiSelect', ApiSelect);
  componentMap.set('AutoComplete', AutoComplete);
  componentMap.set('Switch', Switch);
  componentMap.set('Checkbox', Checkbox);
  componentMap.set('DatePicker', DatePicker);
  componentMap.set('TimePicker', TimePicker);
  componentMap.set('RadioGroup', RadioGroup);
  componentMap.set('RadioButtonGroup', RadioButtonGroup);
  componentMap.set('ApiRadioGroup', ApiRadioGroup);
  isInit = true
}


export function add(compName: ComponentType, component: Component) {
  _init()
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  _init()
  componentMap.delete(compName);
}

export { componentMap };
