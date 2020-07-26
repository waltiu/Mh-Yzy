<template>
  <div style="display: flex;">
    <light-road style="width: 40vw;">
      <template v-slot:table="{tableData: tableData}">
        <el-card>
          <div v-for="(item, index) in tableData" :key="index">
            <div style="height: 80px">
              {{ item.name }}
              <div style="display: flex; justify-content: flex-end;padding: 10px">
                <el-button size="mini" type="primary" @click="$alertInfo(item, 'lightRoad')">{{$t('alert.viewInfo')}}</el-button>
                <el-button size="mini" type="primary" @click="addToPreview(item)">{{$t('lightRoad.addContrast')}}</el-button>
              </div>
              <hr />
            </div>
          </div>
        </el-card>
      </template>
    </light-road>

    <div style="padding-left: 10px;">
      <el-button :loading="loadStatus" type="primary" @click="diff">{{$t('lightRoad.startComparison')}}</el-button>

      <div v-for="(group, index) in pushArray" :key="index" style="padding: 5px;">
        <el-card>
          <div style="height: 100px;">
            <i
              class="el-icon-circle-close"
              style="display: flex; justify-content: flex-end; margin: 10px; font-size: 18px;"
              @click="() => { $delete(pushArray, index) }"
            ></i>
            <div v-for="(item, itemkey) in group" :key="itemkey">{{ item.name }}</div>
          </div>
        </el-card>
      </div>
      <diff-path :diffInfo="diffInfo"></diff-path>
    </div>
  </div>
</template>

<script>
import LightRoad from '../lightRoad'
import { http } from '@/_command/http'
import diffPath from './diffPath'

export default {
  name: 'diffLightRoad',
  components: {
    LightRoad, diffPath
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
      let length = this.pushArray.length
      if (this.pushArray[length - 1] && this.pushArray[length - 1].length === 1) {
        this.pushArray[length - 1].push(item)
      } else {
        this.pushArray.push([item])
      }
    },
    diff () {
      this.loadStatus = true
      http.post('/api/ldsysOpticalCableWays/compareOcWays',
        this.pushArray.map(item => {
          return {
            ocAId: item[0].id,
            ocBId: item[1].id
          }
        }))
        .then(res => { this.diffInfo = res.data })
        .finally(() => { this.loadStatus = false })
    }
  }
}
</script>
