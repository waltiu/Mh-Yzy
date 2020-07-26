<template>
  <div class="layerBox">
    <div class="layerSwicther" @click="() => {contantStatus = !contantStatus}">
      <i class="layerSwictherIcon el-icon-s-operation"></i>
      <span class="layerSpan">{{$t('main.switchMap')}}</span>
    </div>

    <transition name="el-zoom-in-top">
      <div class="layerContent" v-if="contantStatus">
        <div class="radioContent">
          <el-radio-group v-model="radio" @change="setBaseLayer">
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
      radio: ''
    }
  },
  methods: {
    setBaseLayer (skey) {
      let target = Object.entries(this.mapLayerList).reduce((res, [key, val]) => {
        val.options.visible = (skey === key)
        res[key] = val
        return res
      }, {})
      this.map.setBaseLayer(
        new maptalks.GroupTileLayer('Base TileLayer', Object.values(target))
      )
      this.$emit('layerChange', skey, this.mapLayerList)
      setHttpStatus('coordinate', this.mapLayerList[skey].options.coordinate)
    },
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
