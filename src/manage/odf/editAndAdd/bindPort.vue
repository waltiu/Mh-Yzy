<template>
  <div>
    <!-- <el-alert
      :closable="false"
      v-if="!odfInfo.rectangleNum && !odfInfo.rectangleRowNum && !odfInfo.occSize"
      :title="$t('cable.wrong')"
      type="error"
      :description="$t('lightRoad.missing')"
      show-icon
    ></el-alert>-->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('bindPort.boundCable')}}</span>
      </div>
      <div class="text item" v-for="(a, index) in munitBindData" :key="index">
        <div>
          <el-button type="danger" @click="deleteOCC(a)" circle size="mini" icon="el-icon-delete"></el-button>
          {{a.name}}
        </div>
        <div>{{$t('bindPort.cableCoreSequence')}}: {{ a.minCore }} {{$t('bindPort.to')}} {{ a.maxCore }}</div>
        <div>{{$t('bindPort.ODFPort')}}: {{ $portNumToShow({port: a.minPort, dist: 12, frame: odfInfo.rectangleRowNum}) }} {{$t('bindPort.to')}} {{ $portNumToShow({port: a.maxPort, dist: 12, frame: odfInfo.rectangleRowNum}) }}</div>
        <hr />
      </div>
    </el-card>
    <div style="margin-top: 10px"></div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ !bindStatus ? $t('bindPort.cableBinding') : fullData.name }}</span>
        <!-- <el-button @click="$emit('remove')"  style="float: right; padding: 3px 0" type="text">移除</el-button> -->
      </div>
      <el-collapse-transition>
        <el-form label-width="100px">
          <el-form-item :label="$t('bindPort.opticalCableSearch')">
            <auto-complete-info
              :url="$autoCompentedUrl['cable'].url"
              :placeholder="$t('bindPort.opticalCableSearch')"
              @returnData="setInfo"
            ></auto-complete-info>
          </el-form-item>
          <el-form-item :label="$t('bindPort.cableCoreSequence')">
            <el-input
              min="0"
              type="number"
              size="small"
              style="width: 30%"
              v-model="startPort"
              :placeholder="$t('bindPort.startingCores')"
            ></el-input>
            <b style="padding: 0px 4px 0px 4px;">{{$t('bindPort.to')}}</b>
            <el-input
              min="0"
              type="number"
              size="small"
              style="width: 30%"
              v-model="endPort"
              :placeholder="$t('bindPort.endCores')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('bindPort.opticalPort')">
            <div style="display: table-cell;">
              <select-start-end :info="odfInfo" @returnData="(e) => {$set(selectUse, 'start', e)}"></select-start-end>
              <b>{{$t('bindPort.to')}}</b>
              <select-start-end :info="odfInfo" @returnData="(e) => {$set(selectUse, 'end', e)}"></select-start-end>
            </div>
          </el-form-item>
          <el-button @click="bind">{{$t('bindPort.determineBinding')}}</el-button>
        </el-form>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script>
import selectStartEnd from './selectStartEnd'
import _ from 'lodash'
import { http } from '@/_command/http'


export default {
  name: 'bindPorts',
  components: {
    selectStartEnd
  },
  props: {
    odfInfo: Object
  },
  data () {
    return {
      bindStatus: false,
      fullData: {},
      startPort: 1,
      endPort: '',
      selectUse: {},
      ocName: ''
    }
  },
  computed: {
    munitBindData () {
      // TODO 临时方案 存在大量BUG！
      // let temp = new Map()
      // let group = []
      if (_.isEmpty(this.odfInfo[0])) return {}
      let keys = Object.keys(this.odfInfo.useInfos)
      // let lastOcPortId = keys[0]
      let map = new Map()
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (_.isEmpty(key)) continue
        let useInfo = this.odfInfo.useInfos[key]
        let unit = map.get(useInfo.ocName)
        if (_.isEmpty(unit)) {
          // console . /.log('my in', useInfo.ocName)
          map.set(useInfo.ocName,
            {              name: useInfo.ocName,
              minPort: Number(key),
              maxPort: Number(key),
              minCore: Number(Number(useInfo.ocPortOcPort)),
              maxCore: Number(Number(useInfo.ocPortOcPort))
            })
        } else {
          unit.maxPort = _.max([unit.maxPort, Number(Number(key))])
          unit.minCore = _.min([unit.minCore, Number(Number(useInfo.ocPortOcPort))])
          unit.maxCore = _.max([unit.maxCore, Number(Number(useInfo.ocPortOcPort))])
        }
      }
      let group = []
      map.forEach((value, key) => {
        if (!_.isEmpty(key)) {
          group.push({            name: key,
            minPort: value.minPort,
            maxPort: value.maxPort,
            minCore: value.minCore,
            maxCore: value.maxCore          })
        }
      })
      return group
    }
  },
  methods: {
    setInfo (e) {
      this.$getTableFullInfo('cable', e, (a) => {
        this.fullData = a.data
        this.endPort = a.data.ocSize
        this.ocName = a.data.name
      })
    },
    bind () {
      if (!(this.selectUse.end - this.selectUse.start)) return
      let state = []
      let i = this.selectUse.start
      for (i; i < this.selectUse.end - this.selectUse.start + 1; i++) {
        // +1 是为了生成符合条件的数组
        if (!this.odfInfo.useInfos) {
          state.push(false)
        }
        else if (this.odfInfo.useInfos[i]) {
          state.push(true)

        } else {
          state.push(false)
        }
      }
      let a = state.some(item => {
        return item === true
      })
      if (a) {
        this.$message.error('您批量绑定的端口已被绑定，请重新绑定！');
      } else {
        let tmp = {
          ocId: this.fullData.id,
          fromOcPort: this.startPort,
          toOcPort: this.endPort,
          fromOccPort: this.selectUse.start,
          toOccPort: this.selectUse.end
        }
        http.patch(`api/ldsysOpticalCrossConnects/${this.odfInfo.id}/batchBindPort`, tmp
        ).then(res => {
          if (res.status === 200) {
            this.$emit('bind', tmp)

            this.$emit('bind', tmp)

          }
        })
      }
    }
    ,
    deleteOCC (a) {
      let tmp = []
      for (let i = a.minPort; i <= a.maxPort; i++) {
        // +1 是为了生成符合条件的数组
        tmp.push(i)
      }
      http.patch(`api/ldsysOpticalCrossConnects/${this.odfInfo.id}/removeBatchBindPort`, tmp
      ).then(res => {
        if (res.status === 200) {
          this.$emit('bind', tmp)

        }
      })


    }
  }
}
</script>
 