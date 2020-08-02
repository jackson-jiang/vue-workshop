/* eslint-disable */
import Vue from 'vue'
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
    Notice = Vue.extend({...config, ...{
      provide
    }})
    noticeCache.set(config, Notice)
  }
  let vm = new Notice({propsData})

  // 挂载实例
  vm.$mount()
  const el = vm.$el
  document.body.append(el)
  return vm
}

export default {
  install(Vue) {
    Vue.prototype.$create = create
  }
}
