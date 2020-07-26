<template>
  <div style="display: flex;">
    <transport style="width: 40vw;" @addToPreview="addToPreview"></transport>

    <div style="padding-left: 10px;">
      <el-button
        :loading="loadStatus"
        type="primary"
        @click="diff"
      >{{$t('lightRoad.startComparison')}}</el-button>

      <el-card class="card" v-if="pushArray.length">
        <div style="height: 100px;">
          <i
            class="el-icon-circle-close"
            style="display: flex; justify-content: flex-end; margin: 10px; font-size: 18px;"
            @click="() => { this.pushArray=[] }"
          ></i>
          {{pushArray[0].name
          }}
        </div>
      </el-card>
      <diff-path :diffInfo="diffInfo"></diff-path>
    </div>
  </div>
</template>

<script>
import transport from './table'
import { http } from '@/_command/http'
import diffPath from './diffPath'

export default {
  name: 'diffLightRoad',
  components: {
    transport,
    diffPath
  },
  data () {
    return {
      loadStatus: false,
      pushArray: [],
      diffInfo: [],

    }
  },
  methods: {
    addToPreview (item) {
      if (this.pushArray < 2) {
        this.pushArray.push(item)
      }
    },
    diff () {
      this.loadStatus = true
      this.pushArray.map(item => {
        http.get(`/api/ldsysTransferSystems/compare/${item.id}`)
          .then(res => { this.diffInfo = res.data })
          .finally(() => { this.loadStatus = false })
      })

    }
  }
}
</script>
<style scoped>
.card {
  position: relative;
  width: 600px;
  height: 100px;
  text-align: center;
  top: 100px;
  left: 110px;
}
</style>
