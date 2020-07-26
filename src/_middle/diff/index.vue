<template>
  <div>
    <public-alert-page :info="showInfo" :title="'路由对比'" width="85vw">
      <table-view :showInfo="showInfo"></table-view>
    </public-alert-page>
  </div>
</template>

<script>
import tableView from './table'

export default {
  name: 'DiffRouteWithAlertPage',
  props: {
    showInfo: Array
  },
  components: {
    tableView
  }
}
</script>
