<template>
  <div>
    <info-map-show
      :mapDisplayControl="mapDisplayControl"
      @mapReady="mapReady"
      v-loading="loading"
      :propStyle="mapStyle"
    >
      <div
        v-if="$store.getters.vendorNameByTypeArray[type].map === 'complex'"
        style="display: flex; float: left; margin-top: 10px;flex-wrap: wrap;"
      >
        <div v-for="(item, index) in resultData.mapInfo" :key="index">
          <select-button
            v-if="$store.state.vendor.vendorName[index]"
            v-model="status[index]"
          >{{ $t($store.state.vendor.vendorName[index].name) + ' ' + item.length }}</select-button>
        </div>
      </div>
    </info-map-show>
  </div>
</template>

<script>
import { ShowInMap } from '@/_public/map/class/ShowInMap'
import selectButton from '@/_public/filterbutton/index.vue'

export default {
  name: 'displayInMap',
  props: {
    mapDisplayControl: Object,
    mapStyle: {
      default: () => {
        return { width: '100%', height: '100%', 'border-radius': '12px' }
      },
      type: Object
    },
    type: String,
    point: Object || Array // 要展示的数据, lines or point
  },
  components: {
    selectButton
  },
  watch: {
    status: {
      handler: function () {
        let info = this._.cloneDeep(this.resultData)
        info.mapInfo = Object.entries(info.mapInfo).reduce((res, [key, val]) => {
          res[key] = this.status[key] ? val : []
          return res
        }, {})
        this.mapDom.render(this.type, [info])
      },
      deep: true
    },
    point: function (newVal) {
      if (this._.isEmpty(newVal)) {
        return
      }
      this.loading = true
      // 设置zoom
      this.$store.commit('setMapProperty', {
        key: 'zoom',
        info: 17
      })
      // 二次请求
      this.getMoreInfo()
    }
  },
  computed: {
    showPointInMap: function () {
      if (Array.isArray(this.point)) {
        return this.point || []
      } else {
        return [this.point] || []
      }
    },
    showLineInMap: function () {
      if (!this.point) {
        return []
      }
      if (Array.isArray(this.point)) {
        return this.point || []
      } else {
        return [this.point] || []
      }
    }
  },
  data: () => ({
    loading: true,
    status: {},
    mapDom: () => { },
    resultData: {}
  }),
  methods: {
    mapReady (map) {
      this.mapDom = new ShowInMap(map, this)
    },
    getMoreInfo () {
      this.$getMapFullInfo(this.type, this.point, (result) => {
        // this.$store.commit('setDefaultShow', {
        //   name: this.type,
        //   lines: [result.data]
        // })

        this.resultData = result.data

        this.mapDom.render(this.type, [result.data])

        this.$setMapCenter(result.data)

        this.loading = false
      })
    },
    emitPoint () {
      this.$emit('update:point', null)
    }
  }
}
</script>
