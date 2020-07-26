<template>
  <el-card class="box-card" style="padding: 0px; margin-top: 10px;margin-left: 15px;">
    <div style="display: flex;">
      <el-select
        v-model="select"
        :placeholder="$t('infoMap.choice')"
        value-key="name"
        size="small"
        style="min-width:100px;max-width:100px"
      >
        <el-option-group
          v-for="(a,b) of $store.getters.vendorNameByType"
          :key="b"
          :label="$t(dict[b])"
        >
          <div v-for="(c,d) of a" :key="d">
            <el-option :label="$t(c.name)" :value="c.alert" v-if="!c.noDisplay"></el-option>
          </div>
        </el-option-group>
      </el-select>
      <div style="width: 180px; max-width:200px; margin-left:-3px">
        <middle-search-info
          @returnData="setMap"
          size="small"
          style="display: flex;"
          :request="request"
          :multiple="true"
          :values="values"
          :selectTypeMap="selectTypeMap"
        >
          <div slot-scope="self">
            <i
              class="el-icon-error"
              style="padding-top: 8px;margin-left: 180px;margin-top:-30px"
              @click="clearMarks(self)"
            ></i>
          </div>
        </middle-search-info>
      </div>
    </div>
  </el-card>
</template>

<script>
import { ResourceApiLayer } from '@/_command/curd'
import { checkMapCenter } from '@/_command/tools'

export default {
  data () {
    return {
      selectInfo: '',
      select: 'well',
      dict: {
        line: 'dictMangeLib.line',
        icon: 'dictMangeLib.point',
        complex: ' ',
        section: 'dictMangeLib.section'
      },
      values: [],
      selectTypeMap: true,
      newData: ""
    }
  },
  computed: {
    request: function () {
      return new ResourceApiLayer(this.select)
    },
    update: function () {
      return this.$store.state.mapEditInfo
    },
    detailType: function () {
      return this.$store.state.infoMapShow.alertType
    }
  },
  watch: {
    update: {
      handler: function (newVal) {
        let data = newVal

        if (data && (data.id === this.newData.id) && (this.detailType == this.select)) {
          let a = []
          a.push(data)
          this.setMap(a)
        }

      },
      immediate: true,
      deep: true
    },


  },
  methods: {
    clearAll () {
      this.values = []
      for (var key in this.$store.state.infoMapShow.buttonStatus) {
        if (key !== 'cableLabel') {
          this.$store.commit('setDefaultShow', {
            name: key,
            lines: []
          })
        }
      }
    },
    clearMarks (self) {
      self.methods.clear()
      this.$store.commit('setDefaultShow', {
        name: this.select,
        lines: []
      })
    },
    setMap (val) {
      let name = this.select

      let res = []
      let mrPoints = []

      val.forEach(element => {
        this.$getMapFullInfo(name, element, (e) => {
          this.newData = e.data
          if (checkMapCenter(e.data, this.select)) {
            res = [
              ...res,
              e.data
            ]
            this.$store.commit('setDefaultShow', {
              name: name,
              lines: res
            })
            // 当显示为光缆时, 显示成对的机房
            if (name === 'cable') {
              mrPoints = [
                ...mrPoints,
                ...e.data.mrPoints
              ]
              this.$store.commit('setDefaultShow', {
                name: 'deviceRoom',
                lines: mrPoints
              })
            }
            this.$store.commit('setMapCenter', checkMapCenter(e.data, this.select))
            this.values = []
          } else {
            this.$message({
              type: 'error',
              message: this.$i18n.t('infoMap.emptyData') + e.data.name
            })
          }
        })
      })
    }
  }
}
</script>
<style scoped>
.el-icon-error {
  position: absolute;
}
</style>