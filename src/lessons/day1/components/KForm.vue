<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
let status = {value:1}
/* eslint-disable */
export default {
  name: 'KForm',
  componentName: 'KForm',
  created() {
    // 收集form-item
    // ! 不能再mounted中，因为子元素的mounted会先执行
    this.$on('add.field', function(field) {
      this.fields.push(field)
    })
  },
  provide() {
    return {
      form: this,
      status,
    }
  },
  data() {
    return {
      status: 1,
      fields: []
    }
  },
  props: {
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // ! provide/inject 响应式测试
    updateStatus() {
      this.status++
      status.value++
    },
    async validate() {
      return (await  Promise.all(
        // 直接子元素调用方式
        // this.$children.map(item => item.validate())
        // ! 跨层级调用方式，需要先收集field
        this.fields.map(item => item.validate())
      )).filter(msg => msg)
    }
  }
}
</script>
