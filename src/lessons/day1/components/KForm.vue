<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
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
      form: this
    }
  },
  data() {
    return {
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
