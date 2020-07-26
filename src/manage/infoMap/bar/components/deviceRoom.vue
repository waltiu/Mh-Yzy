<template>
  <div>
    <public-content :name="$options.name" @status-change="change">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <img src="/icons/filtrate.png" width="20px" height="20px" />
            {{$t('infoMap.high-levelScreening')}}
          </template>
          <enum-type :name="$options.name" :enumerateArray="$allConfig[$options.name]"></enum-type>
        </el-collapse-item>
      </el-collapse>
    </public-content>
    <el-switch
      :disabled="!showStatus"
      v-model="switchStatus"
      @change="(status) => {$emit('status-change', status)}"
    ></el-switch>显示机房名称
  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'
import { RenderTipsLayer } from '@/_public/map/class/RenderTipsLayer'

export default {
  name: 'deviceRoom',
  components: {
    publicContent,
    enumType
  },
  props: {
    mapDom: Object,
  },
  data () {
    return {
      showStatus: false,
      switchStatus: false,
      layer: null
    }
  },
  watch: {
    '$store.state.infoMapShow.showInMap.deviceRoom': function (newVal) {
      this.layer = this.layer || new RenderTipsLayer(this.mapDom, 'deviceRoomLayer')
      if (this.switchStatus) {
        this.layer.show(newVal)
      } else {
        this.layer.clear()
      }
    },
    switchStatus: function (newVal) {
      this.layer = this.layer || new RenderTipsLayer(this.mapDom, 'deviceRoomLayer')
      if (newVal) {
        this.layer.show(this.$store.state.infoMapShow.showInMap.deviceRoom || [])
      } else {
        this.layer.clear()
      }
    }
  },
  methods: {
    change (status) {
      this.showStatus = status
      if (!status) {
        this.switchStatus = status
      }
    }
  },
}
</script>
