<template>
  <!-- 自动敷设控件, 当存在两个时候 -->
  <div>
    <dialog-page
      :info="selectInfo"
      width="50vw"
      :top="'30vh'"
      :title="computedTitle.msg"
      @ok="select"
    >
      <p>{{$t('tableSearch.name')}}: {{ selectInfo.name }}</p>
      <p>{{$t('cable.latitudeAndLongitude')}}: {{ selectInfo.lng + ' , ' + selectInfo.lat }}</p>
    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'autoModeling',
  props: {
    lines: Array,
    info: Object,
    autoModelingList: Object
  },
  watch: {
    info: function (newVal) {
      if (newVal && !this._.isEmpty(newVal) && newVal.type === 'autoModeling') {
        // 当为select模式时, 需要包含在目标里
        if (this.computedTitle.type === 'select') {
          if (this.lines) {
            let tmp = {}
            for (const [index, iterator] of this.lines.entries()) {
              if (Array.isArray(iterator)) {
                for (let a = 0; a < iterator.length; a++) {
                  tmp[index] = tmp[index] || []
                  tmp[index] = [...tmp[index], iterator[a].id]
                }
              }
            }
            // tmp is Object
            for (const key in tmp) {
              if (tmp[key].includes(newVal.info.id)) {
                this.index = key
                this.selectInfo = { ...newVal.info }
                break
              }
            }
          }
        }
        // 选择起始终止
        if (this.computedTitle.type.includes('End') || this.computedTitle.type.includes('Start')) {
          this.selectInfo = { ...newVal.info }
        }
      }
    }
  },
  data () {
    return {
      infoType: ['switchY', 'device', 'deviceRoom', 'odf', 'opticalSplitter', 'station'], // 其他为承载物
      selectInfo: {},
      index: ''
    }
  },
  computed: {
    computedTitle: function () {
      if (!this._.isEmpty(this.autoModelingList.deviceStart) && !this._.isEmpty(this.autoModelingList.deviceEnd) && !this._.isEmpty(this.autoModelingList.layingStart) && !this._.isEmpty(this.autoModelingList.layingEnd)) {
        return { msg: this.$i18n.t('cable.choosePoint'), type: 'select' }
      }

      if (this._.isEmpty(this.autoModelingList.deviceStart)) {
        return { msg: this.$i18n.t('cable.choosePointAsStartingDevice'), type: 'deviceStart' }
      }
      if (this._.isEmpty(this.autoModelingList.deviceEnd)) {
        return { msg: this.$i18n.t('cable.choosePointAsEndDevice'), type: 'deviceEnd' }
      }

      if (this._.isEmpty(this.autoModelingList.layingStart)) {
        return { msg: this.$i18n.t('cable.choosePointAsStartingCarrier'), type: 'layingStart' }
      }
      if (this._.isEmpty(this.autoModelingList.layingEnd)) {
        return { msg: this.$i18n.t('cable.choosePointAsEndCarrier'), type: 'layingEnd' }
      }
      return {}
    }
  },
  methods: {
    select () {
      if (this.computedTitle.type.includes('nd') || this.computedTitle.type.includes('tart')) {
        this.$emit('selectStartEndPoint',
          {
            ...this.autoModelingList,
            [this.computedTitle.type]: this.selectInfo
          }
        )
      } else {
        // 这里是计算
        this.$emit('returnData', { index: this.index, info: this.selectInfo })
      }
    }
  }
}
</script>
