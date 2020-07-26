<template>
  <div>
    <dialog-page
      @ok="submit"
      :title="$t(titleType) + (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))"
      :info="tableData"
    >
      <div v-loading="loading">
        <el-tabs value="info">
          <el-tab-pane :label="$t('main.basicInformation')" name="info">
            <edit-add-info
              :disableArray="disableArray"
              @returnData="(e) => {fullData = e}"
              :columns="columns"
              :tableData="fullData"
            ></edit-add-info>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>

export default {
  name: 'deviceEditAndAdd',
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number],
    optionName: String

  },
  data () {
    return {
      disableArray: [],
      fullData: {},
      loading: false
    }
  },
  mounted () {
    // console.log('1', this.tableData)
  },
  computed: {
    titleType: function () {
      return this.$pageUrl[this.type].name
    },
    columns: function () {
      return this.$allConfig[this.type]
    }
  },
  methods: {
    bindData (info) {
      this.fullData = { ...this.fullData, ...info }
    },
    submit () {
      this.$resourceOperating({
        name: this.type,
        type: this.tableData.add === 0 ? 'create' : 'update',
        info: this.fullData
      }, e => {
        this.$checkStatus(e)
        this.$emit('returnLineData', e.data)
        // 重载表格
        this.$emit('reload')
      })
    }
  },
  watch: {
    tableData: function (newVal) {
      if (newVal.add === undefined) {
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      } else {
        this.fullData = {}
      }
    }
  }
}
</script>
