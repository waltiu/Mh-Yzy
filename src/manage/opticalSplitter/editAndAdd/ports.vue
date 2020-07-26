<template>
  <div>
    <div style="float: right;">
      <el-button
        size="mini"
        type="primary"
        @click="() => {showStatus = !showStatus}"
      >{{$t('alert.switch')}}</el-button>
    </div>
    <div>
      IN {{$t('opticalSplitter.ports')}}:
      {{ fullData.inNum }}
      <small v-if="editStatus">
        <span>{{$t('opticalSplitter.clickAndBind')}}</span>
      </small>
      <optical-splitter-ports
        position="up"
        v-if="showStatus"
        @selectPort="(a) => {editInfos(a, 'inPort')}"
        :ports="inPort"
        :num="fullData.inNum"
        :place="fullData.place"
      ></optical-splitter-ports>

      <optical-splitter-ports-other
        position="up"
        v-if="!showStatus"
        :ports="inPort"
        :num="fullData.inNum"
        @selectPort="(a) => {editInfos(a, 'inPort')}"
      ></optical-splitter-ports-other>
    </div>

    <hr />

    <div>
      OUT {{$t('opticalSplitter.ports')}}:
      {{ fullData.outNum }}
      <small v-if="editStatus">
        <span>{{$t('opticalSplitter.clickAndBind')}}</span>
      </small>
      <optical-splitter-ports
        position="down"
        v-if="showStatus"
        @selectPort="(a) => {editInfos(a, 'outPort')}"
        :ports="outPort"
        :num="fullData.outNum"
        :place="fullData.place"
      ></optical-splitter-ports>

      <optical-splitter-ports-other
        position="down"
        v-if="!showStatus"
        :ports="outPort"
        :num="fullData.outNum"
        @selectPort="(a) => {editInfos(a, 'outPort')}"
      ></optical-splitter-ports-other>
    </div>

    <!-- 编辑信息 -->
    <edit-info v-if="editStatus" :fullData="fullData" :info="edit" @returnData="bindUseInfo"></edit-info>
  </div>
</template>

<script>
import opticalSplitterPorts from '@/public/opticalSplitter'
import opticalSplitterPortsOther from '@/public/opticalSplitter/other.vue'
import editInfo from './editInfo'

export default {
  name: 'opticalSplitterSelectPorts',
  props: {
    fullData: Object,
    editStatus: {
      default: true,
      type: Boolean
    }
  },
  components: {
    opticalSplitterPortsOther,
    opticalSplitterPorts,
    editInfo
  },
  watch: {
    fullData: function (newVal) {
      this.info = newVal
    },
    info: {
      handler: function (newVal) {
        this.inPort = { ...newVal.inPort }
        this.outPort = { ...newVal.outPort }
        this.$emit('returnData', newVal)
      },
      deep: true
    }
  },
  data () {
    return {
      showStatus: true,
      edit: {},
      info: {},
      inPort: {},
      outPort: {}
    }
  },
  methods: {
    bindUseInfo (args) {
      this.info[args.type] = { ...this.info[args.type], ...args.info }
    },
    editInfos (info, type) {
      this.edit = { info: info, type: type }
    }
  }
}
</script>
