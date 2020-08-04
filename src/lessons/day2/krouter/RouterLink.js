export default {
  props: ['to'],
  render (h) {
    return h(
      'a',
      {
        attrs: {
          href: '#' + this.to
        }
      },
      this.$slots.default
    )
  }
}
