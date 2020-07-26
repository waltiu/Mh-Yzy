<template>
  <div>
    <div class="buttonList">
      <el-button plain @click="changeShowTp" style="margin-left:20px">拓扑图</el-button>
      <el-button plain @click="changeShowTq">跳纤图</el-button>
      <el-button plain @click="changeShowLy">路由图</el-button>
      <!-- <el-button plain @click="changeShowEq">路由图</el-button> -->
    </div>
    <div>
      <to-po-flow v-show="show.tp" :defaultData="fullData"></to-po-flow>

      <jumper-to-flow v-show="show.tq" :defaultData="fullData"></jumper-to-flow>
      <map-show-flow v-if="show.ly" :defaulData="fullData"></map-show-flow>
      <equipement-flow v-if="show.eq" :defaulData="fullData"></equipement-flow>
    </div>
  </div>
</template>

<script>
import toPoFlow from '../card/toPoFlow'
import mapShowFlow from '../card/mapShowFlow'
import jumperToFlow from '../card/jumperToFlow'
import equipementFlow from '../card/equipementFlow'

export default {
  name: 'readChart',
  components: {
    toPoFlow,
    jumperToFlow,
    mapShowFlow,
    equipementFlow

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
        ly: false,
        eq: false
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
      this.show.eq = false
    },
    changeShowTq () {
      this.show.tq = true
      this.show.tp = false
      this.show.ly = false
      this.show.eq = false

    },
    changeShowLy () {
      this.show.ly = true
      this.show.tp = false
      this.show.tq = false
      this.show.eq = false

    },
    changeShowEq () {
      this.show.eq = true
      this.show.tq = false
      this.show.tp = false
      this.show.ly = false
    },
    getNodeDetail (info) {
      this.nodeDetail = info
    },
    readLink (info) {
      this.selectArrayForShow = info
    }

  },

  mounted () {
    this.type = "lightRoad"
    this.config = this.$allConfig['lightRoad']
  }

}
</script>

<style>
.buttonList {
  position: relative;
}
</style>