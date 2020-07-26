<template>
  <div>
    <el-card
      v-if="checkCardStatus(['cable'])"
      class="box-card"
      style="padding: 0px 8px 10px 0px; margin-top: 10px;margin-left: 15px;"
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
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import cableCard from '../components/cable'

export default {
  name: 'linesCard',
  components: {
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
