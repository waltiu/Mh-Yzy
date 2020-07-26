<template>
  <div>
    <el-card
      v-if="checkCardStatus(['switchY', 'odf', 'deviceRoom', 'device', 'opticalSplitter'])"
      class="box-card"
      style="padding: 0px 8px 10px 0px; margin-top: 10px;margin-left: 15px;margin-bottom: 100px"
    >
      <div>
        <el-tabs value="opticalSplitter" type="card">
          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['switchY'].key + '.r')"
            :label="$t('infoMap.cableBox')"
            name="switchY"
          >
            <switch-card></switch-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['odf'].key + '.r')"
            label="ODF"
            name="odf"
          >
            <odf-card></odf-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['deviceRoom'].key + '.r')"
            :label="$t('infoMap.motorRoom')"
            name="deviceRoom"
          >
            <device-room-card :mapDom="mapDom"></device-room-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['device'].key + '.r')"
            :label="$t('infoMap.equipment')"
            name="device"
          >
            <device-card></device-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['opticalSplitter'].key + '.r')"
            :label="$t('infoMap.opticalSplitter')"
            name="opticalSplitter"
          >
            <optical-splitter-card></optical-splitter-card>
          </el-tab-pane>
          <el-tab-pane label="CRAN">
            <cran-card :mapDom="mapDom"></cran-card>
          </el-tab-pane>
          <el-tab-pane label="框槽">
            <machine-card :mapDom="mapDom"></machine-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import cranCard from '../components/cran'
import machineCard from '../components/machine'
import deviceRoomCard from '../components/deviceRoom'
import deviceCard from '../components/device'
import odfCard from '../components/odf'
import switchCard from '../components/switch'
import opticalSplitterCard from '../components/opticalSplitter'

export default {
  name: 'pointCard',
  components: {
    opticalSplitterCard,
    deviceRoomCard,
    deviceCard,
    odfCard,
    switchCard,
    cranCard,
    machineCard
  },
  props: {
    mapDom: Object,
  },
  methods: {
    checkCardStatus (list) {
      return list.filter(item => this.$store.getters.getUserRole.includes(this.$userPermission[item].key + '.r'))
        .length
    }
  }
}
</script>
