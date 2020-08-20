// ！ 暗号: you can you up
// loading装饰器，异步函数执行前显示loading弹框
// reslove后关闭
export default function loading (options: object = {}): Function {
  return function (target: any, prop: any, descriptor: any) {
    const fn = descriptor.value
    descriptor.value = async function getData () {
      // message 方法来自day1的弹框组件
      const loading = target.$message({ ...{ title: 'loading' }, ...options })
      await fn.call(target)
      loading.hide()
    }
  }
}
