<template>
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t('vendorList.occ') + $t('OS.information')"
      :type="type"
      @close="$emit('close')"
      :editTf="editTf"
    >
      <div v-loading="loading">
        <!-- 基础信息 -->
        <show-table-info :table="columns" :info="fullData" :type="type"></show-table-info>

        <div class="leftBorder-font">
          <div class="leftBorder-custom"></div>
          <b>{{$t('opticalSplitter.portInformation')}}:</b>
        </div>
        <show-ports :fullData="fullData" :editStatus="false"></show-ports>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import showPorts from '../editAndAdd/ports'

export default {
  name: 'opticalSplitterAlertPage',
  props: {
    type: String,
    columns: Array, // 表格表头
    selectArrayShow: Object, // 要展示的数据
    editTf: {
      default: false,
      type: Boolean
    }
  },
  components: {
    showPorts
  },
  data () {
    return {
      loading: true,
      fullData: {}
    }
  },
  computed: {
    editMapInfo: function () {
      return this.$store.state.mapEditInfo
    }
  },
  watch: {
    selectArrayShow: {
      immediate: true,
      handler: function (newVal) {
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      }
    },
    editMapInfo: {
      handler: function (newVal) {
        console.log(newVal, 99999)
        if (newVal) {
          this.fullData = newVal
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
