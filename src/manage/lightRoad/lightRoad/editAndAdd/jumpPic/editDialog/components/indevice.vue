<template>
  <div>
    <div style="padding-bottom: 15px;display:flex">
      <div>
        <el-button
          size="mini"
          type="primary"
          round
          @click="() => {selectCable = {...editInfo}; tag = 'portA'}"
        >选择端口</el-button>
      </div>
      <div>
        <div v-if="fullData.coreNum === '单芯'" class="lightRoadDiff">
          <div>{{ (showMessage[0] ||info.portA|| $t('main.empty'))}}</div>
          <div>{{(showMessage[1] || info.portAJump||$t('main.empty'))}}</div>
        </div>
        <div v-if="fullData.coreNum === '双芯'" class="lightRoadDiff">
          <div>{{ (showMessage[0] ||info.portA|| $t('main.empty')) + ' : ' + (showMessage[1] || info.portB||$t('main.empty')) }}</div>
          <div>{{ (showMessage[2] || info.portAJump||$t('main.empty')) + ' : ' + (showMessage[3] ||info.portBJump|| $t('main.empty')) }}</div>
        </div>
      </div>
    </div>

    <!-- <el-button
        size="mini"
        type="primary"
        round
        @click="() => {selectCable = {...editInfo}; tag = 'portB'}"
      >{{$t('lightRoad.choosePortB')}}</el-button>
      <div
        class="lightRoadDiff"
      >{{ (info.portB || $t('main.empty')) + ' : ' + (info.portBJump || $t('main.empty')) }}</div>
      <el-button
        size="mini"
        type="primary"
        round
        style="margin-left: 10px;"
        @click="() => {selectCable = {...editInfo}; tag = 'portBJump'}"
      >{{$t('lightRoad.choosePortBFiberJumper')}}</el-button>
    </div>-->
    <select-port
      :chooseStaus="chooseStaus"
      :info="selectCable"
      @selectPort="select"
      :fullData="fullData"
      :type="info"
    ></select-port>
  </div>
</template>

<script>
import selectPort from './selectPort.vue'

export default {
  name: 'inDevice',
  props: {
    fullData: Object,
    info: Object,
    editInfo: Object,
    chooseStaus: Boolean

  },
  components: {
    selectPort
  },
  data () {
    return {
      tag: '',
      selectCable: {},
      showMessage: ''
    }
  },
  methods: {
    select: function (port) {
      for (const key in this.info) {
        if (this.info[key] === port) {
          this.$message.error(this.$i18n.t('lightRoad.port') + port + this.$i18n.t('lightRoad.useAnotherPort'))
          return
        }
      }
      this.computedPort(port)
      if (this.fullData.coreNum === '双芯') {
        this.$emit('returnData', { portA: port[0], portB: port[1], portAJump: port[2], portBJump: port[3] })
      } else {
        this.$emit('returnData', { portA: port[0], portAJump: port[1], portB: "" })

      }
    },
    computedPort: function (info) {
      this.showMessage = info
    }
  }
}
</script>

<style scoped>
.lightRoadDiff {
  font-size: 20px;
  margin-left: 10px;
}
</style>
