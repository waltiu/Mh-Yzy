<template>
  <dialog-page :title="$t('manage.modifyInformation')" width="50%" :info="info" @ok="submit">
    <el-form label-width="100px" size="small">
      <el-form-item :label="$t('cable.chooseType')">
        <el-select
          v-model="selectType"
          :placeholder="$t('infoMap.choice')"
          size="small"
          style="width: 100%"
          @change="changeType"
        >
          <el-option :label="$t('tableSearch.networkElement')" value="device"></el-option>
          <el-option :label="$t('vendorList.opticalSplitter')" value="opticalSplitter"></el-option>
          <el-option label="分合波器" value="cran"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        :label="$t('dynamic.name')"
        v-if="selectType === 'device'||selectType === 'opticalSplitter'"
      >
        <middle-search-info
          @dataReady="(info) => {selectInfo = info}"
          size="small"
          :defaultValue="infos.name"
          placeholder="输入搜索"
          :request="request"
          @returnData="bindInfo"
        ></middle-search-info>
      </el-form-item>
      <el-form-item :label="$t('dynamic.name')" v-if="selectType === 'cran'">
        <search-cran
          @end="end"
          size="small"
          :defaultValue="infos.name"
          placeholder="输入搜索"
          :request="request"
          @start="start"
        ></search-cran>
      </el-form-item>

      <div v-if="selectType === 'device'">
        <el-form-item :label="$t('opticalSplitter.ports')">
          <el-input v-model="infos.portA" :placeholder="$t('lightRoad.modifyPortName')"></el-input>
        </el-form-item>
      </div>

      <div v-else-if="selectType==='opticalSplitter'">
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
      <div v-else-if="selectType === 'cran'">
        <el-form-item label="端口">
          <el-select
            v-model="infos.portA"
            :placeholder="$t('infoMap.choice')"
            size="small"
            style="width: 100%"
          >
            <el-option label="COM" value="COM"></el-option>
            <el-option label="EXP" value="EXP"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </dialog-page>
</template>

<script>
import searchCran from './searchCran'
import selectPort from './selectPort'
import { ResourceApiLayer } from '@/_command/curd'

export default {
  props: {
    info: Object,
    type: String
  },
  components: {
    selectPort,
    searchCran
  },
  data () {
    return {
      infos: { type: '10' },
      selectType: 'device',
      selectInfo: {},
      opticalSplitterFullInfo: {},
      bindType: '',
      endData: {
        type: '10'
      }
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
    info: {
      handler: function (newVal) {
        this.infos = { ...this.info }
        if (newVal.type === '10') {
          this.selectType = 'device'
        } else if (newVal.type === '11') {
          this.selectType = 'opticalSplitter'
        } else if (newVal.type === 13 || newVal.type === '14' || newVal.type === "13" || newVal.type === 14) {
          this.selectType = 'cran'
        } else {
          this.infos.type = '10'
          this.selectType = 'device'

        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeType () {
      this.infos.portA = ""
      this.infos.name = ""
      if (this.info.type === '13' || this.info.type === '14') {
        this.$emit('end', this.endData)

      }

    },
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
    },
    start (info) {
      this.infos.id = info.id
      this.infos.name = info.name
      this.infos.type = info.type
    },
    end (info) {
      this.endData = { ...info }
      this.$emit('end', this.endData)


    }
  }
}
</script>
