<template>
  <div>
    <dialog-page
      @ok="submit"
      :title="$t(titleType) + (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))"
      :info="tableData"
      @close="$emit('close')"
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

            <middle-related-point-edit
              @returnData="bindData"
              :fullData="fullData"
              :allowTypes="['support', 'pole', 'well', 'cited']"
            ></middle-related-point-edit>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>

export default {
  name: 'pipeSectionEditAndAdd',
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number],
    editTf: Boolean

  },
  data () {
    return {
      editStatus: false,
      disableArray: [],
      fullData: {},
      loading: false,
      newTableData: null

    }
  },
  mounted () {
    console.log(this.tableData)
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
      let table = this.tableData
      this.fullData.code = this.fullData.name
      // console.log(this.fullData)

      this.$resourceOperating({
        name: this.type,
        type: this.tableData.add === 0 ? 'create' : 'update',
        info: this.fullData
      }, e => {
        if (this.editTf) {
          this.$store.commit('mapEditInfoUpdate', { ...table, ...this.fullData })
        }
        this.$checkStatus(e)
        // 重载表格

        this.$emit('reload')
      })
    }
  },
  watch: {
    tableData: {
      handler: function (newVal) {
        if (newVal.add === undefined) {
          this.loading = true
          this.$getTableFullInfo(this.type, newVal, (e) => {
            this.fullData = e.data
            this.loading = false
          })
        } else {
          this.fullData = {}
          this.loading = false

        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
