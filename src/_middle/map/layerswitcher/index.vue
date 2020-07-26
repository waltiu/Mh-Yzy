<template>
  <div class="layerBox">
    <div class="layerSwicther" @click="() => {contantStatus = !contantStatus}">
      <i class="layerSwictherIcon el-icon-s-operation"></i>
      <span class="layerSpan">{{$t('main.switchMap')}}</span>
    </div>

    <transition name="el-zoom-in-top">
      <div class="layerContent" v-if="contantStatus">
        <div class="radioContent">
          <el-radio-group v-model="radio" @change="layerChange">
            <el-radio
              v-for="(item, index) in mapLayerList"
              :key="index"
              class="radioBox radioButton"
              :label="index"
            >{{index }}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash'
import * as maptalks from 'maptalks'
import { setHttpStatus } from '@/_public/map/class/LayerChange'

export default {
  name: 'layerSwither',
  props: {
    map: Object
  },
  computed: {
    mapLayerList: function () {
      return !_.isEmpty(this.map) ? this.map.getBaseLayer()['layerMap'] : []
    }
  },
  data () {
    return {
      contantStatus: false,
      radio: '百度地图 - 标准',
      coordinate: 'BD'
    }
  },
  methods: {
    layerChange (skey) {
      if (this.coordinate !== this.mapLayerList[skey].options['coordinate']) {

        this.$confirm(this.$i18n.t('alert.overload'), this.$i18n.t('addZone.prompt'), {
          confirmButtonText: this.$i18n.t('dynamic.determine'),
          cancelButtonText: this.$i18n.t('user.cancel'),
          type: 'warning'
        }).then(() => {
          this.coordinate = this.mapLayerList[skey].options['coordinate']
          this.setBaseLayer(skey)
        })
      } else {
        this.setBaseLayer(skey)
      }
    },
    setBaseLayer (skey) {
      this.contantStatus = false
      let mapSet1 = [
        "天地图 - 矢量地图",
        "高德 - 矢量地图",
        "高德 - 卫星地图",
        "天地图 - 卫星地图",
        "TDMap - Vector Map",
        "TDMap - Satellite Map",
        "Amap - Vector Map",
        "Amap - Satellite Map"
      ]
      let mapSet2 = [
        "Google - 矢量地图",
        "Google - 卫星地图",
        "Google - Satellite Map",
        "Google - Vector Map"
      ]
      let target = Object.entries(this.mapLayerList).reduce((res, [key, val]) => {
        val.options.visible = (skey === key)
        res[key] = val
        return res
      }, {})
      if (mapSet1.includes(skey)) {
        this.map.options.maxZoom = 18
      } else if (mapSet2.includes(skey)) {
        this.map.options.maxZoom = 20
      } else {
        this.map.options.maxZoom = 19
      }
      this.map.setBaseLayer(
        new maptalks.GroupTileLayer('Base TileLayer', Object.values(target))
      )
      this.map._zoomLevel = 18
      this.$emit('layer-change', skey, this.mapLayerList, this.mapLayerList[skey].options.coordinate)
      setHttpStatus('coordinate', this.mapLayerList[skey].options.coordinate)
    },
  },
  mounted () {
    setHttpStatus('coordinate', 'BD')
  }
}
</script>

<style scoped>
.layerContent {
  background-color: white;
  min-height: 50px;
}
.layerBox {
  cursor: pointer;
  width: 210px;
  height: 38px;
  background-color: white;
}
.layerSpan {
  font-size: 15px;
}
.radioButton {
  margin-top: 3px;
  margin-bottom: 3px;
}
.radioContent {
  margin: 10px;
}
.layerSwictherIcon {
  font-size: 20px;
}
.radioBox {
  padding: 5px;
}
.layerSwicther {
  margin-top: 8px;
  margin-left: 14px;
}
</style>
