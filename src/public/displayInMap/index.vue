<template>
  <dialog-page
    :info="point"
    :title="$t('infoMap.viewMap')"
    :modal="false"
    width="88%"
    top="2vh"
    @close="emitPoint"
    class="mapModel"
  >
    <info-map-show
      v-if="type != 'user'"
      @mapReady="mapReady"
      :propStyle="{width: '100%', height: '90vh', 'border-radius': '12px'}"
    >
      <div
        v-if="$store.getters.vendorNameByTypeArray[type].map === 'complex'"
        style="display: flex; float: left; margin-top: 10px;"
      >
        <div v-for="(item, index) in resultData.mapInfo" :key="index">
          <select-button
            v-if="$store.state.vendor.vendorName[index]"
            :stastatusItem="status[index]"
            :title="index"
            @changeStatus="changeStatus"
          >{{ $t($store.state.vendor.vendorName[index].name) + ' ' + item.length }}</select-button>
        </div>
      </div>
    </info-map-show>

    <div slot="footer"></div>
  </dialog-page>
</template>

<script>
import { ShowInMap } from '@/_public/map/class/ShowInMap'
import selectButton from '@/_public/filterbutton/index.vue'

export default {
  name: 'displayInMap',
  props: {
    type: String,
    point: [Object, Array] // 要展示的数据, lines or point
  },
  components: {
    selectButton
  },
  watch: {
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
    resultData: {},
    mapInfo: [],
    titleList: [],
    newStatus: {}
  }),
  methods: {
    mapReady (map) {
      this.mapDom = new ShowInMap(map, this)
    },
    changeStatus (title, info) {
      let a = this.newStatus
      a[title] = info

      this.newStatus = { ...this.newStatus, ...a }
      let mapInfo = { ...this.mapInfo }
      this.titleList.map(item => {
        if (!this.newStatus[item]) {
          mapInfo[item] = []
        }
      })

      let data = { ...this.resultData, ...{ mapInfo: mapInfo } }
      this.mapDom.render(this.type, [data])
    },
    getMoreInfo () {
      this.titleList = []
      this.$getMapFullInfo(this.type, this.point, (result) => {
        this.resultData = result.data
        if (this.resultData.mapInfo) {
          this.mapInfo = { ...this.resultData.mapInfo }
          Object.entries(result.data.mapInfo).map(item => {
            this.titleList.push(item[0])
            if (item[1].length > 0) {
              this.status[item[0]] = true
            } else {
              this.status[item[0]] = false
            }

          })
          this.newStatus = { ...this.status }

        }
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

<style>
.mapModel {
  z-index: 1000 !important;
  overflow-y: hidden;
}
</style>
