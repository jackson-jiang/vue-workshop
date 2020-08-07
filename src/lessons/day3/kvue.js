import Observer from './Observer'

class Vue {
  constructor (options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this.$data = this.$options.data
    this.$methods = this.$options.methods

    proxy(this, this.$data)
    proxy(this, this.$methods)
    // 数据响应式
    new Observer(this.$data)
    this.compile(this.$el)
  }
  compile (el) {
    // if (typeof el === 'string') { // selector
      if (el.nodeType == 3) { // text
        this.compileText(el)
      } else if (el.nodeType == 1) { // element
        // el.innerText = this.counter
        this.compileElement(el)
      }
      Array.from(el.childNodes).forEach(child => {
        this.compile(child)
      })
  //   }
  }
  compileText (el) {
    if(/\[\[(.*)\]\]/.exec(el.textContent)) {
      // el.textContent = this.$data[RegExp.$1]
      this.text('text', el.parentNode, RegExp.$1)
    }
  }
  compileElement (el) {
    const attrs = el.getAttributeNames()

    attrs.forEach(attr => {
      if (attr.startsWith('k-')) {
        const vm = this
        vm
        let dir = attr.slice(2), dirVal
        const val = el.getAttribute(attr)
        if (dir.includes(':')) {
          [dir, dirVal ] = dir.split(':')
        }
        // TODO 传参都改成解构
        // 调用具体指令方法
        this[dir] && this[dir](dir, el, val, dirVal)
      } else if (attr.startsWith('_')) {
        let dirVal = attr.slice(1)
        const val = el.getAttribute(attr)
        // 调用具体指令方法
        this['on'] && this['on']('on', el, val, dirVal)
      }
    })
  }

  text (key, el, val) {
    this.update(key, el, val)
  }
  textUpdater (key, el, val) {
    el.innerText = this[val]
  }
  bind (key, el, val, dirVal) {
    this.update(key, el, val, dirVal)
  }
  bindUpdater (key, el, val, dirVal) {
    el[dirVal] = this[val]
  }
  on (key, el, val, dirVal) {
    if (typeof val === 'function') {
      el.addEventListener(dirVal, val.bind(this))
    } else { // string.
      el.addEventListener(dirVal, this[val].bind(this))
    }
    // this.update(key, el, val, dirVal)
  }
  // model, dom, mvalue
  model (key, el, val) {
    debugger
    function handleInput (e) {
      this[val] = e.target.value
    }
    this.bind('bind', el, val, 'value')
    this.on(key, el, handleInput, 'input')
    // this.update(key, el, val, dirVal)
  }
  update (key, el, val, dirVal) {
    let fn = this[key+'Updater']
    // 首次更新
    if (fn) {
      fn = fn.bind(this)
      fn(key, el, val)
    }
    if (val) {
      new Watcher(this, val, fn, el, key, dirVal)
    }
  }
}

class Watcher {
  constructor (vm, val, fn, el, key, dirVal) {
    this.update = function () {
      fn(key, el, val, dirVal)
    }
    // 搭桥传递
    vm.$data.__Dep.watcher = this
    // 执行收集
    vm[val]
  }
}

function proxy (obj, target) {
  for (const key in target) {
    Object.defineProperty(obj, key, {
      get () {
        return target[key]
      },
      set (val) {
        target[key] = val
      }
    })
  }
}

export default Vue
