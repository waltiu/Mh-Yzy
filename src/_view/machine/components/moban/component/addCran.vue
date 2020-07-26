<template>
  <div>
    <el-select
      v-model="value"
      filterable
      placeholder="请选择"
      remote
      :remote-method="search"
      @change="change"
      value-key="id"
    >
      <el-option v-for="item in list" :key="item.id" :label="item.omSN" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'addCran',
  data () {
    return {
      value: '',
      list: [],
      submitDetail: {}
    }
  },
  inject: ['nowData', 'id'],
  props: {
    type: [String, Number],
    clearValue: Boolean
  },
  watch: {
    clearValue: function (newVal) {
      if (newVal) {
        this.value = {}
      }
    }
  },
  methods: {
    search (info) {
      this.$http.get('api/ldsysMachineFrames/ldsysOpticalMultiplexers/findPage', {
        params: {
          omSN: info,
          type: this.type
        }
      }).then(res => {
        this.list = res.data._embedded.ldsysOpticalMultiplexers
        this.list = this.list.filter(item => {
          if (!item.ldsysMachineFrame || item.ldsysMachineFrame.id === this.id.fullData.id) {
            return true
          } else {
            return false
          }
        })
      })
    },
    change (info) {
      let data = this.nowData.dateail
      let tf = true
      if (data) {
        let newData = Object.values(data)

        newData.map(item => {
          if (item.id === info.id) {

            tf = false
          }
        })
      }
      if (tf) {
        this.$emit('addCranDetail', info)

      } else {


        this.$store.commit('setSysStatus', {
          info: {
            msg: `当前机框已经了添加${info.omSN}分合波器,请重新选择`,
            code: '500',
            time: new Date(),
            msgEn: `当前机框已经了添加${info.omSN}分合波器,请重新选择`
          },
          key: 'httpErr',
        })
        this.value = {}
      }
      // if (info.ldsysMachineFrame) {
      //   this.$message({
      //     message: '当前分合波器已关联机框,请重新选择',
      //     type: 'warning'
      //   });
      //   this.value = {}
      // } else {
      // }
    }

  },


}
</script>

<style>
</style>