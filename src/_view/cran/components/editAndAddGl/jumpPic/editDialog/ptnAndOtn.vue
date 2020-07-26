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
          <el-option label="分合波器" value="cran"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input
          size="small"
          :value="infos.name"
          placeholder="输入搜索"
          :request="request"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('opticalSplitter.ports')">
        <el-select v-model="infos.portA" placeholder="请选择端口类型" size="small" style="width: 100%">
          <el-option
            v-for="item of selectPort"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </dialog-page>
</template>

<script>
import { ResourceApiLayer } from '@/_command/curd'

export default {
  props: {
    info: Object,
    type: String
  },

  data () {
    return {
      infos: { type: '13' },
      selectType: 'cran',
      selectInfo: {},
      opticalSplitterFullInfo: {},
      bindType: '',
      selectPort: []
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
      if (newVal.type === "13" || newVal.type === 13) {
        this.selectPort = [{ label: "COM", value: "COM" }]
      } else {
        this.selectPort = [{ label: "COM", value: "COM" }, { label: "EXP", value: "EXP" }]

      }
      this.infos = { ...this.info }
      this.infos.name = this.info.omSN
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
      this.infos.name = args.omSN
    },
    selectPoint (type) {
      this.bindType = type
      this.opticalSplitterFullInfo = { ...this.selectInfo }
    }
  }
}
</script>
