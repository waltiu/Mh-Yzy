<template>
  <div>
    <el-card
      v-if="checkCardStatus(['cable', 'pipe', 'poleRoad'])"
      class="box-card"
      style="padding: 8px 8px 10px 15px; margin-top: 10px;margin-left: 15px"
    >
      <div>
        <el-tabs value="cable" type="card">
          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['cable'].key + '.r')"
            :label="$t('infoMap.opticalCable')"
            name="cable"
          >
            <cable-card></cable-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['pipe'].key + '.r')"
            :label="$t('infoMap.pipe')"
            name="pipe"
          >
            <pipe-card></pipe-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['poleRoad'].key + '.r')"
            :label="$t('infoMap.poleRoad')"
            name="poleRoad"
          >
            <pole-road-card></pole-road-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import poleRoadCard from '../components/poleRoad'
import pipeCard from '../components/pipe'
import cableCard from '../components/cable'

export default {
  name: 'lineCard',
  components: {
    poleRoadCard,
    pipeCard,
    cableCard
  },
  methods: {
    checkCardStatus (list) {
      return list.filter(item => this.$store.getters.getUserRole.includes(this.$userPermission[item].key + '.r'))
        .length
    }
  }
}
</script>
