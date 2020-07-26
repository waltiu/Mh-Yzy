<template>
  <dialog-page :title="$t('manage.modifyInformation')" width="50%" :info="info" @ok="submit">
    <el-form label-width="100px" size="small">
      <el-form-item :label="$t('cable.chooseType')">
        <el-select
          v-model="selectType"
          :placeholder="$t('infoMap.choice')"
          size="small"
          style="width: 100%"
        >
          <el-option :label="$t('tableSearch.networkElement')" value="device"></el-option>
          <el-option :label="$t('vendorList.opticalSplitter')" value="opticalSplitter"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('dynamic.name')">
        <middle-search-info
          @dataReady="(info) => {selectInfo = info}"
          size="small"
          :defaultValue="infos.name"
          placeholder="输入搜索"
          :request="request"
          @returnData="bindInfo"
        ></middle-search-info>
      </el-form-item>

      <div v-if="selectType === 'device'">
        <el-form-item :label="$t('opticalSplitter.ports')">
          <el-input v-model="infos.portA" :placeholder="$t('lightRoad.modifyPortName')"></el-input>
        </el-form-item>
      </div>

      <div v-else>
        <el-form-item :label="$t('lightRoad.portA')">
          {{ infos.portA || $t('main.empty') }}
          <el-button
            size="small"
            type="primary"
            @click="selectPoint('portA')"
            style="margin-left: 10px;"
          >{{$t('opticalSplitter.selectPort')}}</el-button>
        </el-form-item>

        <el-form-item :label="$t('lightRoad.portB')">
          {{ infos.portB || $t('main.empty')}}
          <el-button
            size="small"
            type="primary"
            @click="selectPoint('portB')"
            style="margin-left: 10px;"
          >{{$t('opticalSplitter.selectPort')}}</el-button>
        </el-form-item>

        <select-port
          @close="() => { this.opticalSplitterFullInfo = {} }"
          :fullData="opticalSplitterFullInfo"
          @returnData="(val) => {$set(infos, bindType, val)}"
        ></select-port>
      </div>
    </el-form>
  </dialog-page>
</template>

<script>
import selectPort from './selectPort'
import { ResourceApiLayer } from '@/_command/curd'

export default {
  props: {
    info: Object,
    type: String
  },
  components: {
    selectPort
  },
  data () {
    return {
      infos: { type: '10' },
      selectType: 'device',
      selectInfo: {},
      opticalSplitterFullInfo: {},
      bindType: ''
    }
  },
  computed: {
    request: function () {
      return new ResourceApiLayer(this.selectType)
    }
  },
  watch: {
    selectType: function (newVal) {
      if (newVal === 'device') {
        this.infos.type = '10'
        this.infos.portB = ''
      } else if (newVal === 'opticalSplitter') {
        this.infos.type = '11'
      }
    },
    info: function (newVal) {
      this.infos = { ...this.info }
      if (newVal.type === '10') {
        this.selectType = 'device'
      } else if (newVal.type === '11') {
        this.selectType = 'opticalSplitter'
      }
    }
  },
  methods: {
    submit () {
      this.$emit('returnData', this.infos)
    },
    bindInfo (args) {
      this.selectInfo = args
      this.infos.id = args.id
      this.infos.name = args.name
    },
    selectPoint (type) {
      this.bindType = type
      this.opticalSplitterFullInfo = { ...this.selectInfo }
    }
  }
}
</script>
