<template>
  <div>
    <dialog-page
      @ok="submit"
      :title="$t(titleType) + (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))"
      :info="tableData"
    >
      <div v-loading="loading">
        <div style="display: flex;">
          <div style="width: 35%">
            <!-- 编辑信息 -->
            <edit-add-info
              @returnData="(a) => {fullData = a}"
              :columns="columns"
              :tableData="fullData"
            ></edit-add-info>
          </div>
          <div style="padding-left: 20px;padding-right: 20px;">
            <div style="width: 2px; border: 1px solid gray; height: 100%;"></div>
          </div>
          <div style="width: 65%; height: 70vh; overflow-y: auto">
            <!-- 光路图 -->
            <jump-pic :info="fullData" @returnData="bindData" :createGl="createGl"></jump-pic>
          </div>
        </div>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import jumpPic from './jumpPic'
import addTemplate from './jumpPic/jumperInfoType.js'

export default {
  name: 'LightRoadEditAndAdd',
  components: {
    jumpPic
  },
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number],
    createGl: Object,
    optionName: String
  },
  data () {
    return {
      name: '',
      fullData: {},
      loading: false
    }
  },

  methods: {
    bindData (data) {
      Object.entries(data).forEach(([key, val]) => {
        this.fullData[key] = val
      })
      if (!this.fullData.jumperInfo.end.id && this.createGl.start.id !== 'No1') {
        this.fullData.jumperInfo.start.omSN = this.createGl.start.omSN
        this.fullData.jumperInfo.end.omSN = this.createGl.end.omSN
        this.fullData.jumperInfo.start.id = this.createGl.start.id
        this.fullData.jumperInfo.start.name = this.createGl.start.name
        this.fullData.jumperInfo.end.id = this.createGl.end.id
        this.fullData.jumperInfo.end.name = this.createGl.end.name
      }
    },
    submit () {
      this.$store.commit('changeDrawArray', "");

      this.$resourceOperating({
        name: this.type,
        type: this.tableData.add === 0 ? 'create' : 'update',
        info: this.fullData
      }, e => {
        this.$checkStatus(e)
        this.$emit("returnLineData", e)
        if (!this.createGl.start.name) {
          this.$emit("returnLinkAndNodes", e)
        }
        // 重载表格
        this.$emit('reload')
      })
    }
  },
  computed: {
    titleType: function () {
      return this.$pageUrl[this.type].name
    },
    columns: function () {
      return this.$allConfig[this.type]
    },
    computedData: function () {
      if (!this.fullData.type) {
        return {}
      }
      return this.fullData
    }
  },
  watch: {
    createGl: function (newVal) {
      return newVal
    },
    tableData: function (newVal) {
      this.$store.commit('changeDrawArray', "");
      this.fullData = newVal
      if (!newVal.id) {
        this.$nextTick(() => {
          this.fullData = this._.cloneDeep(addTemplate.editAndAdd)
          // this.name = ''
        })
      }
    }
  }
}
</script>
