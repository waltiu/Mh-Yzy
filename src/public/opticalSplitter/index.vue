<template>
  <!-- 选择分光器端口, 传入ports后自动识别信息, 完成分片, 分型号的传递 -->
  <!--
    参数: ports: Obj inPort
          num: Number inNum
  -->
  <div>
    <div>
      <div
        class="ODFframe"
        v-for="(b, indexB) in drawArray"
        :key="indexB + 'frame'"
        style="display: flex;"
      >
        <span>{{ (indexB + 1) }}</span>
        <div
          class="ODFhorizontal"
          v-for="(c, indexC) in b"
          :key="indexC + 'ODFhorizontal'"
          :style="`width: ${100 / 8}% ;${ borderStyle ? borderStyle[indexB * 8 + indexC] : ''}`"
        >
          <div>
            <img
              @click="selectPort(indexB + 1, indexC + 1, computedUrl(c).type, c)"
              :src="computedUrl(c).url"
              style="width: 40px; height: 40px; cursor:pointer;"
            />
            <span>{{ indexC + 1 }}</span>
          </div>
          <!-- 附加信息 -->
          <div v-if="em && !_.isEmpty(c)">
            <div v-for="(z, indexZ) in c" :key="indexZ">
              <span v-if="em[indexZ] !== undefined">
                <p>
                  <b>{{$t(em[indexZ])}}</b>
                </p>

                <p style="padding-left: 2px;">
                  <small v-if="indexZ === 'occPort'">
                    <p
                      v-if="[`光交`,`ODF`].includes(place)"
                    >{{ (z !== undefined && z!==""&&Number(z)>-1&&z!==null ? Number(z)+1 : '-') }}</p>
                    <p v-if="[`电杆`,`outdoor`,`other`].includes(place)">{{$t('alert.hold')}}</p>
                  </small>

                  <small v-else>{{ z || '-'}}</small>
                </p>
              </span>
            </div>

            <div v-if="['use', 'occupy'].includes(computedUrl(c).type)">
              <p>
                <b>{{$t('alert.statusOfUse')}}</b>
              </p>
              <p>
                <small>{{$t('alert.hold')}}</small>
              </p>
              <!-- {{ computedUrl(c).type === 'use' ? '占用' : '空闲' }} -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectPort',
  props: {
    myMessigSpecial: Array,
    ports: Object,
    num: Number,
    place: String,
    picture: {
      type: String,
      default: 'opticalSplitter'
    },
    borderStyle: Object,
    position: String
  },
  data () {
    return {
      info: {},
      template: {
        occPort: null,
        equipment: null,
        equipmentPort: null,
        userno: null,
        onusn: null,
        ocCore: null,
        ocId: null,
        ocName: null,
        occPortStr: null,
        uplinkMachineRoomId: null,
        uplinkMachineRoomName: null,
        uplinkPath: null,
        downlinkPath: null

      },
      strkey: {
        up: {
          occPort: 'alert.boundPort', // 绑定端口
          equipment: 'alert.upLinkDevice', // 设备:
          equipmentPort: 'alert.upLinkDevicePort', // 端口:
          uplinkPath: 'alert.uplinkPath', // 上联路径:
          uplinkMachineRoomName: 'alert.uplinkRoomName' // 上联机房名称:
        },
        down: {
          userno: 'opticalSplitter.userNumber',
          onusn: 'ONU SN',
          occPort: 'alert.boundPort', // 绑定端口
          equipment: 'alert.downLinkDevice', // 设备:
          equipmentPort: 'alert.downLinkDevicePort', // 端口:
          downlinkPath: 'alert.downlinkPath', // 下联跳纤路径
        },
      },
      // em: {
      //   occPort: 'alert.bindPortNumber', // 绑定的端口序号
      //   occPortStr: 'alert.boundPort', // 绑定端口
      //   ocName: 'alert.cableName', // 光缆名:
      //   ocCore: 'alert.cableCore', // 光缆纤芯:
      //   equipment: 'alert.device', // 设备:
      //   equipmentPort: 'alert.ports1', // 端口:
      //   uplinkPath: 'alert.uplinkPath', // 上联路径:
      //   downlinkPath: 'alert.downlinkJumperCablePath', // 下联跳纤路径
      //   uplinkMachineRoomName: 'alert.uplinkRoomName' // 上联机房名称:
      // }
    }
  },
  methods: {
    computedUrl (e) {
      let url = ''
      let type = ''
      if (e.occPort === null || e.occPort === '' || e.occPort === undefined) {
        type = 'unuse'
        url = this.$useInfoPic[this.picture].unuse
      } else if (e.occPort === '-1') {
        type = 'occupy'
        url = this.$useInfoPic[this.picture].use
      } else {
        type = 'use'
        url = this.$useInfoPic[this.picture].use
      }
      return {
        url: url,
        type: type
      }
    },
    selectPort (frame, num, type, info) {
      this.$emit('selectPort', {
        show: frame + '-' + num,
        type: type,
        num: (frame - 1) * 8 + num,
        info
      })
    }
  },
  watch: {
    ports: {
      immediate: true,
      handler: function (newVal) {
        this.info = { ...newVal }
      }
    }
  },
  computed: {
    em: function () {
      return this.strkey[this.position]
    },
    drawArray: function () {
      let tmp = []
      // 防止增加时候侧漏
      for (let i = 0; i < Number(this.num); i++) {
        if (this.info[i]) {
          if (!this.info[i] && this._.isEmpty(this.info[i])) {
            tmp[i] = this.template
          } else {
            tmp[i] = this.info[i]
          }
        } else {
          tmp[i] = { ...this.template }
        }
      }
      return this._.chunk(tmp, 8)
    },
    changeBorder () {
      return function (indexData) {
        if (typeof this.myMessigSpecial !== 'undefined' && this.myMessigSpecial.indexOf(indexData) !== -1) {
          return {
            border: '1px solid red',
            width: 100 / 8 + '%',
            height: 'auto',
            margin: '5px 0 0 0'
          }
        } else {
          return {
            width: 100 / 8 + '%',
            height: 'auto',
            margin: '5px 0 0 0'
          }
        }
      }
    }
  }
}
</script>
