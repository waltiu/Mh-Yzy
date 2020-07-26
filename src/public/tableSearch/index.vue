<template>
  <!-- 表格搜索组件 -->
  <el-card style="width: 100%; margin-bottom: 10px;">
    <!-- 从不显示 -->
    <div style="display: flex;flex-wrap:wrap; margin-bottom: 10px;">
      <!-- 渲染所有 -->
      <el-row type="flex" class="row-bg" style="flex-wrap: wrap;">
        <div v-for="(a, index) in computedConfig" :key="index">
          <!-- 一个div -->
          <el-col
            :span="40"
            style="width: 320px; margin-top: 10px;"
            v-if="!a.permission || $store.getters.getUserRole.includes(a.permission)"
          >
            <div style="display: flex; justify-content: flex-end;">
              <span
                style="font-size: 13px; margin-top: 4px; margin-right: 2px;white-space: nowrap"
              >{{ $t(a.title) + ':' }}</span>

              <el-form @submit.native.prevent>
                <div style="margin-right: 10px;">
                  <div v-if="!!a.enumerate">
                    <el-select
                      :placeholder="$t('infoMap.choice')"
                      size="mini"
                      v-model="formData[a.key]"
                      clearable
                      style="width: 200px;"
                    >
                      <el-option
                        v-for="(option, index_1) in $store.getters.getObjByType[a.enumerate]"
                        :value="option.code"
                        :label="option.name"
                        :key="index_1"
                      >{{option.name}}</el-option>
                    </el-select>
                  </div>

                  <div v-else-if="!!a.autoComplete">
                    <auto-complete-info
                      style="width: 200px;"
                      size="mini"
                      @returnData="(info) => {formData[a.key] = info.id}"
                      :placeholder="$t(a.title)"
                      :url="$autoCompentedUrl[a.autoComplete].url"
                      :preData="$autoCompentedUrl[a.autoComplete].args"
                    ></auto-complete-info>
                  </div>

                  <div v-else-if="!!a.list">
                    <el-select
                      clearable
                      :multiple="!!a.multiple"
                      :multiple-limit="a.multipleLimit || 0"
                      style="width: 100%;"
                      size="mini"
                      v-model="formData[a.key]"
                      filterable
                      :placeholder="$t('OS.select') + $t(a.title)"
                      value-key="id"
                    >
                      <el-option
                        v-for="(item, itemIndex) in (_.isFunction(a.list) ? a.list() : a.list)"
                        :key="itemIndex"
                        :label="_.isObject(item) ? item.name : item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </div>

                  <div v-else style="display: flex;">
                    <el-input
                      style="width: 200px;"
                      :placeholder="$t('tableSearch.pleaseInput')"
                      size="mini"
                      clearable
                      v-model="formData[a.key]"
                      @keyup.enter.native="search"
                    ></el-input>
                  </div>
                </div>
              </el-form>
            </div>
          </el-col>
          <!-- 结束 -->
        </div>

        <slot name="item"></slot>
      </el-row>
    </div>
    <div style="display: flex;justify-content: flex-end;">
      <div style="margin-right: 10px;">
        <slot></slot>
      </div>

      <el-button
        @click="reset"
        size="mini"
        type="primary"
        icon="el-icon-refresh"
      >{{$t('tableSearch.reset')}}</el-button>
      <el-button
        @click="search"
        size="mini"
        type="primary"
        icon="el-icon-search"
      >{{$t('tableSearch.query')}}</el-button>
      <!-- <el-button
        v-if="showExcel"
        @click="chooseDialog"
        size="mini"
        type="primary"
        icon="el-icon-download"
      >Excel导出</el-button>-->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="480px">
        <div
          v-for="(value, index) in this.typeList"
          :key="index"
          style="display: inline-block;margin-left: 6px"
        >
          <el-button @click="excelExport(value)" type="text">导出{{value}}坐标系文件</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'tableSearch',
  props: {
    config: {
      type: String,
      default: '$allConfig'
    },
    attachData: {
      type: Array
    },
    preSearchString: {
      default: '%',
      type: String
    },
    keys: String
  },
  data () {
    return {
      typeList: [
        'BD',
        'GCJ',
        'WGS'
      ],
      showExcel: true,
      dialogVisible: false,
      name: '',
      exportObj: [], // 查询条件
      exportId: [], // ID数组
      preData: {
        key: 'name',
        title: 'tableSearch.name'
      },
      formData: {
        name: ''
      }
    }
  },
  methods: {
    chooseDialog () {
      this.dialogVisible = true
    },
    excelExport (value) {
      // this.search()
      this.exportObj = {}
      this.exportId = []
      this.exportObj = this.$store.state.other.selection
      for (let i = 0; i < this.exportObj.length; i++) {
        this.exportId[i] = this.exportObj[i].id
      }
      let tempArr = []
      for (let i in this.exportSearch) {
        let key = encodeURIComponent(i)
        let result = this.exportSearch[key]
        if (result !== undefined) {
          encodeURIComponent(this.exportSearch[i])
          result = result.replace('%', '')
          result = result.replace('%', '')
        } else {
          result = ''
          result = result.replace('%', '')
          result = result.replace('%', '')
        }
        tempArr.push(key + '=' + result)
      }
      let urlParamsStr = tempArr.join('&')
      if (this.exportId.length > 0) {
        switch (this.keys) {
          case 'cable': // 光缆
            switch (value) {
              case 'BD':
                window.open('/api/ldsysOpticalCables/excelByIdArray?idArray=' + this.exportId + '&type=BD')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysOpticalCables/excelByIdArray?idArray=' + this.exportId + '&type=GCJ')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysOpticalCables/excelByIdArray?idArray=' + this.exportId + '&type=WGS')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'switchY': // 光交
            switch (value) {
              case 'BD':
                window.open('/api/ldsysOpticalCrossConnects/excelByIdArray?idArray=' + this.exportId + '&type=BD' + '&occType=1')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysOpticalCrossConnects/excelByIdArray?idArray=' + this.exportId + '&type=GCJ' + '&occType=1')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysOpticalCrossConnects/excelByIdArray?idArray=' + this.exportId + '&type=WGS' + '&occType=1')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'deviceRoom': // 机房
            switch (value) {
              case 'BD':
                window.open('/api/ldsysMachineRooms/excelByIdArray?idArray=' + this.exportId + '&type=BD')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysMachineRooms/excelByIdArray?idArray=' + this.exportId + '&type=GCJ')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysMachineRooms/excelByIdArray?idArray=' + this.exportId + '&type=WGS')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'station': // 局站
            switch (value) {
              case 'BD':
                window.open('/api/ldsysStations/excelByIdArray?idArray=' + this.exportId + '&type=BD')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysStations/excelByIdArray?idArray=' + this.exportId + '&type=GCJ')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysStations/excelByIdArray?idArray=' + this.exportId + '&type=WGS')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'device': // 网元
            switch (value) {
              case 'BD':
                window.open('/api/ldsysEquipments/excelByIdArray?idArray=' + this.exportId + '&type=BD')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysEquipments/excelByIdArray?idArray=' + this.exportId + '&type=GCJ')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysEquipments/excelByIdArray?idArray=' + this.exportId + '&type=WGS')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'odf': // odf
            switch (value) {
              case 'BD':
                window.open('/api/ldsysOpticalCrossConnects/excelByIdArray?idArray=' + this.exportId + '&type=BD' + '&occType=2')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysOpticalCrossConnects/excelByIdArray?idArray=' + this.exportId + '&type=GCJ' + '&occType=2')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysOpticalCrossConnects/excelByIdArray?idArray=' + this.exportId + '&type=WGS' + '&occType=2')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'well': // 井(点)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=BD' + '&pointType=1')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=GCJ' + '&pointType=1')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=WGS' + '&pointType=1')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'pole': // 杆(点)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=BD' + '&pointType=2')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=GCJ' + '&pointType=2')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=WGS' + '&pointType=2')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'support':// 撑点(点)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=BD' + '&pointType=9')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=GCJ' + '&pointType=9')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=WGS' + '&pointType=9')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'cited': // 引上(点)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=BD' + '&pointType=3')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=GCJ' + '&pointType=3')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysPoints/excelByIdArray?idArray=' + this.exportId + '&coordinatesType=WGS' + '&pointType=3')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'pipe':// 管道(线)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLines/excelByIdArray?idArray=' + this.exportId + '&lineType=1')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysLines/excelByIdArray?idArray=' + this.exportId + '&lineType=1')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysLines/excelByIdArray?idArray=' + this.exportId + '&lineType=1')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'poleRoad': // 杆路(线)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLines/excelByIdArray?idArray=' + this.exportId + '&lineType=2')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysLines/excelByIdArray?idArray=' + this.exportId + '&lineType=2')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysLines/excelByIdArray?idArray=' + this.exportId + '&lineType=2')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'pipeSection':// 管道段(线段)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=1')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=1')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=1')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'poleSection':// 杆路段(线段)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=2')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=2')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=2')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'citedSection':// 引入段(线段)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=3')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=3')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=3')
                // this.$store.commit('getSelection', [])
                break
            }
            break
          case 'supportSection':// 引入段(线段)
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=4')
                // this.$store.commit('getSelection', [])
                break
              case 'GCJ':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=4')
                // this.$store.commit('getSelection', [])
                break
              case 'WGS':
                window.open('/api/ldsysLineSections/excelByIdArray?idArray=' + this.exportId + '&lineSectionType=4')
                // this.$store.commit('getSelection', [])
                break
            }
            break
        }
      } else {
        switch (this.keys) {
          case 'cable':// 光缆
            switch (value) {
              case 'BD':
                window.open('/api/ldsysOpticalCables/excelByNameLikeAndLevel?' + urlParamsStr)
                break
              case 'GCJ':
                window.open('/api/ldsysOpticalCables/excelByNameLikeAndLevel?' + urlParamsStr)
                break
              case 'WGS':
                window.open('/api/ldsysOpticalCables/excelByNameLikeAndLevel?' + urlParamsStr)
                break
            }
            break
          case 'switchY':// 光交
            switch (value) {
              case 'BD':
                window.open('/api/ldsysOpticalCrossConnects/excelByNameLikeAndLevelAndService?' + urlParamsStr + '&type=BD' + '&occType=1')
                break
              case 'GCJ':
                window.open('/api/ldsysOpticalCrossConnects/excelByNameLikeAndLevelAndService?' + urlParamsStr + '&type=GCJ' + '&occType=1')
                break
              case 'WGS':
                window.open('/api/ldsysOpticalCrossConnects/excelByNameLikeAndLevelAndService?' + urlParamsStr + '&type=WGS' + '&occType=1')
                break
            }
            break
          case 'odf':// odf
            switch (value) {
              case 'BD':
                window.open('/api/ldsysOpticalCrossConnects/excelByNameLikeIgnoreCaseAndGmtTypeAndLdsysMachineRoomAndOcId?' + urlParamsStr + '&type=BD' + '&occType=2')
                break
              case 'GCJ':
                window.open('/api/ldsysOpticalCrossConnects/excelByNameLikeIgnoreCaseAndGmtTypeAndLdsysMachineRoomAndOcId?' + urlParamsStr + '&type=GCJ' + '&occType=2')
                break
              case 'WGS':
                window.open('/api/ldsysOpticalCrossConnects/excelByNameLikeIgnoreCaseAndGmtTypeAndLdsysMachineRoomAndOcId?' + urlParamsStr + '&type=WGS' + '&occType=2')
                break
            }
            break
          case 'device':// 网元
            switch (value) {
              case 'BD':
                window.open('/api/ldsysEquipments/excelByNameLike?' + urlParamsStr + '&type=BD')
                break
              case 'GCJ':
                window.open('/api/ldsysEquipments/excelByNameLike?' + urlParamsStr + '&type=GCJ')
                break
              case 'WGS':
                window.open('/api/ldsysEquipments/excelByNameLike?' + urlParamsStr + '&type=WGS')
                break
            }
            break
          case 'station':// 局站
            switch (value) {
              case 'BD':
                window.open('/api/ldsysStations/excelByNameLikeAndServiceArea?' + urlParamsStr + '&type=BD')
                break
              case 'GCJ':
                window.open('/api/ldsysStations/excelByNameLikeAndServiceArea?' + urlParamsStr + '&type=GCJ')
                break
              case 'WGS':
                window.open('/api/ldsysStations/excelByNameLikeAndServiceArea?' + urlParamsStr + '&type=WGS')
                break
            }
            break
          case 'deviceRoom':// 机房
            switch (value) {
              case 'BD':
                window.open('/api/ldsysMachineRooms/excelByNameLikeAndStationAndLevelAndservice?' + urlParamsStr + '&type=BD')
                break
              case 'GCJ':
                window.open('/api/ldsysMachineRooms/excelByNameLikeAndStationAndLevelAndservice?' + urlParamsStr + '&type=GCJ')
                break
              case 'WGS':
                window.open('/api/ldsysMachineRooms/excelByNameLikeAndStationAndLevelAndservice?' + urlParamsStr + '&type=WGS')
                break
            }
            break
          case 'well':// 井
            switch (value) {
              case 'BD':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=BD' + '&type=1')
                break
              case 'GCJ':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=GCJ' + '&type=1')
                break
              case 'WGS':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=WGS' + '&type=1')
                break
            }
            break
          case 'pole':// 电杆
            switch (value) {
              case 'BD':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=BD' + '&type=2')
                break
              case 'GCJ':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=GCJ' + '&type=2')
                break
              case 'WGS':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=WGS' + '&type=2')
                break
            }
            break
          case 'cited':// 引上
            switch (value) {
              case 'BD':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=BD' + '&type=3')
                break
              case 'GCJ':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=GCJ' + '&type=3')
                break
              case 'WGS':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=WGS' + '&type=3')
                break
            }
            break
          case 'support':// 撑点
            switch (value) {
              case 'BD':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=BD' + '&type=9')
                break
              case 'GCJ':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=GCJ' + '&type=9')
                break
              case 'WGS':
                window.open('/api/ldsysPoints/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&coordinatesType=WGS' + '&type=9')
                break
            }
            break
          case 'pipe':// 管道
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLines/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=1')
                break
              case 'GCJ':
                window.open('/api/ldsysLines/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=1')
                break
              case 'WGS':
                window.open('/api/ldsysLines/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=1')
                break
            }
            break
          case 'poleRoad':// 杆路
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLines/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=2')
                break
              case 'GCJ':
                window.open('/api/ldsysLines/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=2')
                break
              case 'WGS':
                window.open('/api/ldsysLines/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=2')
                break
            }
            break
          case 'pipeSection':// 管道段
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=1')
                break
              case 'GCJ':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=1')
                break
              case 'WGS':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=1')
                break
            }
            break
          case 'poleSection':// 杆路段
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=2')
                break
              case 'GCJ':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=2')
                break
              case 'WGS':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=2')
                break
            }
            break
          case 'citedSection':// 引入段
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=3')
                break
              case 'GCJ':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=3')
                break
              case 'WGS':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=3')
                break
            }
            break
          case 'supportSection':// 挂墙段
            switch (value) {
              case 'BD':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=4')
                break
              case 'GCJ':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=4')
                break
              case 'WGS':
                window.open('/api/ldsysLineSections/excelByNameLikeIgnoreCaseAndType?' + urlParamsStr + '&type=4')
                break
            }
            break
        }
      }
      this.dialogVisible = false
    },
    search () {
      let result = {}
      let tmp = {}
      for (const key of this.computedConfig) {
        tmp[key.key] = key
      }
      Object.entries(this.formData).forEach(([key, val]) => {
        if (!tmp[key].enumerate && !tmp[key].autoComplete && !tmp[key].filter) {
          let preSearchString = this.preSearchString
          if (this.$autoCompentedUrl[this.keys] && this.$autoCompentedUrl[this.keys].preSearchString !== undefined) {
            preSearchString = this.$autoCompentedUrl[this.keys].preSearchString
          }
          result[key] = preSearchString + val + preSearchString
        } else {
          result[key] = val
        }
      })
      this.$emit('returnSearch', { ...this.handlerFilter(result), page: 0 })
      this.exportSearch = this.handlerFilter(result)
    },
    reset () {
      Object.entries(this.formData).forEach(([key]) => {
        this.formData[key] = ''
      })
      this.search()
    },
    handlerFilter (result) {
      let tmp = this.computedConfig.reduce((res, val) => {
        try {
          res[val.key] = val.filter ? val.filter(result[val.key], result, res) : result[val.key]
        } catch (error) {
          res[val.key] = ''
        }
        return res
      }, {})
      return { ...result, ...tmp }
    }
  },
  computed: {
    computedConfig: function () {
      let tmp = []
      for (const iterator of this[this.config][this.keys]) {
        if (iterator.enumerate) {
          tmp.push(iterator)
        }
      }
      if (this.attachData) {
        return [this.preData, ...tmp, ...this.attachData]
      } else {
        return [this.preData, ...tmp]
      }
    }
  },
  mounted () {
    if (this.keys) {
      switch (this.keys) {
        case 'business': case 'opticalSplitter': case 'lightRoad':
          this.showExcel = false
          break
        default: this.showExcel = true
      }
    }
  }
}
</script>
