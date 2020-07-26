<template>
  <div>
    <div>
      <el-button plain @click="changeShowTp" style="margin-left:20px">拓扑图</el-button>
      <el-button plain @click="changeShowTq">跳纤图</el-button>
      <el-button plain @click="changeShowLy">路由图</el-button>
    </div>
    <div>
      <to-po-flow
        :defaultData="data"
        v-show="show.tp"
        @getNodeDetail="getNodeDetail"
        @readLink="readLink"
      ></to-po-flow>

      <jumper-to-flow
        v-show="show.tq"
        :defaultData="fullData.jumpCoreInfo"
        @getNodeDetail="getNodeDetail"
      ></jumper-to-flow>
      <map-show-flow
        v-if="show.ly"
        :layerContor="layerContor"
        :fullData="fullData"
        :showInfo="showInfo"
        :addData="addData"
      ></map-show-flow>
    </div>
    <node-detail :detail="nodeDetail"></node-detail>
    <link-detail :type="type" :columns="config" :selectArrayShow="selectArrayForShow"></link-detail>
  </div>
</template>

<script>
import toPoFlow from '../../componets/topoflow'
import mapShowFlow from '../../componets/map/map'
import jumperToFlow from '../../componets/juperToflow'
import nodeDetail from '../../componets/nodeDetail'
import linkDetail from '@/manage/lightRoad/lightRoad/alertPage'
export default {
  name: 'readChart',
  components: {
    toPoFlow,
    jumperToFlow,
    mapShowFlow,
    nodeDetail,
    linkDetail
  },
  props: {
    fullData: Object,
    addData: Array
  },
  data () {
    return {
      data: {},
      show: {
        tp: true,
        tq: false,
        ly: false
      },
      layerContor: true,
      nodeDetail: {},
      showInfo: [],
      config: [],
      type: "",
      selectArrayForShow: {}
    }
  },
  methods: {
    changeShowTp () {
      this.show.tp = true
      this.show.tq = false
      this.show.ly = false
    },
    changeShowTq () {
      this.show.tq = true
      this.show.tp = false
      this.show.ly = false
    },
    changeShowLy () {
      this.show.ly = true
      this.show.tp = false
      this.show.tq = false
    },
    getNodeDetail (info) {
      this.nodeDetail = info
    },
    readLink (info) {
      this.selectArrayForShow = info
    }

  },
  watch: {
    fullData: function (newVal) {
      this.data = newVal.topologyInfo
      this.showInfo = newVal.ldsysOpticalCableWays
    }
  },
  mounted () {
    this.type = "lightRoad"
    this.config = this.$allConfig['lightRoad']
  }

}
</script>

<style>
</style>