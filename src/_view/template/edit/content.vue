<template>
  <div v-loading="loading">edit</div>
</template>

<script>

export default {
  name: 'EditContent',
  props: {
    request: Object,
    info: Object
  },

  data () {
    return {

    }
  },
  watch: {
    request: {
      immediate: true,
      handler: function () {
        this.loadInfo()
      },
      deep: true
    }
  }

}
</script>
