<template>
  <div>
    <div>
      <table-components :columns="computedTableColumnAll" :data="formData" :loading="false">
        <div slot="index">
          <el-table-column type="index" width="50"></el-table-column>
        </div>
      </table-components>
    </div>
  </div>
</template>

<script>
import tableComponents from '@/public/table/tableComponents.vue'

export default {
  name: 'selectPort',
  props: {
    myMessigSpecial: Array,
    ports: Object,
    num: Number,
    picture: {
      type: String,
      default: 'opticalSplitter'
    },
    position: String
  },
  components: {
    tableComponents
  },
  data () {
    return {
      info: {},
      template: {
        equipment: null,
        equipmentPort: null,
        ocCore: null,
        ocId: null,
        ocName: null,
        occPort: null,
        occPortStr: null,
        uplinkMachineRoomId: null,
        uplinkMachineRoomName: null,
        uplinkPath: null,
        downlinkPath: null,
        userno: null,
        onusn: null
      },
      renderList: {
        icon: {
          title: this.$i18n.t('alert.icon'),
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: this.computedUrl(params.row).url
              }
            })
          },
          key: 'icon'
        },
        occPort: {
          title: 'alert.bindPortNumber',
          render: (h, params) => {
            return h('div', params.row.occPort === '-1' ? this.$i18n.t('alert.hold') : params.row.occPort !== null && params.row.occPort !== '' && params.row.occPort !== undefined ? Number(params.row.occPort) + 1 : '')
          },
          key: 'occPort'
        },
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
      // },
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
    formData: function () {
      const data = [...Array(this.num)].
        map(() => [{
          downlinkPath: null,
          equipment: null,
          equipmentPort: null,
          ocCore: null,
          ocCoreInOs: null,
          ocId: null,
          ocName: null,
          ocNameInOs: null,
          occPort: null,
          occPortStr: null,
          onusn: null,
          uplinkMachineRoomId: null,
          uplinkMachineRoomName: null,
          uplinkPath: null,
          userno: null
        }])

      const newData = { ...data, ...this.computedTableData, }
      const lastData = Object.values(newData)

      return lastData
    },
    computedTableData: function () {
      return Object.values(this.ports)
    },
    computedTableColumnAll: function () {
      return [this.renderList['icon'], this.renderList['occPort'], ...Object.values(this.computedTableColumn)]
    },
    computedTableColumn: function () {
      return Object.entries(this.em).reduce((res, [key, val]) => {
        if (!Object.keys(this.renderList).includes(key)) {
          res[key] = {
            title: val,
            key: key
          }
        }
        return res
      }, {})
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
          tmp[i] = this.template
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
