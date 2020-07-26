<template>
  <div v-loading="loading">
    <div style="display: flex">
      <public-content style="width: 40vw;" :column="tableColumn" :fullData="fullData"></public-content>

      <div style="width: 55vw; margin-left: 20px;">
        <div style="display:flex;justify-content: flex-end;margin-bottom: 10px;">
          <show-diff :fullData="fullData"></show-diff>
        </div>

        <select-item
          :selectInfo="fullData.ldsysOpticaleCableWorks"
          @change="(info) => { showInfo = info }"
        ></select-item>
        <show-map style="margin-top: 10px;" :fullData="fullData" :showInfo="showInfo"></show-map>
      </div>
    </div>
  </div>
</template>

<script>
import { column } from '../index.js'
import ShowMap from '../components/map'
import SelectItem from '../components/select'
import showDiff from './diffRoute'

export default {
  name: 'ContentPage',
  props: {
    request: Object,
    info: Object
  },
  components: {
    ShowMap, SelectItem, showDiff
  },
  data () {
    return {
      fullData: {},
      loading: false,
      showInfo: []
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
  },
  methods: {
    loadInfo () {
      this.loading = true
      this.request
        .readOneTable({ info: this.info })
        .then(res => { this.fullData = res.data })
        .then(() => { this.showInfo = this.fullData.ldsysOpticaleCableWorks })
        .finally(() => { this.loading = false })
    }
  },
  computed: {
    tableColumn: function () {
      return Object.values(column)
        .filter(item => item.read && item.read.display)
        .filter(item => item.read.display())
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.read
          }
        })
    }
  },
}
</script>
