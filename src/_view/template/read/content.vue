<template>
  <div v-loading="loading">read</div>
</template>

<script>

export default {
  name: 'readContent',
  props: {
    request: Object,
    info: Object
  },


}
</script>
