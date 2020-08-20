<template>
  <div>
    {{ msg }}
  </div>
</template>

<script lang="ts">
// ! 暗号：you can you up
import { Vue } from 'vue-property-decorator/lib/vue-property-decorator'
import Component from 'vue-class-component/lib'
import loading from '@/utils/loading'

function dec (): Function {
  console.log('factory 1')
  return function (): Function {
    console.log('factory 2')
    return function () {
      console.log('dec ')
    }
  }
}

const decset = {
  dec: function (): Function {
    return function () {
      console.log('decset')
    }
  }
}

@Component
export default class TsTest extends Vue {
  msg = ''
  mounted () {
    this.msg = 'hello TS'
    this.getData()
  }

  @decset.dec()
  @dec()()
  // @loading() ==> loading
  @loading({ title: '加载中' })
  async getData () {
    // 异步函数两秒
    await new Promise(resolve => {
      setTimeout(() => { resolve() }, 2000)
    })
  }
}
</script>

<style scoped>

</style>
