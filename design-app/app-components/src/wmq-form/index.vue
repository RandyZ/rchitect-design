<template>
  <Form :form="form">
    <SchemaField :schema="schema" :scope="scope" ref="fields"/>
    <FormButtonGroup align="right">
      <WmqButton @click="reset">取消</WmqButton>
      <Submit :onSubmit="submit" :loading="confirmLoading">确认</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import {
  Form,
  FormItem,
  FormLayout,
  FormGrid,
  FormButtonGroup,
  FormStep,
  FormCollapse,
  FormDialog,
  PreviewText,
  Space,
  Reset,
  Submit,
  Input,
  InputNumber,
  Select,
  Switch,
  Radio,
  Password,
  Checkbox,
  Cascader,
  Transfer,
  TimePicker,
  FormTab,
  Editable,
  Upload,
  ArrayTabs,
  ArrayTable,
  ArrayItems,
  ArrayCollapse,
  ArrayCards,
  DatePicker
} from '@formily/element-plus'
import { createSchemaField } from '@formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormLayout,
    FormGrid,
    FormButtonGroup,
    FormStep,
    FormCollapse,
    FormDialog,
    PreviewText,
    Space,
    Reset,
    Submit,
    Input,
    InputNumber,
    Select,
    Switch,
    Radio,
    Password,
    Checkbox,
    Cascader,
    Transfer,
    TimePicker,
    FormTab,
    DatePicker,
    Editable,
    Upload,
    ArrayTabs,
    ArrayTable,
    ArrayItems,
    ArrayCollapse,
    ArrayCards
  },
})
export default {
  name: 'WmqForm',
  components: { Form, SchemaField, Submit, FormButtonGroup },
  props: {
    schema: {
      type: Object,
      require: true,
      default: () => null
    },
    scope: {
      type: Object,
      default() {
        return null
      }
    },
    submitNext: {
      type: Function,
      default: () => null
    },
    resetNext: {
      type: Function,
      default: () => null
    },
    /**
     * 额外数据
     */
    extraValue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: undefined,
      SchemaField,
      confirmLoading: false
    }
  },
  created() {
    this.form = createForm()
  },
  methods: {
    submit(value) {
      this.$emit('submit', { ...value, ...this.extraValue }, this)
    },
    reset() {
      this.form.reset()
      if (this.resetNext) {
        this.resetNext()
      }
    },
    resetForm() {
      this.form.reset()
    },
    setFormValue(value) {
      this.form.setValues(value)
    }
  }
}
</script>
<style scoped>
</style>
