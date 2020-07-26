<template>
  <div>
    <public-content :name="$options.name">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <img src="/icons/filtrate.png" width="20px" height="20px" />
            {{$t('infoMap.high-levelScreening')}}
          </template>
          <div>
            <enum-type :name="$options.name" :enumerateArray="$allConfig[$options.name]"></enum-type>

            <el-form label-width="90px">
              <el-form-item :label="$t('infoMap.upperMotorRoom')">
                <el-switch
                  v-model="showMachineRooms"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </public-content>
  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'

export default {
  name: 'opticalSplitter',
  components: {
    publicContent,
    enumType
  },
  data () {
    return {
      showMachineRooms: false
    }
  },
  watch: {
    showLines: function (newVal) {
      this.$store.commit('setMapStatus', {
        key: 'showLine',
        status: newVal
      })
    }
  },
  computed: {
    showLines: function () {
      let tmp = []
      let machineRooms = []
      let list = this.$store.state.infoMapShow.showInMap.opticalSplitter
      if (list && !this._.isEmpty(list)) {
        for (const iterator of this.$store.state.infoMapShow.showInMap.opticalSplitter) {
          if (!this._.isEmpty(iterator.machineRooms)) {
            // 计算机房
            machineRooms.push(...iterator.machineRooms)
            if (iterator.machineRooms[1]) {
              tmp = [
                { lng: iterator.machineRooms[0].lng, lat: iterator.machineRooms[0].lat },
                { lng: iterator.lng, lat: iterator.lat },
                { lng: iterator.machineRooms[1].lng, lat: iterator.machineRooms[1].lat }
              ]
            } else {
              tmp = [
                { lng: iterator.machineRooms[0].lng, lat: iterator.machineRooms[0].lat },
                { lng: iterator.lng, lat: iterator.lat }
              ]
            }
          }
        }
      } else {
        return []
      }
      if (this.showMachineRooms) {
        // 提交渲染机房
        this.$store.commit('setDefaultShow', {
          name: 'deviceRoom',
          lines: machineRooms
        })
        return tmp
      } else {
        // 提交渲染机房
        this.$store.commit('setDefaultShow', {
          name: 'deviceRoom',
          lines: []
        })
        return []
      }
    }
  }
}
</script>
