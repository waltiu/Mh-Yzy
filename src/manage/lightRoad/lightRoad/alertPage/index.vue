<template>
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t('router.CN_OPR') + $t('OS.information')"
      @close="$emit('close')"
    >
      <div v-loading="loading">
        <!-- 基础信息 -->
        <div>
          <div>
            <show-table-info :type="type" :table="columns" :info="fullData">
              <div slot="view-photo"></div>
            </show-table-info>
          </div>

          <jump-pic :info="fullData" :edit="false"></jump-pic>
        </div>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import jumpPic from '../editAndAdd/jumpPic'

export default {
  name: 'lightRoadAlertPage',
  props: {
    type: String,
    selectArrayShow: Object,
    columns: Array
  },
  components: {
    jumpPic
  },
  data () {
    return {
      loading: true,
      fullData: {}
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
    }
  }
}
</script>
