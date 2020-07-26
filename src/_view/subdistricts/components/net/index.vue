<template>
  <div>
    <div style="display: flex;">
      <div>
        <select-show :eventBus="eventBus"></select-show>

        <map-show :eventBus="eventBus"></map-show>
      </div>

      <local-search style="padding-left: 10px;" :eventBus="eventBus"></local-search>
    </div>
    <remote-search :eventBus="eventBus"></remote-search>
  </div>
</template>

<script>
import MapShow from '../map'
import SelectShow from '../select'
import RemoteSearch from './remotesearch'
import LocalSearch from './search'

export default {
  name: 'NetEdit',
  components: {
    MapShow,
    SelectShow, RemoteSearch, LocalSearch
  },
  props: {
    eventBus: Object
  }
}
</script>
