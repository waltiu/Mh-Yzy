<template>
  <div>
    <dialog-page :info="tableData" :title="$t('BResources.assignWorkOrder')" @ok="submit">
      <div v-loading="loading">
        <edit-add-info :columns="columns" :tableData="fullData" @returnData="(a) => {fullData = a}"></edit-add-info>
      </div>
    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'editAndAdd',
  props: {
    type: String,
    tableData: Object,
    columns: Array
  },
  data () {
    return {
      loading: false,
      fullData: {}
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler: function (newVal) {
        if (newVal.add === undefined) {
          this.loading = true
          this.$getOrderFullInfo(this.type, newVal, (e) => {
            this.fullData = e.data
            this.loading = false
          })
        } else {
          this.loading = false
          this.fullData = {}
        }
      }
    }
  },
  methods: {
    submit () {
      let info = this.fullData
      if (this._.isObject(this.fullData) && this.fullData.departmentId) {
        info = { ...this.fullData, 'departmentId': this.fullData.departmentId.id }
      }
      this.$orderOperating({
        name: 'opticalSplitter',
        type: this.tableData.add === 0 ? 'create' : 'update',
        info: this.tableData.add === 0 ? { ...info, 'state': 'uncommitted' } : info
      }, e => {
        this.$checkStatus(e)
        this.$emit('reload')
      })
    }
  }
}
</script>

<style scoped>
</style>
