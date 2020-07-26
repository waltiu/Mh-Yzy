<script>
export default {
  name: 'renderComponents',
  props: {
    renderObject: Object,
    info: Object
  },
  render (info) {
    return info('div', [
      this.renderObject.render(info, {
        ...this.info,
        index: this.info.$index
      })
    ])
  }
}
</script>
