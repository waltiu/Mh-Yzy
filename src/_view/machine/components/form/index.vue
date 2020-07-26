<template>
  <div style="display:flex">
    <el-form :model="formData" style="width:100%">
      <el-form-item
        :label="item.title"
        v-for="item of formConfig"
        :key="item.key"
        label-width="98px"
      >
        <div v-if="item.type==='input'" style="width:98%">
          <el-input v-model="formData[item.key]"></el-input>
        </div>

        <div v-else-if="item.type==='place'">
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
          <div v-else-if="formData.place==='室外'" class="outDoor">
            <p style="width:55px">经纬度</p>
            <el-input icon="ios-place" v-model="formData.lng" style="width:49%">
              <i
                slot="suffix"
                class="el-icon-place"
                style="font-size: 18px;"
                @click="() => {selectPointInMap = {lng: formData.lng , lat: formData.lat}}"
              ></i>
            </el-input>
            <el-input icon="ios-place" v-model="formData.lat" style="width:49%">
              <i
                slot="suffix"
                class="el-icon-place"
                style="font-size: 18px;"
                @click="() => {selectPointInMap = {lng: formData.lng , lat: formData.lat}}"
              ></i>
            </el-input>
          </div>
        </div>
        <div v-else-if="item.type==='selectType'">
          <el-select
            v-model="formData[item.key]"
            class="controlWidth"
            style="width:98%"
            @change="changeSelect"
          >
            <el-option v-for="item1 of item.values" :key="item1.index" :value="item1">{{item1}}</el-option>
          </el-select>

          <div v-if="formData.model==='FONST3000(3UC)'" class="outDoor">
            <p style="width:55px">槽位</p>
            <el-select v-model="formData.type" style="width:49%" @change="changeType">
              <el-option :value="value1" label="单槽">单槽</el-option>
              <el-option :value="value2" label="双槽">双槽</el-option>
            </el-select>
          </div>
        </div>
        <div v-else></div>
      </el-form-item>
    </el-form>
    <select-point @returnData="getplace" :point="selectPointInMap"></select-point>
  </div>
</template>

<script>
import selectPoint from '@/public/selectPointInMap'

export default {
  name: 'baseTable',
  props: {
    formConfig: Array,
    fullData: Object
  },
  components: {
    selectPoint
  },
  data () {
    return {
      value1: 0,
      value2: 1,
      formData: {
        lng: '',
        lat: '',
        type: '',
        ldsysMachineRoom: null

      },
      baseData: {},
      selectPointInMap: {},
      search: {
        Server: ''
      },
      list: {
        Server: {}
      },
      template: {},
      changeAble: true
    }
  },
  methods: {
    getplace (e) {
      this.formData.lng = e.lng
      this.formData.lat = e.lat
    },
    changePlace () {
      this.formData.lng = ''
      this.formData.lat = ''
    },
    changeSelect (info) {
      if (this.fullData.type || this.fullData.model) {

        this.$confirm(`您此操作的同时将清空机框面板信息`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.formData.type = null
          let a = {
            model: info,
            type: ''
          }

          this.$emit('changeMachine', {})

          this.$emit('changeType', a)
        }).catch(() => {
          this.formData.model = this.baseData.model
        });
      }


    },
    changeType (info) {
      if (this.fullData.type || this.fullData.model) {
        this.$confirm(`您此操作的同时将清空机框面板信息`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.formData.type = info
          this.$emit('changeMachine', {})
        }).catch(() => {
          this.formData.type = this.baseData.type
        });
      }

    },
    searchServer (info) {
      if (info) {
        this.search.Server = info
      }
      // /api/ldsysEquipments / search / findByNameLike
      this.$http.get("api/ldsysMachineRooms/search/findByNameLikeAndStationAndLevelAndservice", {
        params: {
          name: "%" + this.search.Server + "%",
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
      let sum = Object.values(newVal.machineFrameUseInfos)
      sum.map(item => {
        if (item.id) {
          this.changeAble = false
        }
      })
      this.formData = { ...newVal }
      this.baseData = { ...newVal }
    },
    'formData.type': {
      handler: function (newVal) {
        let a = {
          model: this.formData.model,
          type: newVal
        }
        this.$emit('changeType', a)
      },
      deep: true,
    },
    'formData.ldsysMachineRoom': {
      handler: function (newVal) {
        this.searchServer(newVal.name)
      },
      deep: true,
      immediate: true
    },
  },

}
</script>
<style scoped>
.outDoor {
  position: relative;
  right: 55px;
  margin-top: 20px;
  display: flex;
}
</style>