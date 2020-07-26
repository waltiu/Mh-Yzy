<template>
  <div style="display: flex;">
    <el-select
      size="small"
      v-model="chooseInfo"
      :placeholder="$t('infoMap.choice')"
      style="width: 200px;"
    >
      <el-option :label="$t('vendorList.odf')" value="ODF"></el-option>
      <el-option :label="$t('infoMap.cableBox')" value="光交"></el-option>
      <el-option :label="$t('vendorList.pole')" value="电杆"></el-option>
      <el-option :label="$t('vendorList.outside')" value="outdoor"></el-option>
      <el-option :label="$t('vendorList.other')" value="other"></el-option>
    </el-select>

    <div
      v-if="!['other','outdoor'].includes(chooseInfo) && urls[chooseInfo].url"
      style="width: 100%"
    >
      <auto-complete-info
        :values="fullData.ldsysOpticalCrossConnect"
        @returnData="(e) => {$emit('returnData', {'ldsysOpticalCrossConnect': e})} "
        :url="urls[chooseInfo].url"
      ></auto-complete-info>
    </div>
  </div>
</template>

<script>
// 放置位置
export default {
  name: 'odfAutoCompent',
  props: {
    fullData: Object
  },
  data () {
    return {
      chooseInfoBase: '',
      info: {}
    }
  },
  computed: {
    chooseInfo: {
      set: function (newVal) {
        this.chooseInfoBase = newVal
        this.$emit('returnData', { place: newVal, ldsysOpticalCrossConnect: {} })
      },
      get: function () {
        if (this.chooseInfoBase) {
          return this.chooseInfoBase
        }
        if (this.fullData.place) {
          return this.fullData.place
        }
        return 'other'
      }
    },
    urls: function () {
      return {
        ODF: this.$autoCompentedUrl['odf'],
        光交: this.$autoCompentedUrl['switchY'],
        电杆: this.$autoCompentedUrl['pole'],
        outdoor: {},
        other: {}
      }
    },
  }
}
</script>
