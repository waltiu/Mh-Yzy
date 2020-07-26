<template>
  <div>
    <public-alert-page
      :info="info"
      :width="'60%'"
      :title="$t('cable.carryingLightPath')"
      :top="'10vh'"
    >
      <!-- 编辑信息 -->
      <el-form v-loading="loading" label-width="100px" size="mini">
        <el-form-item :label="$t('bindPort.opticalCableSearch')">
          <middle-search-info
            :defaultValue="form.ocName"
            @returnData="setInfo"
            size="small"
            :request="request"
            :placeholder="$t('bindPort.opticalCableSearch')"
          ></middle-search-info>
        </el-form-item>

        <el-form-item :label="$t('lightRoad.lightCore')">
          <el-input readonly size="small" v-model="form.ocPortOcPort"></el-input>
        </el-form-item>

        <el-form-item :label="$t('cable.carryingLightPath')">
          <el-input v-model="form.carryingWay"></el-input>
        </el-form-item>

        <el-form-item :label="$t('cable.carryingBusiness')">
          <el-input v-model="form.carryingBusiness"></el-input>
        </el-form-item>

        <el-form-item :label="$t('lightRoad.connectedDevice')">
          <el-input readonly size="small" :value="$t('lightRoad.automatically')"></el-input>
        </el-form-item>

        <el-form-item :label="$t('alert.ports')">
          <el-input readonly size="small" :value="$t('lightRoad.automatically')"></el-input>
        </el-form-item>

        <el-form-item label="状态:">{{ info.type === 'full' ? $t('alert.hold') : $t('alert.unused') }}</el-form-item>
      </el-form>
      <div slot="footer" slot-scope="self">
        <el-button @click="submit('bind', self.methods.close)">{{$t('lightRoad.bind')}}</el-button>
        <el-button @click="submit('use', self.methods.close)">{{$t('alert.hold')}}</el-button>
        <el-button @click="submit('remove', self.methods.close)">{{$t('lightRoad.remove')}}</el-button>
      </div>
    </public-alert-page>

    <dialog-page :info="tmp" :title="$t('lightRoad.selectCableCore')" top="15vh">
      <oc-port :info="fullData" @selectPoint="bind"></oc-port>
      <div slot="footer"></div>
    </dialog-page>
  </div>
</template>

<script>
import ocPort from '@/public/ocPort'
import { http } from '@/_command/http'

import { ResourceApiLayer } from '@/_command/curd'

export default {
  name: 'changeUseStatus',
  props: {
    info: Object,
    baseData: Object
  },
  components: {
    ocPort
  },
  data () {
    return {
      form: {},
      loading: false,
      fullData: {},
      tmp: {},
    }
  },
  watch: {
    info: {
      immediate: true,
      handler: function (newVal) {
        this.form = { ...newVal.info } || {}
      },
      deep: true
    }
  },
  computed: {
    request: function () {
      return new ResourceApiLayer('cable')
    }
  },
  methods: {
    // bindPort (close) {
    //   close()
    //   let tmp = {
    //     [this.info.num - 1]: {
    //       ocPortOcId: this.fullData.id, // 光缆ID
    //       ocPortOcPort: Number(this.form.ocPortOcPort), // 光缆绑定ODF端口,
    //       useId: '',
    //       userPort: ''
    //     }
    //   }
    //   this.$emit('returnData', tmp)
    // },
    // // 占用
    // occupy (close) {
    //   close()
    //   let tmp = { [this.info.num - 1]: { ...this.info.info, useId: '-1', userPort: '-1' } }
    //   this.$emit('returnData', tmp)
    // },
    // remove (close) {
    //   close()
    //   let tmp = { [this.info.num - 1]: {} }
    //   this.$emit('returnData', tmp)
    // },
    submit (a, colse) {
      let tmp = {}
      // 绑定
      this.loading = true
      if (a === 'bind') {
        tmp = {
          ocPortOcId: this.form.ocPortOcId,
          ocPortOcPort: this.form.ocPortOcPort,
          useId: "",
          userPort: "",
          carryingBusiness: this.form.carryingBusiness,
          carryingWay: this.form.carryingWay,
          ocName: this.form.ocName
        }
        http.patch(`/api/ldsysOpticalCrossConnects/${this.baseData.id}/${this.info.num - 1}/bindport`, tmp)
          .then(res => {
            if (res.status === 200) {
              this.$emit('returnData', tmp)
              this.loading = false
              colse()

            }
          })
      }
      // 占用
      if (a === 'use') {
        tmp = {
          ocPortOcId: this.form.ocPortOcId,
          ocPortOcPort: this.form.ocPortOcPort,
          useId: '-1',
          carryingBusiness: this.form.carryingBusiness,
          carryingWay: this.form.carryingWay,
          userPort: '-1',
          ocName: this.form.ocName
        }
        http.patch(`/api/ldsysOpticalCrossConnects/${this.baseData.id}/${this.info.num - 1}/bindport`, tmp)
          .then(res => {
            if (res.status === 200) {
              this.$emit('returnData', tmp)
              this.loading = false
              colse()


            }
          })

      }
      // 拆除
      if (a === 'remove') {
        http.patch(`/api/ldsysOpticalCrossConnects/${this.baseData.id}/${this.info.num - 1}/removeBindport`, tmp)
          .then(res => {
            if (res.status === 200) {
              this.$emit('returnData', tmp)
              this.loading = false
              colse()

            }
          })
      }
    },
    bind (a) {
      if (a.type === 'unuse') {
        this.tmp = {}
        this.form.ocPortOcPort = a.info
      }
    },
    setInfo (e) {
      this.loading = true
      this.form.ocName = e.name
      this.form.ocPortOcId = e.id
      this.$getTableFullInfo('cable', e, (e) => {
        this.fullData = e.data
        this.tmp = e.data
        this.loading = false
      })
    }
  }
}
</script>
