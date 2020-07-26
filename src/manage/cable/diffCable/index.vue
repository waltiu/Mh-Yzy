<template>
  <div style="display: flex;" v-loading="loading">
    <div style="width: 50%;" @returnLength="getLength">
      <div class="leftBorder-font" style="margin-bottom: 10px;">
        <div class="leftBorder-custom"></div>
        <p>{{$t('lightRoad.opticalCableSearch')}}</p>
      </div>
      <cable-view :embed="true">
        <div
          slot="table"
          slot-scope="tableData"
          style="height: 60vh;overflow-y: auto;"
          class="unscrollbar"
        >
          <drag-table :title="$t('lightRoad.searchResult')" :info="tableData.tableData">
            <template v-slot="tip"></template>
          </drag-table>
        </div>
      </cable-view>
    </div>

    <div style="margin-left: 40px; width: 45%;">
      <div style="display: flow; flex-flow: row-reverse;">
        <el-button
          icon="el-icon-circle-plus"
          @click="add"
          style="margin-left: 10px;"
          type="primary"
        >{{$t('lightRoad.increaseGroup')}}</el-button>

        <el-button
          icon="el-icon-check"
          @click="startDiff"
          type="primary"
        >{{$t('lightRoad.startComparison')}}</el-button>

        <el-button
          icon="el-icon-view"
          @click="showCable"
          type="primary"
        >{{$t('lightRoad.showCable')}}</el-button>
      </div>

      <div style="height: 80vh;overflow-y: auto;" class="unscrollbar">
        <draggable group="zz">
          <div
            style="margin-top: 10px;"
            v-for="(item, index) in targetData"
            :key="index + item.name"
          >
            <drag-table
              :title="$t(item.name)"
              :info="targetData[index].list"
              @returnData="(ll) => { targetData[index].list = ll }"
            >
              <div slot="tip">
                <center v-if="!targetData[index].list.length">{{$t('lightRoad.dragElement')}}</center>
              </div>
              <div slot="header-button" style="display: flex;">
                <div style="margin-top: -20px;">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('lightRoad.chooseColor')"
                    placement="left"
                  >
                    <el-color-picker size="mini" style="margin-right: 10px;" v-model="item.color"></el-color-picker>
                  </el-tooltip>
                </div>

                <div>
                  <i
                    class="el-icon-edit-outline"
                    style="margin-right: 10px;"
                    @click="() => {eidt = {'info': {...item}, 'index': index}}"
                  ></i>
                  <i class="el-icon-close" @click="() => {$delete(targetData, index)}"></i>
                </div>
              </div>
            </drag-table>
          </div>
        </draggable>
      </div>
    </div>

    <!-- 编辑title -->
    <change-title-name
      :info="eidt.info || {}"
      @returnData="(a) => {$set(targetData, eidt.index, a)}"
    ></change-title-name>

    <diff-alert-page :info="diffInfo" :ajaxArgs="ajaxArgs" :baseInfo="targetData"></diff-alert-page>

    <watch-cable :displayInfo="displayInfo"></watch-cable>
  </div>
</template>

<script>
import watchCable from './watchCable'
import diffAlertPage from './diffAlertPage'
import cableView from '../cable'
import changeTitleName from './changeTitleName'
import draggable from 'vuedraggable'
import randomColor from 'randomcolor'

export default {
  name: 'diffCable',
  components: {
    draggable,
    cableView,
    diffAlertPage,
    changeTitleName,
    watchCable
  },
  data () {
    return {
      ajaxArgs: [],
      loading: false,
      eidt: {},
      targetData: [{ name: window.i18n.t('lightRoad.group1'), list: [], color: randomColor({ luminosity: 'dark' }) }],
      diffInfo: [],
      displayInfo: [],
      length: ""
    }
  },
  methods: {
    getLength (length) {
      this.length = length
    },
    showCable () {
      this.displayInfo = this.targetData.reduce((res, val) => {
        res = [...res, ...val.list.map(item => {
          return {
            ...item,
            maptalksColor: val.color
          }
        })]
        return res
      }, [])
    },
    add () {
      this.targetData.push(
        { name: this.$i18n.t('lightRoad.group') + (this.targetData.length + 1), list: [], color: randomColor({ luminosity: 'dark' }) }
      )
    },
    startDiff () {
      this.loading = true
      let tmp = this.targetData.map(a => {
        let list = a.list.map(b => {
          return {
            'ocId': b.id,
            'groupName': a.name
          }
        })
        return list
      })
      this.ajaxArgs = tmp
      this.$http.post('/api/ldsysOpticalCables/search/compare', {
        info: tmp
      }).then((result) => {
        this.loading = false
        this.diffInfo = result.data
      })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
