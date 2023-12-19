import type { FormProps, FormActionType, UseFormReturnType, FormSchema } from '../types/form';
import type { NamePath } from "#/Form/src/types/namePath";
import { diK, THROWN_HANDLER } from "@weiming-rock/ioc";

import { ref, onUnmounted, unref, nextTick, watch } from 'vue';
import { getDynamicProps } from '@vben/utils';
import type { ComputedRef, Ref } from 'vue';

// TODO: 获取数据
function isProdMode() {
  return false
}

// TODO: 位置
export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};


export declare type ValidateFields = (nameList?: NamePath[]) => Promise<Recordable>;

type Props = Partial<DynamicProps<FormProps>>;



export class FromContext {
  formRef: Ref<Nullable<FormActionType>>;

  constructor(instance: FormActionType, props?: Props) {
    this.formRef = this.register(instance, props)
  }

  register(instance: FormActionType, props?: Props) {
    const formRef = ref<Nullable<FormActionType>>(null);
    isProdMode() &&
    onUnmounted(() => {
      formRef.value = null;
      // loadedRef.value = null;
    });
    if (isProdMode() && instance === unref(formRef)) return;

    formRef.value = instance;
    // loadedRef.value = true;

    watch(
        () => props,
        () => {
          props && instance.setProps(getDynamicProps(props));
        },
        {
          immediate: true,
          deep: true,
        },
    );
    return formRef;
  }

  scrollToField(name: NamePath, options?: ScrollOptions | undefined) {
    const form = unref(this.formRef) as FormActionType;
    form.scrollToField(name, options);
  }

  setProps (formProps: Partial<FormProps>) {
    const form = unref(this.formRef) as FormActionType;
    form.setProps(formProps);
  }

  updateSchema (data: Partial<FormSchema> | Partial<FormSchema>[]) {
    const form = unref(this.formRef) as FormActionType;
    form.updateSchema(data);
  }

  resetSchema (data: Partial<FormSchema> | Partial<FormSchema>[]) {
    const form = unref(this.formRef) as FormActionType;
    form.resetSchema(data);
  }

  clearValidate (name?: string | string[]) {
    const form = unref(this.formRef) as FormActionType;
    form.clearValidate(name);
  }

  resetFields ()  {
    const form = unref(this.formRef) as FormActionType;
    form.resetFields();
  }

  removeSchemaByField(field: string | string[]) {
    unref(this.formRef)?.removeSchemaByField(field);
  }

  getFieldsValue <T>() {
    return unref(this.formRef)?.getFieldsValue() as T;
  }

  setFieldsValue <T>(values: T) {
    const form = unref(this.formRef) as FormActionType;
    form.setFieldsValue<T>(values);
  }

  appendSchemaByField (schema: FormSchema | FormSchema[], prefixField: string | undefined, first: boolean) {
    const form = unref(this.formRef) as FormActionType;
    form.appendSchemaByField(schema, prefixField, first);
  }

  submit(): Promise<any> {
    const form = unref(this.formRef) as FormActionType;
    return form.submit();
  }

  validate (nameList?: NamePath[]): Promise<Recordable> {
    const form = unref(this.formRef) as FormActionType;
    return form.validate(nameList);
  }

  validateFields (nameList?: NamePath[]): Promise<Recordable> {
    const form = unref(this.formRef) as FormActionType;
    return form.validateFields(nameList);
  }
}

export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionType>>(null);
  const testId = Math.random()
  const loadedRef = ref<Nullable<boolean>>(false);

  async function getForm() {
    const form = unref(formRef);
    console.log('props', props, testId)
    if (!form) {
      diK(THROWN_HANDLER)
        ?.error('The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!');
    }
    await nextTick();
    return form as FormActionType;
  }

  function register(instance: FormActionType) {
    console.log('register', testId)
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null;
        loadedRef.value = null;
      });
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }
  const methods: FormActionType = {
    scrollToField: async (name: NamePath, options?: ScrollOptions | undefined) => {
      const form = await getForm();
      form.scrollToField(name, options);
    },
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm();
      form.setProps(formProps);
    },

    updateSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form.updateSchema(data);
    },

    resetSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form.resetSchema(data);
    },

    clearValidate: async (name?: string | string[]) => {
      const form = await getForm();
      form.clearValidate(name);
    },

    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields();
      });
    },

    removeSchemaByField: async (field: string | string[]) => {
      unref(formRef)?.removeSchemaByField(field);
    },

    // TODO promisify
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T;
    },

    setFieldsValue: async <T>(values: T) => {
      const form = await getForm();
      form.setFieldsValue<T>(values);
    },

    appendSchemaByField: async (
      schema: FormSchema | FormSchema[],
      prefixField: string | undefined,
      first: boolean,
    ) => {
      const form = await getForm();
      form.appendSchemaByField(schema, prefixField, first);
    },

    submit: async (): Promise<any> => {
      const form = await getForm();
      return form.submit();
    },

    validate: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validate(nameList);
    },

    validateFields: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validateFields(nameList);
    }
  };
  // 返回new一个对象
  return [register, methods];
}
