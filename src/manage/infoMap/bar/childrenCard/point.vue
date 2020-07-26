<template>
  <div>
    <el-card
      v-if="checkCardStatus(['well', 'pole', 'cited', 'support', 'station'])"
      class="box-card"
      style="padding: 0px; margin-top: 10px;margin-left: 15px;"
    >
      <div>
        <el-tabs value="pipe" type="card">
          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['well'].key + '.r')"
            :label="$t('infoMap.well')"
            name="pipe"
          >
            <well-card></well-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['pole'].key + '.r')"
            :label="$t('infoMap.pole')"
            name="pole"
          >
            <pole-card></pole-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['cited'].key + '.r')"
            :label="$t('infoMap.cited')"
            name="cited"
          >
            <cited-card></cited-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['support'].key + '.r')"
            :label="$t('infoMap.support')"
            name="support"
          >
            <support-card></support-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['station'].key + '.r')"
            :label="$t('infoMap.station')"
            name="station"
          >
            <station-card></station-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>

import wellCard from '../components/well'
import supportCard from '../components/support'
import stationCard from '../components/station'
import citedCard from '../components/cited'
import poleCard from '../components/pole'

export default {
  name: 'pointCard',
  components: {
    citedCard,
    poleCard,
    stationCard,
    supportCard,
    wellCard
  },
  methods: {
    checkCardStatus (list) {
      return list.filter(item => this.$store.getters.getUserRole.includes(this.$userPermission[item].key + '.r'))
        .length
    }
  }
}
</script>
