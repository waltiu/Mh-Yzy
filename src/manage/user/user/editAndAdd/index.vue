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
              :columns="$allConfig[type]"
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
  name: 'userEditAndAdd',
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number]
  },
  data () {
    return {
      disableArray: [],
      fullData: {},
      loading: false,
      columns: []
    }
  },
  computed: {
    titleType: function () {
      return this.$pageUrl[this.type].name
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
        // 重载表格
        this.$emit('reload')
      })
    }
  },
  watch: {
    tableData: function (newVal) {
      this.$getDepartmentsList('user', { baseConfig: this.$allConfig, key: 'sysDepartments' })
      if (newVal.add === undefined) {
        this.loading = true
        this.$api.get({
          url: '/api/sysUsers/search/findOneUserById',
          args: {
            id: newVal.id
          }
        }, e => {
          this.fullData = e.data
          this.loading = false
        })
      } else {
        this.fullData = {}
      }
      console.log(this.fullData, this.$allConfig[this.type])

    }
  }
}
</script>
