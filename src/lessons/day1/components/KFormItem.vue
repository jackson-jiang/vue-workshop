<template>
  <div>
    <div v-if="this.label">{{ label }}</div>
    <div>
      <slot></slot>
    </div>
    <div v-if="errorMsg" style="color:red">
      {{ errorMsg }}
    </div>
    <div>
      <!-- 不要一起显示，否则响应式的属性重绘会导致非响应式重绘 -->
      <div>inject响应式{{ this.form.status }} (触发渲染，顺带更新下一行)</div>
      <div>inject非响应式 {{ this.status.value }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Schema from 'async-validator'
export default {
  name: 'KFormItem',
  componentName: 'KFormItem',
  inject: ['form', 'status'],
  mounted() {
    // ! 监听子元素触发校验
    this.$on('validate', this.validate)
    // ! 向form组件报告注册field
    this.form.$emit('add.field', this)
  },
  props: {
    prop: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errorMsg: ''
    }
  },
  methods: {
    async validate() {
      this.errorMsg=''
      const
      // 属性名称
      prop = this.prop,
      // 校验规则
      rules = this.form.rules[prop],
      // 值
      value = this.form.model[prop]
      // 没有prop或者没有校验规则直接退出，Promise.resolve(undefined)
      if (!prop || rules.length == 0) {
        return
      }
      // rules.forEach(rule => {
      //   const schema = new Schema({[prop]: rule})
      //   promiseArr.push(
      //     schema.validate({[prop]: value}, function(){})
      //   )
      // });
      try {
        // 执行所有校验
        await Promise.all(rules.map(
          rule =>  new Schema({[prop]: rule}).validate({[prop]: value})
        ))
      } catch ({fields}) {
        if (fields) {
          this.errorMsg = fields[prop][0].message
          return Promise.resolve(this.errorMsg)
        }
      }
    }
  },
}
</script>
