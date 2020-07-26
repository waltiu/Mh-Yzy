<template>
  <div>
    <div style="padding-bottom: 15px;display: flex;">
      <el-button
        size="mini"
        type="primary"
        round
        @click="() => {selectCable = {...editInfo}; tag = 'portA'}"
      >{{$t('lightRoad.choosePortA')}}</el-button>
      <div class="lightRoadDiff">{{ (info.portA || $t('main.empty')) + ' : ' + (info.portAJump || $t('main.empty')) }}</div>
      <el-button
        size="mini"
        type="primary"
        round
        style="margin-left: 10px;"
        @click="() => {selectCable = {...editInfo}; tag = 'portAJump'}"
      >{{$t('lightRoad.choosePortAFiberJumper')}}</el-button>
    </div>

    <!-- 是否为双纤 -->
    <div v-if="fullData.coreNum === '双芯'" style="display: flex;">
      <el-button
        size="mini"
        type="primary"
        round
        @click="() => {selectCable = {...editInfo}; tag = 'portB'}"
      >{{$t('lightRoad.choosePortB')}}</el-button>
      <div class="lightRoadDiff">{{ (info.portB || $t('main.empty')) + ' : ' + (info.portBJump || $t('main.empty')) }}</div>
      <el-button
        size="mini"
        type="primary"
        round
        style="margin-left: 10px;"
        @click="() => {selectCable = {...editInfo}; tag = 'portBJump'}"
      >{{$t('lightRoad.choosePortBFiberJumper')}}</el-button>
    </div>
    <select-port :info="selectCable" @selectPort="select"></select-port>
  </div>
</template>

<script>
import selectPort from './selectPort.vue'

export default {
  name: 'inDevice',
  props: {
    fullData: Object,
    info: Object,
    editInfo: Object
  },
  components: {
    selectPort
  },
  data () {
    return {
      tag: '',
      selectCable: {}
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
      this.$emit('returnData', { [this.tag]: port })
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
