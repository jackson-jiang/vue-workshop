<template>
  <div>
    <h2>day1-2020/07/31 组件化实战</h2>
    <div>
      <k-form :model="model" :rules="rules" ref='form'>
        <!-- wrapper 破坏父子结构 -->
        <DivWrapper class="field-wrapper">
          <k-form-item label="用户名" prop="name">
            <DivWrapper class="field-wrapper">
              <k-input v-model="model.name"></k-input>
            </DivWrapper>
          </k-form-item>
        </DivWrapper>
        <DivWrapper class="field-wrapper">
          <k-form-item label="密码" prop="password">
            <DivWrapper class="field-wrapper">
              <k-input type="password" v-model="model.password"></k-input>
            </DivWrapper>
          </k-form-item>
        </DivWrapper>
      </k-form>
      <button @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import KForm from "./components/KForm";
import KFormItem from "./components/KFormItem";
import KInput from "./components/KInput";
import Notice from "./components/Notice";
import DivWrapper from "./components/DivWrapper";

export default {
  name: 'Day1',
  components: {
    KInput,
    KFormItem,
    KForm,
    DivWrapper
  },
  data() {
    return {
      model: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空'}
        ],
        password: [
          { required: true, message: '密码不能为空'}
        ]
      }
    }
  },
  methods: {
    async submit() {
      const validateResult = await this.$refs.form.validate()
      if (validateResult.length > 0) {
        this.$create(Notice, {
          title: '校验失败',
          message: validateResult.join()
        }).show()
      } else {
        this.$create(Notice, {
          title: '提交成功'
        }).show()
      }
    }
  }
}
</script>
