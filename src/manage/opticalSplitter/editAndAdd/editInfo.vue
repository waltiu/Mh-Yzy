<template>
  <div>
    <dialog-page
      :info="info"
      :title="$t('opticalSplitter.editInformation')"
      width="80vh"
      top="15vh"
    >
      <el-form label-width="100px" size="mini">
        <el-form-item
          :label="$t('opticalSplitter.selectedPort')"
          v-if="['光交','ODF'].includes(fullData.place)"
        >
          {{ infos.occPort === undefined || infos.occPort === null || infos.occPort ==-1|| String(infos.occPort).length === 0 ? $t('opticalSplitter.select') : Number(infos.occPort) + 1 }}
          <el-button
            @click="() => {selectPort = {a:1}}"
            type="primary"
            round
            style="margin-left: 5px;"
          >{{$t('opticalSplitter.selectPort')}}</el-button>
        </el-form-item>

        <el-form-item v-if="inOrOut" :label="$t('opticalSplitter.equipment')">
          <el-input v-model="infos.equipment" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="!inOrOut" :label="$t('opticalSplitter.upequipment')">
          <el-input v-model="infos.equipment" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="inOrOut" :label="$t('opticalSplitter.devicePort')">
          <el-input v-model="infos.equipmentPort" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="!inOrOut" :label="$t('opticalSplitter.updevicePort')">
          <el-input v-model="infos.equipmentPort" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="!inOrOut" :label="$t('opticalSplitter.upperLinkPath')">
          <el-input v-model="infos.uplinkPath"></el-input>
        </el-form-item>

        <el-form-item v-if="inOrOut" :label="$t('opticalSplitter.downLinkPath')">
          <el-input v-model="infos.downlinkPath"></el-input>
        </el-form-item>

        <el-form-item v-if="!inOrOut" :label="$t('opticalSplitter.upperLinkMachineRoom')">
          <auto-complete-info
            :placeholder="infos.uplinkMachineRoomName"
            @returnData="(e) => {infos.uplinkMachineRoomId = e.id; infos.uplinkMachineRoomName = e.name}"
            :url="this.$autoCompentedUrl['deviceRoom'].url"
          ></auto-complete-info>
        </el-form-item>

        <el-form-item v-if="inOrOut" :label="$t('opticalSplitter.userNumber')">
          <el-input v-model="infos.userno"></el-input>
        </el-form-item>

        <el-form-item v-if="inOrOut" label="ONU SN">
          <el-input v-model="infos.onusn"></el-input>
        </el-form-item>
      </el-form>

      <dialog-page :info="selectPort" @close="() => { selectPort = {}}">
        <!-- 光交图 -->
        <odf-occ-port
          v-loading="ldsysOpticalCrossConnectLoading"
          :info="ldsysOpticalCrossConnect"
          @selectPort="(a) => {infos.occPort = a.num - 1; selectPort = {}}"
        ></odf-occ-port>
      </dialog-page>

      <span slot="footer" class="dialog-footer" slot-scope="method">
        <el-button type="danger" @click="use(method)">{{$t('opticalSplitter.hold')}}</el-button>
        <el-button type="primary" @click="submit(method)">{{$t('opticalSplitter.determine')}}</el-button>
        <el-button type="danger" @click="remove(method)">{{$t('opticalSplitter.remove')}}</el-button>
      </span>
    </dialog-page>
  </div>
</template>

<script>
import odfOccPort from '@/public/OdfOccPort'

export default {
  name: 'editInfo',
  props: {
    fullData: Object,
    info: Object
  },
  components: {
    odfOccPort
  },
  data () {
    return {
      ldsysOpticalCrossConnect: {},
      inOrOut: true,
      ldsysOpticalCrossConnectLoading: true,
      selectPort: {},
      infos: {
        userno: '',
        onusn: ''
        // occPort: '',
        // equipment: '',
        // equipmentPort: '',
        // uplinkPath: '',
        // uplinkMachineRoomName: ' ',
        // uplinkMachineRoomId: ''
      }
    }
  },
  watch: {
    selectPort: function () {
      let type = 'odf'
      switch (this.fullData.place) {
        case 'ODF':
          type = 'odf'
          break;

        case '光交':
          type = 'switchY'
          break;

      }
      this.$getTableFullInfo(type, this.fullData.ldsysOpticalCrossConnect, (e) => {
        this.ldsysOpticalCrossConnect = e.data
        this.ldsysOpticalCrossConnectLoading = false
      })
    },
    info: {
      handler: function (newVal) {
        if (newVal.info) {
          this.infos = { ...newVal.info.info }
        }
        if (this.info.type === 'inPort') {
          this.inOrOut = false
        } else {
          this.inOrOut = true
        }
      }
    }
  },
  methods: {
    submit (method) {
      this.$emit('returnData', {
        info: {
          [this.info.info.num - 1]: this.infos
        },
        type: this.info.type
      })
      method.method.close()
    },
    use (method) {
      if (this.fullData.place === null || this.fullData.place == "outdoor" || this.fullData.place === 'other') {
        this.infos.occPort = -1
      }
      this.$emit('returnData', {
        info: {
          [this.info.info.num - 1]: { ...this.infos, ...this.selectPort }
        },
        type: this.info.type
      })
      method.method.close()
    },
    remove (method) {

      this.$emit('returnData', {
        info: {
          [this.info.info.num - 1]: {
            occPort: null,
            equipment: null,
            equipmentPort: null,
            userno: null,
            onusn: null,
            downlinkPath: null
          }
        },
        type: this.info.type
      })
      method.method.close()
    }
  }
}
</script>
