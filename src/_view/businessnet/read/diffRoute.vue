<template>
  <div>
    <el-button :loading="loading" type="primary" size="mini" @click="startDiff">{{$t('subdistricts.Comparison_with_route')}}</el-button>

    <div>
      <diff-route :diffInfo="diffInfo"></diff-route>
    </div>
  </div>
</template>


<script>
import diffRoute from '@/manage/diffRoute/diffRoute/diffPath/index.vue'
import { http } from '@/_command/http'

export default {
  name: 'diffRouteMiddle',
  props: {
    fullData: Object
  },
  data () {
    return {
      loading: false,
      diffInfo: [],
    }
  },
  components: {
    diffRoute
  },
  methods: {
    startDiff () {
      this.loading = true
      http.get(`/api/ldsysOpticaleCableWorkNets/compare/${this.fullData.id}`)
        .then(res => { this.diffInfo = res.data })
        .finally(() => { this.loading = false })
    },
  },
}
</script>
