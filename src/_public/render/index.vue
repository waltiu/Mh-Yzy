<script>
export default {
  name: 'RenderObject',
  props: {
    renderObject: Function,
    info: Object,
    fullData: null
  },
  render (h) {
    return h.call(this, 'div', [
      this.renderObject(h, {
        ...this.info,
      }, this.fullData)
    ])
  }
}
</script>
