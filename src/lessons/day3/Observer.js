  // __Dep可以用闭包全局变量来代替，class Dep
  // watcher通过Dep.target传递

function defineReactive (object, key, val) {
  // 每个属性一个dep
  object.__Dep = {
    watchers: [],
    notify () {
      this.watchers.forEach(watcher => {
        watcher.update()
      });
    }
  }
  Object.defineProperty(object, key, {
    get () {
      console.log('get', key);
      // 添加监听
      this.__Dep.watcher && this.__Dep.watchers.push(this.__Dep.watcher)
      this.__Dep.watcher = null
      return val
    },
    set (newVal) {
      // 处理新添加的属性
      val = newVal
      console.log('set', key);
      this.__Dep.notify(key)
    }
  })
}

// observe和Observer弄反了
function observe (obj) {
  if (!obj || (typeof obj != 'object')) {
    return obj
  }
  for (const key in obj) {
    // if (obj.hasOwnProperty(key)) {
    const val = obj[key];
    defineReactive(obj, key, val)

    // 属性是对象的
    if (typeof val === 'object') {
      observe(val)
    }
    // }
  }
}

class Observer {
  constructor (obj) {
    if (typeof obj === 'object') {
      observe(obj)
    } else { // Array...
      // ...
    }
  }
}

export default Observer

// const obj = {
//   a: 1,
//   b: 2
// }
// observe(obj)

// obj.a
// obj.a++
