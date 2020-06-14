<!--
 * @Author: Victor wang
 * @Date: 2020-06-11 17:49:34
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-14 12:59:56
 * @Description:
-->

## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 基础表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker

```html
<mu-form ref="form" :model="form" labmu-width="120px">
  <mu-form-item label="Activity name">
    <mu-input v-model="form.name"></mu-input>
  </mu-form-item>

  <mu-form-item label="Activity form">
    <mu-input type="textarea" v-model="form.desc"></mu-input>
  </mu-form-item>
  <mu-form-item>
    <mu-button type="primary" @click="onSubmit">Create</mu-button>
    <mu-button>Cancel</mu-button>
  </mu-form-item>
</mu-form>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>
```

:::

:::tip
[W3C](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2) regulates that

> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>

To prevent this behavior, you can add `@submit.native.prevent` on `<mu-form>`.
:::

### Inline form

When the vertical space is limited and the form is relatively simple, you can put it in one line.

:::demo Set the `inline` attribute to `true` and the form will be inline.

```html
<mu-form :inline="true" :model="formInline" class="demo-form-inline">
  <mu-form-item label="Approved by">
    <mu-input v-model="formInline.user" placeholder="Approved by"></mu-input>
  </mu-form-item>
  <mu-form-item>
    <mu-button type="primary" @click="onSubmit">Query</mu-button>
  </mu-form-item>
</mu-form>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>
```

:::

### Alignment

Depending on your design, there are several different ways to align your label element.

:::demo The `labmu-position` attribute decides how labels align, it can be `top` or `left`. When set to `top`, labels will be placed at the top of the form field.

```html
<div style="margin: 20px;"></div>
<mu-form :labmu-position="labelPosition" labmu-width="100px" :model="formLabelAlign">
  <mu-form-item label="Name">
    <mu-input v-model="formLabelAlign.name"></mu-input>
  </mu-form-item>
  <mu-form-item label="Activity zone">
    <mu-input v-model="formLabelAlign.region"></mu-input>
  </mu-form-item>
  <mu-form-item label="Activity form">
    <mu-input v-model="formLabelAlign.type"></mu-input>
  </mu-form-item>
</mu-form>
<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      }
    }
  }
</script>
```

:::

### Validation

Form component allows you to verify your data, helping you find and correct errors.

