<template>
  <div v-loading="loading">
    <div>
      <select-item
        :selectInfo="fullData.ldsysOpticaleCableWorks"
        @change="(info) => { showInfo = info }"
      ></select-item>
      <show-map
        :mapStyle="{ width: '100%', height: '70vh' }"
        style="margin-top: 10px;"
        :showInfo="showInfo"
        :fullData="fullData"
      ></show-map>
    </div>
  </div>
</template>

<script>
import { column } from '../index.js'
import ShowMap from '../components/map'
import SelectItem from '../components/select'

export default {
  name: 'ContentPage',
  props: {
    request: Object,
    info: Object
  },
  data () {
    return {
      fullData: {},
      loading: false,
      showInfo: []
    }
  },
  components: {
    SelectItem, ShowMap
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
