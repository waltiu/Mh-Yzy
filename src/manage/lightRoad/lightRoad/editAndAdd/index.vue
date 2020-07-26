<template>
  <div>
    <dialog-page
      @ok="submit"
      :title="$t(titleType) + (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))"
      :info="tableData"
    >
      <div v-loading="loading">
        <!-- <el-form :label-width="80">
          <el-form-item label="名称">
            <el-input v-model="name" placeholder="名称"></el-input>
          </el-form-item>
        </el-form>-->
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
            <jump-pic :info="computedData" @returnData="bindData"></jump-pic>
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
    tableData: [Object, Number]
  },
  data () {
    return {
      name: '',
      fullData: {},
      loading: false
    }
  },
  provide () {
    return {
      tableData: this
    }
  },
  methods: {
    bindData (data) {
      Object.entries(data).forEach(([key, val]) => {
        this.fullData[key] = val
      })
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
    tableData: function (newVal) {
      this.ocwId = newVal.id
      if (newVal.add === undefined) {
        this.loading = true
        this.$getTableFullInfo('lightRoad', newVal, (e) => {
          this.fullData = e.data
          // 在增加模式需要注入数据
          // CLI3 迁移
          if (this.tableData.add === 0) {
            if (this.fullData.type === 'OLP') {
              this.fullData.jumperInfo = { ...this.fullData.jumperInfo, ...addTemplate.olp }
            } else {
              this.fullData.jumperInfo = { ...this.fullData.jumperInfo, ...addTemplate.ptn }
            }
          }
          // 针对name的hook
          // this.name = e.data.name
          this.loading = false
        })
      }
      // 增加模式注入数据
      if (newVal.add === 0) {
        this.$nextTick(() => {
          this.fullData = this._.cloneDeep(addTemplate.editAndAdd)
          // this.name = ''
        })
      }
    }
  }
}
</script>