:::demo Just add the `rules` attribute for `Form` component, pass validation rules, and set `prop` attribute for `Form-Item` as a specific key that needs to be validated. See more information at [async-validator](https://github.com/yiminghe/async-validator).

```html
<mu-form :model="ruleForm" :rules="rules" ref="ruleForm" labmu-width="120px" class="demo-ruleForm">
  <mu-form-item label="Activity name" prop="name">
    <mu-input v-model="ruleForm.name"></mu-input>
  </mu-form-item>
  <mu-form-item>
    <mu-button type="primary" @click="submitForm('ruleForm')">Create</mu-button>
    <mu-button @click="resetForm('ruleForm')">Reset</mu-button>
  </mu-form-item>
</mu-form>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
          date1: [{ type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }],
          date2: [{ type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }],
          type: [{ type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }],
          resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
          desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
```

:::

### Custom validation rules

This example shows how to customize your own validation rules to finish a two-factor password verification.

:::demo Here we use `status-icon` to reflect validation result as an icon.

```html
<mu-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" labmu-width="120px" class="demo-ruleForm">
  <mu-form-item label="Password" prop="pass">
    <mu-input type="password" v-model="ruleForm.pass" autocomplete="off"></mu-input>
  </mu-form-item>
  <mu-form-item label="Confirm" prop="checkPass">
    <mu-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></mu-input>
  </mu-form-item>
  <mu-form-item label="Age" prop="age">
    <mu-input v-model.number="ruleForm.age"></mu-input>
  </mu-form-item>
  <mu-form-item>
    <mu-button type="primary" @click="submitForm('ruleForm')">Submit</mu-button>
    <mu-button @click="resetForm('ruleForm')">Reset</mu-button>
  </mu-form-item>
</mu-form>
<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the age'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
          } else {
            if (value < 18) {
              callback(new Error('Age must be greater than 18'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("Two inputs don't match!"))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }],
          age: [{ validator: checkAge, trigger: 'blur' }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
```

:::

:::tip
Custom validate callback function must be called. See more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
:::

### Delete or add form items dynamically

:::demo In addition to passing all validation rules at once on the form component, you can also pass the validation rules or delete rules on a single form field dynamically.

```html
<mu-form :model="dynamicValidateForm" ref="dynamicValidateForm" labmu-width="120px" class="demo-dynamic">
  <mu-form-item
    prop="email"
    label="Email"
    :rules="[
      { required: true, message: 'Please input email address', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]"
  >
    <mu-input v-model="dynamicValidateForm.email"></mu-input>
  </mu-form-item>
  <mu-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'Domain' + index"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: 'domain can not be null', trigger: 'blur'
    }"
  >
    <mu-input v-model="domain.value"></mu-input><mu-button @click.prevent="removeDomain(domain)">Delete</mu-button>
  </mu-form-item>
  <mu-form-item>
    <mu-button type="primary" @click="submitForm('dynamicValidateForm')">Submit</mu-button>
    <mu-button @click="addDomain">New domain</mu-button>
    <mu-button @click="resetForm('dynamicValidateForm')">Reset</mu-button>
  </mu-form-item>
</mu-form>
<script>
  export default {
    data() {
      return {
        dynamicValidateForm: {
          domains: [
            {
              key: 1,
              value: ''
            }
          ],
          email: ''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          key: Date.now(),
          value: ''
        })
      }
    }
  }
</script>
```

:::

### Number Validate

:::demo Number Validate need a `.number` modifier added on the input `v-model` binding，it's used to transform the string value to the number which is provided by Vuejs.

```html
<mu-form :model="numberValidateForm" ref="numberValidateForm" labmu-width="100px" class="demo-ruleForm">
  <mu-form-item
    label="age"
    prop="age"
    :rules="[
      { required: true, message: 'age is required'},
      { type: 'number', message: 'age must be a number'}
    ]"
  >
    <mu-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></mu-input>
  </mu-form-item>
  <mu-form-item>
    <mu-button type="primary" @click="submitForm('numberValidateForm')">Submit</mu-button>
    <mu-button @click="resetForm('numberValidateForm')">Reset</mu-button>
  </mu-form-item>
</mu-form>
<script>
  export default {
    data() {
      return {
        numberValidateForm: {
          age: ''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
```

:::

:::tip
When an `mu-form-item` is nested in another `mu-form-item`, its label width will be `0`. You can set `labmu-width` on that `mu-form-item` if needed.
:::

### Form Attributes

### Form Attributes

| 参数                    | 说明                                                                                      | 类型    | 可选值                | 默认值 |
| ----------------------- | ----------------------------------------------------------------------------------------- | ------- | --------------------- | ------ |
| model                   | 表单数据对象                                                                              | object  | —                     | —      |
| rules                   | 表单验证规则                                                                              | object  | —                     | —      |
| inline                  | 行内表单模式                                                                              | boolean | —                     | false  |
| label-position          | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width`                   | string  | right/left/top        | right  |
| label-width             | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。 | string  | —                     | —      |
| label-suffix            | 表单域标签的后缀                                                                          | string  | —                     | —      |
| hide-required-asterisk  | 是否显示必填字段的标签旁边的红色星号                                                      | boolean | —                     | false  |
| show-message            | 是否显示校验错误信息                                                                      | boolean | —                     | true   |
| inline-message          | 是否以行内形式展示校验信息                                                                | boolean | —                     | false  |
| status-icon             | 是否在输入框中显示校验结果反馈图标                                                        | boolean | —                     | false  |
| validate-on-rule-change | 是否在 `rules` 属性改变后立即触发一次验证                                                 | boolean | —                     | true   |
| size                    | 用于控制该表单内组件的尺寸                                                                | string  | medium / small / mini | —      |
| disabled                | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效         | boolean | —                     | false  |

### Form Methods

| 方法名        | 说明                                                                                                                                                                 | 参数                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))                              |
| validateField | 对部分表单字段进行校验的方法                                                                                                                                         | Function(props: array \| string, callback: Function(errorMessage: string)) |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           | —                                                                          |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果                                                             | Function(props: array \| string)                                           |

### Form Events

| 事件名称 | 说明                   | 回调参数                                                   |
| -------- | ---------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

### Form-Item Attributes

| 参数           | 说明                                                                         | 类型    | 可选值                            | 默认值 |
| -------------- | ---------------------------------------------------------------------------- | ------- | --------------------------------- | ------ |
| prop           | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string  | 传入 Form 组件的 `model` 中的字段 | —      |
| label          | 标签文本                                                                     | string  | —                                 | —      |
| label-width    | 表单域标签的的宽度，例如 '50px'。支持 `auto`。                               | string  | —                                 | —      |
| required       | 是否必填，如不设置，则会根据校验规则自动生成                                 | boolean | —                                 | false  |
| rules          | 表单验证规则                                                                 | object  | —                                 | —      |
| error          | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息    | string  | —                                 | —      |
| show-message   | 是否显示校验错误信息                                                         | boolean | —                                 | true   |
| inline-message | 以行内形式展示校验信息                                                       | boolean | —                                 | false  |
| size           | 用于控制该表单域下组件的尺寸                                                 | string  | medium / small / mini             | -      |

### Form-Item Slot

| name  | 说明             |
| ----- | ---------------- |
| —     | Form Item 的内容 |
| label | 标签文本的内容   |

### Form-Item Scoped Slot

| name  | 说明                                           |
| ----- | ---------------------------------------------- |
| error | 自定义表单校验信息的显示方式，参数为 { error } |

### Form-Item Methods

| 方法名        | 说明                                                 | 参数 |
| ------------- | ---------------------------------------------------- | ---- |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -    |
| clearValidate | 移除该表单项的校验结果                               | -    |