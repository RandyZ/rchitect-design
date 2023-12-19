<template>
  <!-- TODO: 全局配置修改 -->
  <el-config-provider :locale="zhCn">
    <!-- TODO: 回车搜索 :onAutoSubmit="search" -->
    <div class="form-content h-full">
      <Form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol" class="formilt-custom">
        <div flex flex-col h-full>
          <div :class="foldClass" class="field" :style="heightStyle" flex-grow-1>
            <SchemaField :schema="schema" :scope="scope" ref="fields"/>
          </div>
          <FormButtonGroup :align="buttonAlign" class="bottom">
            <Submit :onSubmit="search" :loading="searchLoading"  style="width: 100%">搜索</Submit>
            <Reset style="width: 100%">重置</Reset>
          </FormButtonGroup>
        </div>
      </Form>
    </div>
  </el-config-provider>
</template>

<script>
import { createForm, onFormMount, onFieldChange, FormPath } from '@formily/core'
// TODO: 引入样式方式
import 'element-plus/dist/index.css'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
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
const elGridClass = 'formily-element-plus-form-grid'
const antGridClass = 'formily-antdv-form-grid'
export default {
  name: 'WmqSearchForm',
  components: { Form, SchemaField, Submit, FormButtonGroup, Reset, ElConfigProvider },
  props: {
    schema: {
      type: Object,
      require: true,
      default() {
        return null
      }
    },
    buttonAlign: {
      type: String,
      default() {
        return 'right'
      }
    },
    scope: {
      type: Object,
      default() {
        return null
      }
    },
    fold: {
      type: Boolean,
      default: true
    },
    labelCol: {
      type: Number,
      default: 6
    },
    wrapperCol: {
      type: Number,
      default: 18
    },
    foldHeight: {
      type: Number,
      default: 80
    }
  },
  data() {
    return {
      zhCn,
      form: undefined,
      SchemaField,
      searchInit: false,
      loadingCount: 0,
      searchLoading: false,
      isNeedFold: false,
      isFold: false,
      isInitResizedEnd: true,
      searchData: {}
    }
  },
  computed: {
    foldTitle () {
      return this.isFold ? '展开' : '收起'
    },
    foldClass () {
      if (this.fold === false) {
        return 'notFold'
      }
      return this.isFold ? 'fold' : 'notFold'
    },
    heightStyle () {
      const auto =  {
        height: "auto"
      }

      const cusHeight = {
        height: this.foldHeight + 'px'
      }
      if (this.fold === false) {
        return auto
      }
      return this.isFold ? cusHeight : auto
    }
  },
  created() {
    const that = this
    this.form = createForm({
      effects() {
        // eslint-disable-next-line no-unused-expressions
        onFormMount(() => {
          that.loadingCount = 0
          // eslint-disable-next-line no-sequences
        }),
            onFieldChange(FormPath.match('*'), ['loading'], (field, form) => {
              if (that.searchInit) {
                return
              }
              if (field.loading) {
                that.loadingCount++
              } else {
                that.loadingCount--
              }
              if (that.loadingCount === 0) {
                that.searchInit = true
                // TODO: 后续优化
                setTimeout(() => {
                  that.search(form.values)
                }, 1000)

              }
            })
      }
    })
  },
  methods: {
    search(value) {
      this.searchData = value
      this.$emit('search', value)
    },
    setFieldDataSource(fieldIndex, dataSource) {
      this.getFieldByIndex(fieldIndex)?.setDataSource(dataSource)
    },
    getFieldByIndex(fieldIndex) {
      return this.form.fields[this.form.indexes[fieldIndex]]
    },
    getSearchData() {
      this.searchData = this.form.values
      return this.form.values
    },
    updateSearchData({ searchData, callback }) {
      this.searchData = searchData
      this.form.setValues(searchData)
      callback && callback()
      this.$emit('search', this.searchData)
    }
  }
}
</script>
<style scoped lang="less">
.form-content {
  :deep(.formilt-custom), :deep(form) {
    height: 100%;
  }
}
.fold {
  /*height: 88px;*/
  overflow: hidden;
}
</style>

<style lang="less">
.form-content {
  .el-date-editor.el-input, .el-date-editor.el-input__wrapper {
    width: 236px !important;
  }
}
.formily-element-plus-space-item {
  width: 100%;
}
</style>