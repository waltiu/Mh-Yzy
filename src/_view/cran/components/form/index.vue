<template>
  <div style="display:flex">
    <el-form :model="formData" style="width:100%">
      <el-form-item
        :label="item.title"
        v-for="item of tableColumn"
        :key="item.key"
        label-width="98px"
      >
        <div v-if="item.type==='input'" style="width:98%">
          <el-input v-model="formData[item.key]"></el-input>
        </div>
        <div v-else-if="item.type==='inputSmall'" class="controlWidth" style="width:98%">
          <el-input v-model="formData[item.key]"></el-input>
        </div>
        <div v-else-if="item.type==='selectPlay'">
          <el-select v-model="formData[item.key]" style="width:49%" @change="changePlace">
            <el-option v-for="item1 of item.values" :key="item1.index" :value="item1">{{item1}}</el-option>
          </el-select>
          <el-select
            v-if="formData.place==='机房'"
            placeholder="请选择机房"
            v-model="formData.ldsysMachineRoom"
            value-key="id"
            style="width:49%;margin-left:2px;"
            :remote-method="searchServer"
            filterable
            remote
            clearable
            reserve-keyword
          >
            <el-option v-for="item of list.Server" :key="item.id" :value="item" :label="item.name"></el-option>
          </el-select>
          <div v-else-if="formData.place==='室外'" class="out">
            <p style="width:55px">经纬度</p>
            <el-input icon="ios-location" v-model="formData.lng" style="width:24.5%">
              <i
                slot="suffix"
                class="el-icon-location"
                style="font-size: 18px;"
                @click="() => {selectPointInMap = {lng: formData.lng , lat: formData.lat}}"
              ></i>
            </el-input>
            <el-input icon="ios-location" v-model="formData.lat" style="width:24.5%">
              <i
                slot="suffix"
                class="el-icon-location"
                style="font-size: 18px;"
                @click="() => {selectPointInMap = {lng: formData.lng , lat: formData.lat}}"
              ></i>
            </el-input>
          </div>
        </div>

        <el-select
          v-else-if="item.type==='select'"
          v-model="formData[item.key]"
          class="controlWidth"
          style="width:98%"
        >
          <el-option v-for="item1 of item.values" :key="item1.index" :value="item1">{{item1}}</el-option>
        </el-select>
        <el-select
          v-else-if="item.type==='selectType'"
          v-model="formData[item.key]"
          @change="changeSelect"
          class="controlWidth"
          style="width:98%"
        >
          <el-option
            v-for="itemb of $store.getters.getObjByType[item.values]"
            :key="itemb.index"
            :value="itemb.name"
          ></el-option>
        </el-select>
        <div v-else></div>
      </el-form-item>
    </el-form>
    <select-point @returnData="getLocation" :point="selectPointInMap"></select-point>
  </div>
</template>

<script>
import selectPoint from '@/public/selectPointInMap'

export default {
  name: 'baseTable',
  props: {
    tableColumn: Array,
    defaultData: Object,
    fullData: Object
  },
  components: {
    selectPoint
  },
  data () {
    return {
      formData: {
        lng: '',
        lat: '',
        ldsysMachineRoom: null,
        ldsysOpticalMultiplexerTemplate: {}

      },
      selectPointInMap: {},
      search: {
        Server: ''
      },
      list: {
        Server: {}
      },
      template: {}
    }
  },
  methods: {
    getLocation (e) {
      this.formData.lng = e.lng
      this.formData.lat = e.lat
    },
    changePlace () {
      this.formData.lng = ''
      this.formData.lat = ''
    },
    changeSelect (info) {
      let id = info.slice(9)
      console.log(this.fullData)
      if (this.fullData && this.fullData.ldsysMachineFrame) {
        this.$store.commit('setSysStatus', {
          info: {
            msg: '当前分合波器已关联机框,暂无法更改型号！',
            code: '500',
            time: new Date(),
            msgEn: '当前分合波器已关联机框,暂无法更改型号！'
          },
          key: 'httpErr',
        })
        this.formData.model = this.fullData.model
        return
      } else if (this.fullData && (this.fullData.child || this.fullData.parent)) {

        this.$store.commit('setSysStatus', {
          info: {
            msg: '当前分合波器已关联对端设备或者上联设备,暂无法更改型号！',
            code: '500',
            time: new Date(),
            msgEn: '当前分合波器已关联对端设备或者上联设备,暂无法更改型号！'
          },
          key: 'httpErr',
        })
        this.formData.model = this.fullData.model
      }
      else {
        this.$http.get(`api/ldsysOpticalMultiplexers/ldsysOpticalMultiplexerTemplate`, {
          params: {
            model: id
          }
        }).then(res => this.template = res)
      }
    },
    searchServer (info) {
      if (info) {
        this.search.Server = info
      }
      // /api/ldsysEquipments / search / findByNameLike
      this.$http.get("api/ldsysMachineRooms/search/findByNameLikeAndStationAndLevelAndservice", {
        params: {
          name: ("%" + this.search.Server + "%") || this.formData.ldsysMachineRoom.name,
          page: 0,
          size: 10
        }
      })
        .then(res => {
          this.list.Server = res.data._embedded.ldsysMachineRooms
        })
    }
  },
  watch: {
    formData: {
      handler: function (newVal) {
        this.$emit('submitForm', newVal)
      },
      deep: true,
      immediate: true
    },
    fullData: function (newVal) {
      this.formData = { ...newVal }
      let tep = { ...newVal.ldsysOpticalMultiplexerTemplate }
      tep.templateInfo = newVal.portInfos
      this.$emit('templateInfo', tep)

    },
    'formData.ldsysMachineRoom': {
      handler: function (newVal) {
        this.searchServer(newVal.name)
      },
      deep: true,
      immediate: true
    },
    template: function (newVal) {
      this.$emit('templateInfo', newVal.data)
      this.formData.ldsysOpticalMultiplexerTemplate.id = newVal.data.id
      this.formData.portInfos = newVal.data.templateInfo
    }
  },

}
</script>

<style scoped>
.out {
  position: relative;
  right: 55px;
  margin-top: 20px;
  display: flex;
  width: 200%;
}
</style>