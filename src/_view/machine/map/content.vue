<template>
  <div v-loading="loading">mapContent</div>
</template>

<script>


export default {
  name: 'mapContent',
  props: {
    request: Object,
    info: Object
  },

}
</script>
