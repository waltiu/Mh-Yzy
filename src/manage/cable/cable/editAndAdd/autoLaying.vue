<template>
  <div>
    <info-map-show
      mapType="CableLaying"
      :propStyle="{width: '100%', height: '80vh'}"
      @mapReady="mapReady"
    >
      <div slot="bar">
        <el-card style="padding: 10px; margin-top: 10px;margin-left: 15px">
          <div style="margin: 0px;">
            <el-steps :active="active" style="padding: 20px">
              <el-step :title="$t('cable.startingPoint')" icon="el-icon-location"></el-step>
              <el-step :title="$t('cable.carrier')" icon="el-icon-upload2"></el-step>
              <el-step :title="$t('OS.complete')" icon="el-icon-success"></el-step>
            </el-steps>

            <div>
              <select-item-item v-show="active === 1" @returnData="(item) => bus.item = item"></select-item-item>
              <select-item-bearer v-show="active === 2" @returnData="(item) => bus.bearer = item"></select-item-bearer>
              <laying-result
                v-if="active === 3"
                :bus="bus"
                @returnData="(data) => mapDom.render(data)"
              ></laying-result>
            </div>
            <div style="margin-top: 10px;">
              <el-button
                style="float: right;margin-left: 10px;"
                type="primary"
                @click="() => {active < 3 ? active++ : ''}"
                size="mini"
              >{{$t('cable.next')}}</el-button>
              <el-button
                style="float: right;"
                type="primary"
                @click="() => { active > 1 ? active-- : ''}"
                size="mini"
              >{{$t('cable.previous')}}</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </info-map-show>
  </div>
</template>

<script>
import selectItemBearer from './autoLayingFolder/bearer'
import selectItemItem from './autoLayingFolder/item'
import layingResult from './autoLayingFolder/layingResult'

import { LayingResult } from '@/_public/map/class/LayingResult'

export default {
  name: 'autoLaying',
  components: {
    layingResult,
    selectItemBearer,
    selectItemItem
  },
  data () {
    return {
      bus: {},
      active: 1,
      mapDom: () => { }
    }
  },
  methods: {
    mapReady (map) {
      this.mapDom = new LayingResult(map, this)
    }
  }
}
</script>
