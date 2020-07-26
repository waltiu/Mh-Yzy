<template>
  <div>
    <base-info-alert
      @close="$emit('close')"
      :columns="columns"
      :selectArrayShow="selectArrayShow"
      :type="type"
    ></base-info-alert>
  </div>
</template>

<script>
export default {
  name: 'ErrorAlertPage',
  props: {
    columns: Array,
    selectArrayShow: Object,
    type: String
  }
}
</script>
