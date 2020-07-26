<template>
  <div>
    <div style="padding-bottom: 15px;display: flex;">
      <div>
        <el-button
          size="mini"
          type="primary"
          round
          @click="() => {selectCable = {...editInfo}; tag = 'portA'}"
        >选择端口</el-button>
      </div>

      <div>
        <div
          v-if="fullData.coreNum === '单芯'"
          class="lightRoadDiff"
        >{{ (showMessage[0] ||info.portA|| $t('main.empty')) }}</div>
        <div
          v-if="fullData.coreNum === '双芯'"
          class="lightRoadDiff"
        >{{ (showMessage[0] || info.portA||$t('main.empty'))}}:{{(showMessage[1] ||info.portB|| $t('main.empty'))}}</div>
      </div>
    </div>

    <!-- 是否为双纤 -->
    <!-- <div v-if="fullData.coreNum === '双芯'" style="display: flex;">
      <el-button
        size="mini"
        type="primary"
        round
        @click="() => {selectCable = {...editInfo}; tag = 'portB'}"
      >{{$t('lightRoad.choosePortB')}}</el-button>
      <div class="lightRoadDiff">{{ (info.portB || $t('main.empty')) }}</div>
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
      showMessage: []
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
        this.$emit('returnData', { portA: port[0], portB: "" })

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
