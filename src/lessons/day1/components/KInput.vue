<template>
  <div>
    <input :type="type" :value="_val" @input="handleInput"/>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'KInput',
  componentName: 'KInput',
  model: {
    // v-model, v-bind:_val=""
    prop: '_val',
    // v-model, v-on:change="xxx = e.target.value"
    event: 'change'
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    _val: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // ! 防抖
    handleInput: _.debounce(function(e) {
      this.$emit('change', e.target.value)
      // 直接访问父元素方式
      // this.$parent.$emit('validate', e.target.value)
      // ! 跨层级方式
      this.$dispatch('KFormItem', 'validate', e.target.value)
      console.log('input emit'+e.target.value)
    }, 200)
  },
}
</script>
