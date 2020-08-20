/* eslint-disable */
import Vue from 'vue'
import Notice from '@/views/Notice.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
console.log(About, 'About');
console.log(Home, 'Home');
console.log(Notice, 'Notice');
// 实例缓存
const noticeCache = new WeakMap()
// body 挂载dom 工具函数
function create(config /* vue config */, propsData /* data */) {
  const provide = {
    remove() {
      el.parentNode.removeChild(el)
      // 销毁实例防止内存溢出
      vm.$destory()
    }
  }
  /* 方法一：新增vue实例 */
  // let vm = new Vue({...config, propsData, ...{
  //   provide
  // }})
  /* 方法二：Vue extend，新增Notice实例 */
  //! 老杨叫我来搬砖
  let Notice = noticeCache.get(config)
  if (!Notice) {
    debugger
    Notice = Vue.extend({...config, ...{
      provide
    }})
    console.log(config, 'notice')
    console.log(Notice, 'notice')
    noticeCache.set(config, Notice)
  }
  let vm = new Notice({propsData})

  // 挂载实例
  vm.$mount()
  const el = vm.$el
  document.body.append(el)
  return vm
}

export function message (options) {
  const v = create(Notice, options)
  v.show()
  return v
}

export default {
  install(Vue) {
    Vue.prototype.$create = create
    Vue.prototype.$message = message
  }
}
