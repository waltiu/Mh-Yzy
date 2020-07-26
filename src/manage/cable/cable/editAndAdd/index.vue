<template>
  <div>
    <dialog-page
      @ok="submit"
      :title="$t(titleType) + (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))"
      :info="tableData"
      :width="info === '光缆敷设' ? '95%' : '' "
      @close="$emit('close')"
    >
      <div v-loading="loading">
        <el-tabs v-model="info">
          <el-tab-pane :label="$t('main.basicInformation')" name="info">
            <edit-add-info
              :disableArray="disableArray"
              @returnData="(e) => {fullData = e}"
              :columns="columns"
              :tableData="fullData"
            ></edit-add-info>
          </el-tab-pane>

          <el-tab-pane :label="$t('cable.cableLaying')" name="光缆敷设">
            <info-map-show
              mapType="CableLaying"
              :propStyle="{width: '100%', height: '70vh'}"
              @mapReady="mapReady"
            >
              <!-- bar -->
              <div slot="bar">
                <cable-card :info="fullData" @returnData="bindData"></cable-card>
              </div>
            </info-map-show>
            <!-- <Alert type="error" show-icon v-show="!editStatus">
              {{$t('cable.wrong')}}
              <span slot="desc">{{$t('cable.synchronize')}}</span>
            </Alert>-->
          </el-tab-pane>

          <el-tab-pane :label="$t('cable.cableAutomaticLaying')" name="光缆自动敷设">
            <auto-laying></auto-laying>
          </el-tab-pane>

          <el-tab-pane :label="$t('cable.coreInformation')" name="纤芯信息">
            <oc-infos :fullData="fullData" @returnData="(data) => {fullData = data}"></oc-infos>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import autoLaying from './autoLaying'
import cableCard from './addCard'
import ocInfos from './ocInfos'
import { CableLaying } from '@/_public/map/class/CableLaying'

export default {
  name: 'LightRoadEditAndAdd',
  components: {
    cableCard,
    ocInfos,
    autoLaying
  },
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number],
    editTf: Boolean

  },
  data () {
    return {
      selected: '',
      info: 'info',
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
  beforeDestroy () {
    // 销毁 Watch
    // this.mapDom.destroyedWatch()
  },
  methods: {
    mapReady (map) {
      this.mapDom = new CableLaying(map, this, (item, type) => {
        this.$store.commit('setLaying', {
          ...item, maptalksProps: type
        })
      })
    },
    bindData (info) {
      this.fullData = { ...this.fullData, ...info }
    },
    submit () {
      let linesInfo = this._.cloneDeep(this.fullData)
      if (linesInfo && linesInfo.lines && linesInfo.lines.lines) {
        linesInfo.lines.lines
          .unshift(
            this.fullData.autoModelingList.layingStart
          )
        linesInfo.lines.lines
          .unshift(
            this.fullData.autoModelingList.deviceStart
          )
        linesInfo.lines.lines
          .push(
            this.fullData.autoModelingList.layingEnd
          )
        linesInfo.lines.lines
          .push(
            this.fullData.autoModelingList.deviceEnd
          )
      }
      this.$resourceOperating({
        name: this.type,
        type: this.tableData.add === 0 ? 'create' : 'update',
        info: linesInfo
      }, e => {
        this.$checkStatus(e)
        // 重载表格
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
        if (newVal.add === undefined) {
          this.loading = true
          this.$store.commit('setSecondaryObject', { key: 'bar', secKey: 'status', status: true })
          this.$getTableFullInfo(this.type, newVal, (e) => {
            this.fullData = e.data

            // 设置中心
            this.$setMapCenter(this.fullData)
            this.loading = false
          })
        } else {
          this.fullData = { ocUseInfo: {}, ocCoreInfo: {} }
          this.loading = false

        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
