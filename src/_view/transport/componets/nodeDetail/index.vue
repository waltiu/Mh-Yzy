<template>
  <div>
    <odf-detail :columns="columns" :selectArrayShow="odfInfo" :type="type"></odf-detail>
    <wy-detail :columns="columns" :selectArrayShow="wyInfo" :type="type"></wy-detail>
    <gj-detail :columns="columns" :selectArrayShow="gjInfo" :type="type"></gj-detail>
  </div>
</template>

<script>
import odfDetail from '@/manage/odf/alertPage'
import wyDetail from '@/manage/device/alertPage'
import gjDetail from '@/manage/switchY/alertPage'
export default {
  name: 'nodeDetail',
  props: {
    detail: Object
  },
  data () {
    return {
      wyInfo: {},
      odfInfo: {},
      gjInfo: {},
      type: "",
      columns: []
    }
  },
  components: {
    odfDetail,
    wyDetail,
    gjDetail
  },
  watch: {
    detail: function (newVal) {
      if (newVal.type === "10") {
        this.wyInfo = newVal
        this.columns = this.$allConfig['device']
        this.type = "device"
      } else if (newVal.type === "8") {
        this.odfInfo = newVal
        this.columns = this.$allConfig['odf']
        this.type = "odf"
      } else if (newVal.type === "7") {
        this.gjInfo = newVal
        this.columns = this.$allConfig['switchY']
        this.type = "switchY"
      } else {
        this.odfInfo = newVal
        this.columns = this.$allConfig['odf']
        this.type = "odf"

      }
    }
  }

}
</script>

<style>
</style>