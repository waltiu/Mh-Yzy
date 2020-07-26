<script>
export default {
  name: 'colorPicker',
  props: {
    color: String
  },
  render (h) {
    return h('div', {
      style: {
        'width': '20px',
        'height': '20px',
        'border-radius': '50%',
        'background-color': this.color
      }
    })
  }
}
</script>
