<template>
  <div>
    <dialog-page
      @ok="submit"
      :width="tab === '光缆敷设' ? '95%' : '70%'"
      :title="$t(titleType) + (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))"
      :info="tableData"
      @close="$emit('close')"
    >
      <div v-loading="loading">
        <el-tabs v-model="tab">
          <el-tab-pane :label="$t('main.basicInformation')" name="info">
            <edit-add-info
              :disableArray="disableArray"
              @returnData="(e) => {fullData = e}"
              :columns="columns"
              :tableData="fullData"
            ></edit-add-info>
          </el-tab-pane>

          <el-tab-pane :label="$t('tableSearch.rodRoadEdit')" name="光缆敷设">
            <info-map-show :propStyle="{width: '100%', height: '70vh'}" @mapReady="mapReady">
              <!-- bar -->
              <div slot="bar">
                <cable-card :info="fullData" @returnData="bindData"></cable-card>
              </div>

              <!-- 绘制 -->
              <!-- <draw-pipe-section :info="fullData"></draw-pipe-section> -->
            </info-map-show>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import cableCard from './addCard'
// import drawPipeSection from './drawPipeSection'
import { PipePoleRoad } from '@/_public/map/class/PipePoleRoad'

export default {
  name: 'pipeEditAndAdd',
  components: {
    cableCard
  },
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number],
    editTf: Boolean

  },
  data () {
    return {
      mapDom: {},
      tab: 'info',
      editStatus: false,
      disableArray: [],
      fullData: {},
      loading: false,
      newTableData: null

    }
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
    mapReady (map) {
      this.mapDom = new PipePoleRoad(map, this, (item, type) => {
        this.$store.commit('setLaying', {
          ...item, maptalksProps: type
        })
      })
    },
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
        console.log(e)
        if (this.editTf) {
          this.$store.commit('mapEditInfoUpdate', { ...this.tableData, ...this.fullData })
        }

        this.$emit('reload')
      })
    }
  },
  watch: {
    fullData: {
      handler: function (newVal) {
        // 执行渲染
        if (!this._.isEmpty(this.mapDom)) {
          this.mapDom.render(newVal)
        }
      },
      deep: true
    },
    tableData: {
      handler: function (newVal) {
        this.$store.commit('setSecondaryObject', { key: 'bar', secKey: 'status', status: true })
        if (newVal.add === undefined) {
          this.loading = true
          this.$getTableFullInfo(this.type, newVal, (e) => {
            this.fullData = e.data
            // 设置中心
            this.$setMapCenter(this.fullData)
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
