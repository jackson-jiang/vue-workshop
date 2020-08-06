function defineReactive (object, key, val) {
  object.__Dep = {
    watchers: [],
    notify () {
      this.watchers.forEach(watcher => {
        watcher()
      });
    }
  }
  Object.defineProperty(object, key, {
    get () {
      console.log('get', key);
      return val
    },
    set (newVal) {
      val = newVal
      console.log('set', key);
    }
  })

}
