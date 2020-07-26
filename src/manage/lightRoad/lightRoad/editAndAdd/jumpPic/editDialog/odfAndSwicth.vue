<template>
  <public-alert-page
    :title="$t('manage.modifyInformation')"
    top="15vh"
    :info="infos"
    width="50%"
    :modal="false"
  >
    <el-form label-position="left" label-width="90">
      <el-form-item :label="$t('statistics.type')" size="small">
        <el-select v-model="infos.type" :placeholder="$t('statistics.type')" style="width: 100%">
          <el-option value="1" :label="$t('infoMap.cableBox')"></el-option>
          <el-option value="2" label="ODF"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('tableSearch.name')" size="small">
        <auto-complete-info
          :values="infos"
          :placeholder="infos.name"
          @returnData="bindCompleteData"
          :url="infos.type == 1 ? $autoCompentedUrl['switchY'].url : $autoCompentedUrl['odf'].url"
        ></auto-complete-info>
      </el-form-item>

      <el-form-item :label="$t('lightRoad.jumperMode')">
        <!-- <el-radio-group :value="infos.jumpType">
          <el-radio label="room" @change="() => {infos = {...infos, 'jumpType': 'room'}}">
            <span>{{$t('lightRoad.jumpDevices')}}</span>
          </el-radio>
          <el-radio label="inner" @change="() => {infos = {...infos, 'jumpType': 'inner'}}">
            <span>{{$t('lightRoad.jumpInDevices')}}</span>
          </el-radio>
        </el-radio-group>-->
        <el-checkbox v-model="jumpType" @change="chooseJumpType">需在此设备内二次跳纤</el-checkbox>
      </el-form-item>

      <div>
        <el-form-item v-show="jumpType === true" label>
          设备内:
          <in-device
            :fullData="fullData"
            :info="infos"
            :editInfo="selectInfo"
            :chooseStaus="chooseStaus"
            @returnData="bindData"
          ></in-device>
        </el-form-item>

        <el-form-item v-show="jumpType === false" label>
          设备间:
          <in-room
            :fullData="fullData"
            :info="infos"
            :editInfo="selectInfo"
            @returnData="bindData"
            :chooseStaus="chooseStaus"
          ></in-room>
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer" slot-scope="self">
      <el-button type="danger" @click="remove(self.methods.close)">{{$t('opticalSplitter.remove')}}</el-button>
      <el-button
        type="primary"
        @click="submit(self.methods.close)"
      >{{$t('opticalSplitter.determine')}}</el-button>
    </span>
  </public-alert-page>
</template>

<script>
import inDevice from './components/indevice'
import inRoom from './components/inroom'

export default {
  name: 'OdfAndSwitchAlert',
  components: {
    inDevice,
    inRoom
  },
  props: {
    info: Object,
    fullData: Object,
  },
  data () {
    return {
      selectInfo: {}, //  光缆信息
      infos: {},
      jumpType: true,
      chooseStaus: false
    }
  },
  watch: {
    selectInfo: function (newVal) {

      this.infos = { ...this.infos, ...{ id: newVal.id, name: newVal.name } }
    },
    'infos.name': function () {
      this.$store.commit('changeDrawArray', "");

    },
    info: function (newVal) {
      if (newVal.portBJump) {
        this.jumpType = true
        this.infos.type = 'room'
      } else {
        this.jumpType = false
        this.infos.type = 'inner'

      }
      if (newVal.type === 8888 || newVal.type === '8888') {
        // 8888 hack
        this.infos = { ...newVal, type: '1' }
      } else {
        this.infos = { ...newVal }
      }
      this.selectInfo = { id: this.infos.id || '', name: this.info.name || '' }
    }
  },
  methods: {
    chooseJumpType () {
      this.chooseStaus = !this.chooseStaus
      this.$store.commit('changeDrawArray', "");
      if (this.jumpType) {
        this.infos = { ...this.infos, 'jumpType': 'inner' }
      } else {
        this.infos = { ...this.infos, 'jumpType': 'room' }
      }
    },
    bindCompleteData (info) {
      this.selectInfo = info
      this.infos.id = info.id
      this.infos.name = info.name
    },
    bindData (e) {
      this.infos = { ...this.infos, ...e }
    },
    remove (close) {
      this.infos = {}
      this.$emit('remove')
      close()
    },
    submit (close) {
      // 选择相邻光缆在上级查询, 此处仅冒泡事件.
      let tmp = { ...this.infos }

      if (tmp.jumpType === 'room') {
        if (this.fullData.coreNum === '双芯') {
          tmp.portAJump = ''
          tmp.portBJump = ''
        } else {
          tmp.portAJump = ''
        }
      }
      this.$emit('returnData', this.infos)
      this.infos = {}
      close()
    }
  },
  mounted () {
    this.infos.jumpType = 'room'
  }
}
</script>
