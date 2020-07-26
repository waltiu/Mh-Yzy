<template>
  <div style="margin-top: 10px; margin-left: 15px;">
    <el-card>
      <!-- 点列表 -->
      <!-- <h4>{{$t('tableSearch.pointList')}}:</h4> -->
      <h4>操作列表</h4>
      <el-alert
        style="margin: 10px;"
        :closable="false"
        :title="$t('tableSearch.edit')"
        type="warning"
      ></el-alert>

      <!-- <div style="padding: 10px;" v-if="!geo || !String(geo)">{{$t('tableSearch.noData')}}</div> -->

      <!-- <SlickList axis="y" v-model="list" :useDragHandle="true">
        <SlickItem
          v-for="(item, index) in geo"
          :key="index"
          :index="index"
          style="z-index: 10000;margin: 10px; border: 2px solid #C0C0C0; padding: 10px;border-radius:8px;"
        >
          <div>
            <i v-handle class="el-icon-menu" style="margin-right: 5px;"></i>
            <br>
            {{$t('tableSearch.longitude')}}：{{ item[0] }}
            <br>
            {{$t('tableSearch.latitude')}}：{{ item[1] }}
            <i style="float: right" @click="del(index)" class="el-icon-delete"></i>
          </div>
        </SlickItem>
      </SlickList>-->

      <h5 style="display: contents">&nbsp;&nbsp;&nbsp;邻接模式</h5>&nbsp;
      <el-switch v-model="stateForDifference" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      <el-row>
        &nbsp;&nbsp;
        <el-button size="medium" :disabled="stationForDraw" @click="draw">绘制</el-button>
        <el-button size="medium" :disabled="stationForRedoAndUndo" @click="undo">撤销</el-button>
        <el-button size="medium" :disabled="stationForRedoAndUndo" @click="redo">重做</el-button>
        <el-button size="medium" :disabled="stationForFinish" @click="finish(stateForDifference)">完成</el-button>
        <!-- <el-button size="medium" :disabled="stationForFinish" @click="finish(stateForDifference)">邻接完成</el-button> -->
        <el-button size="medium" :disabled="stationForEdit" @click="edit">编辑</el-button>
        <el-button size="medium" :disabled="StationForClear" @click="clear">清除</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import { HandleDirective } from 'vue-slicksort'
// import { GeoTool } from '@/_public/map/class/GeoTool.js'


export default {
  directives: { handle: HandleDirective },
  name: 'addCard',
  components: {
    // SlickItem,
    // SlickList
  },
  props: {
    mapDom: Object,
    geoTool: Object
  },
  data () {
    return {
      geo: [],
      stationForDraw: false,
      stationForRedoAndUndo: true,
      stationForFinish: true,
      stationForEdit: true,
      StationForClear: true,
      stateForDifference: true,
    }
  },
  computed: {
    list: {
      get: function () {
        return this.geo
      },
      set: function (newVal) {
        // this.mapDom.setGeo(newVal)
        this.geoTool.setGeo(newVal)
      }
    },
    // cancelClear () {
    //   return this.$store.state.infoMapShow.buttonStatus['geoFences']
    // }
  },
  methods: {
    // del (index) {
    //   this.map
    //   Dom.del(index)
    // }

    draw () {
      this.geoTool.drawBegin()
      this.stationForRedoAndUndo = this.stationForFinish = false
      this.stationForEdit = this.StationForClear = true
    },
    redo () {
      this.geoTool.redo()
    },
    undo () {
      this.geoTool.undo()
    },
    finish (station) {
      this.geoTool.finish(station)
      this.stationForEdit = this.StationForClear = false
      this.stationForDraw = this.stationForRedoAndUndo = true
    },
    edit () {
      this.geoTool.edit()
      this.stationForFinish = false
      this.stationForDraw = true
      this.StationForClear = true
      // this.stateForDifference = false
    },
    clear () {
      this.geoTool.clear()
      this.stationForDraw = false
      this.stationForRedoAndUndo = true
      this.stationForFinish = true
      this.stationForEdit = true
    }

  },
  // watch: {
  //   stateForDifference: function () {
  //     // this.$store.commit('setButtonStatus', { ['diffeState']: this.stateForDifference })
  //     if (this.stateForDifference)
  //       // this.stationForDraw = false
  //       3
  //   },
  // StationForClear: function () {
  //   if (this.cancelClear)
  //     this.StationForClear = true
  // }

  // },
  // created () {
  //   this.toolReady()
  // },
  mounted () {
    this.$nextTick(() => {
      // this.toolReady()
      // this.mapDom.on('change', (item) => {
      //   this.geo = item

      //   if (this.geo.length) {
      //     // this.stationForEdit = false
      //     // this.stationForDraw = true
      //     if (this.stateForDifference)
      //       // this.stationForDraw = false
      //       1
      //   }
      // })

      this.geoTool.on('change', (item) => {
        this.geo = item

        if (this.geo.length) {
          this.stationForEdit = false
          this.stationForDraw = true
          // this.stateForDifference = false
        }
      })

      this.geoTool.onContextmenu('contextmenu', () => {
        this.finish(this.stateForDifference)
      })

    })
  }
}
</script>
