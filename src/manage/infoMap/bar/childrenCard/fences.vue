<template>
  <div>
    <el-card
      v-if="checkCardStatus(['geoFences'])"
      style="padding: 0px 8px 10px 0px; margin-top: 10px;margin-left: 15px;"
    >
      <el-tabs value="geoFences" type="card">
        <el-tab-pane
          v-if="$store.getters.getUserRole.includes(this.$userPermission['geoFences'].key + '.r')"
          :label="$t('infoMap.geoFences')"
          name="geoFences"
        >
          <geo-fences></geo-fences>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import geoFences from '../components/geoFences'

export default {
  name: 'fences',
  components: {
    geoFences
  },
  methods: {
    checkCardStatus (list) {
      return list.filter(item => this.$store.getters.getUserRole.includes(this.$userPermission[item].key + '.r'))
        .length
    }
  }
}
</script>
