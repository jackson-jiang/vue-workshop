export default {
  render (h) {
    // 组件config而不是实例
    return h(
      this.$router.current
    )
  }
}
