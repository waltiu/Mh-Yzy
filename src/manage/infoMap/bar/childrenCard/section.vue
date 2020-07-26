<template>
  <div>
    <el-card
      v-if="checkCardStatus(['pipeSection', 'poleSection', 'citedSection', 'supportSection'])"
      class="box-card"
      style="padding: 0px 8px 10px 0px;margin-top: 10px;margin-left: 15px;"
    >
      <div>
        <el-tabs value="pipeSection" type="card">
          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['pipeSection'].key + '.r')"
            :label="$t('infoMap.pipeSection')"
            name="pipeSection"
          >
            <pipe-section-card></pipe-section-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['poleSection'].key + '.r')"
            :label="$t('infoMap.poleSection')"
            name="poleSection"
          >
            <pole-road-section-card></pole-road-section-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['citedSection'].key + '.r')"
            :label="$t('infoMap.citedSection')"
            name="citedSection"
          >
            <cited-section-card></cited-section-card>
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.getters.getUserRole.includes(this.$userPermission['supportSection'].key + '.r')"
            :label="$t('infoMap.supportSection')"
            name="supportSection"
          >
            <support-section-card></support-section-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import citedSectionCard from '../components/citedSection'
import poleRoadSectionCard from '../components/poleRoadSection'
import supportSectionCard from '../components/supportSection'
import pipeSectionCard from '../components/pipeSection'

export default {
  name: 'pointCard',
  components: {
    citedSectionCard,
    poleRoadSectionCard,
    supportSectionCard,
    pipeSectionCard
  },
  methods: {
    checkCardStatus (list) {
      return list.filter(item => this.$store.getters.getUserRole.includes(this.$userPermission[item].key + '.r'))
        .length
    }
  }
}
</script>
