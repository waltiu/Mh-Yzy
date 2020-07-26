<template>
  <div>
    <dialog-page
      @ok="submit"
      :title="$t(titleType) + (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))"
      :info="tableData"
      width="50%"
      top="15vh"
    >

      <div v-loading="loading">
        <el-tabs value="info">

          <el-tab-pane
            :label="$t('main.basicInformation')"
            name="info"
          >
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
  name: 'departmentsEditAndAdd',
  props: {
    type: String,
    // 表格数据
    tableData: Object
  },
  data () {
    return {
      editStatus: false,
      disableArray: [],
      fullData: {},
      loading: false
    }
  },
  computed: {
    titleType: function () {
      return this.$pageUrl[this.type].name
    },
    columns: function () {
      if (this.tableData.add === undefined) {
        return this.$allConfig[this.type].filter(item => {
          if (['userName', 'userLoginName', 'userPassword'].includes(item.key)) {
            return false
          }
          return true
        })
      } else {
        return this.$allConfig[this.type]
      }
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
      if (newVal.add === undefined) {
        this.$nextTick(() => {
          this.fullData = { ...newVal }
        })
      } else {
        this.fullData = {}
      }
    }
  }
}
</script>
