<!--
 * @Author: Victor wang
 * @Date: 2020-06-11 17:49:34
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-17 22:42:43
 * @Description:
-->

## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 基础表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker

```html
<mu-form ref="form" :model="form" label-width="120px">
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
W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：

> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>

即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `<mu-form>` 标签上添加 `@submit.native.prevent`。
:::

### Inline form

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

:::demo 设置 `inline` 属性可以让表单域变为行内的表单域

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

### 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

:::demo 通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 `top`、`left`，当设为 `top` 时标签会置于表单域的顶部

```html
<div style="margin: 20px;"></div>
<mu-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
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

### 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

:::demo Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)

```html
<mu-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
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
          name: ''
        },
        rules: {
          name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        console.log(this.$refs[formName].validate)
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

### 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

:::demo 本例还使用`status-icon`属性为输入框添加了表示校验结果的反馈图标。

```html
<mu-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
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
        }, 10)
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
自定义校验 callback 必须被调用。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。
:::

### 动态增减表单项

:::demo 除了在 Form 组件上一次性传递所有的验证规则外还可以在单个的表单域上传递属性的验证规则

```html
<mu-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
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

### 数字类型验证

:::demo 数字类型的验证需要在 `v-model` 处加上 `.number` 的修饰符，这是 `Vue` 自身提供的用于将绑定值转化为 `number` 类型的修饰符。

```html
<mu-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
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
When an `mu-form-item` is nested in another `mu-form-item`, its label width will be `0`. You can set `label-width` on that `mu-form-item` if needed.
:::

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
