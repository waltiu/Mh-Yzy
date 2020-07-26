<template>
  <div style="display: flex;">
    <!-- 业务搜索 -->
    <div class="diffRoute" style="width: 60%;">
      <div class="leftBorder-font" style="margin-bottom: 10px;">
        <div class="leftBorder-custom"></div>
        <p>{{$t('diffRoute.businessSearch')}}:</p>
      </div>

      <start-business :diffRoute="true" :diffRouteTable="table">
        <div slot="table" slot-scope="rowData">
          <!-- {{rowData.tableData}} -->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{$t('diffRoute.searchResult')}}</span>
            </div>

            <transition-group name="custom-classes-transition" enter-active-class="animated fadeIn">
              <div
                v-for="(item, index) in rowData.tableData"
                :key="index + 'table'"
                style="margin-bottom: 5px;"
              >
                <el-card class="box-card" v-if="item">
                  <div style="display:flex;justify-content:space-between">
                    <div style="display: flex;">
                      <i
                        class="el-icon-info"
                        style="margin: 2px 2px 2px 2px; color: #409EFF; font-size: 20px;"
                        type="primary"
                        @click="$alertInfo(item, 'business')"
                      ></i>
                      <p>{{ item.name }}</p>
                    </div>

                    <div style="float: right;">
                      <el-button
                        type="primary"
                        size="mini"
                        @click="addDiff(item)"
                      >{{$t('lightRoad.addContrast')}}</el-button>
                    </div>
                  </div>
                </el-card>
              </div>
            </transition-group>
          </el-card>
        </div>
      </start-business>
    </div>

    <!-- 待比较业务 -->
    <div class="diffRoute" style="width: 35%; margin-left: 40px;">
      <div class="leftBorder-font">
        <transition name="el-fade-in-linear">
          <el-button
            size="large"
            :loading="$store.state.diffRoute.diffLoading"
            @click="startDiff"
            v-if="!_.isEmpty($store.state.diffRoute.diffRouteList)"
            style="margin-top: -10px;margin-left:10px"
            type="primary"
          >
            <span v-if="!$store.state.diffRoute.diffLoading">{{$t('main.startComparison')}}</span>
            <span v-else>{{$t('main.analyzing')}}...</span>
          </el-button>
        </transition>
      </div>

      <center style="margin-top: 50px;" v-if="_.isEmpty($store.state.diffRoute.diffRouteList)">
        <md-chip>{{$t('main.chooseBusiness')}}</md-chip>
      </center>

      <target-business></target-business>
    </div>

    <diff-path :diffInfo="diffInfo"></diff-path>
  </div>
</template>

<script>
import startBusiness from '@/manage/business/business'
import targetBusiness from './targetBusiness'
import diffPath from './diffPath'

export default {
  name: 'diffRoute',
  components: {
    startBusiness, targetBusiness, diffPath
  },
  data () {
    return {
      diffInfo: [],
      table: {
        title: 'tableSearch.operation',
        tableDisplay: true,
        editDisplay: false,
        align: 'left',
        render: (h, params) =>
          <div>
            <el-button type="primary" style="margin-right:5px" size="mini"
              onClick={() => { this.addDiff(params) }}>加入对比</el-button>
          </div>
      }
    }
  },
  methods: {
    addDiff (args) {
      var list = this.$store.state.diffRoute.diffRouteList
      if (!this._.isEmpty(list) && list[list.length - 1].length === 1) {
        this.$store.commit('pushDiffListSingle', args)
      } else {
        this.$http.get('/api/ldsysOpticaleCableWorks/findTwoWayByOneCode', {
          params: { id: args.id }
        }).then(res => {
          if (res.data && res.data.length === 2) {
            this.$message({
              message: this.$i18n.t('alert.match'), // 已匹配到工作和保护业务
              type: 'warning'
            })
          }
          this.$store.commit('pushDiffList', res.data)
        })
      }
    },
    startDiff () {
      // 设置状态
      this.$store.commit('setDiffRouteStatus', {
        key: 'diffLoading',
        val: true
      })
      var startTime = new Date()
      // 检出数据, 纯ID
      var info = this.$store.state.diffRoute.diffRouteList
      var tmp = []
      for (const iterator of info) {
        tmp.push([
          iterator[0].id,
          iterator[1].id
        ])
      }
      this.$http.post('/api/ldsysOpticaleCableWorks/compareOcWork', tmp)
        .then(res => {
          var endTime = new Date()
          this.$store.commit('setDiffRouteStatus', {
            key: 'diffTime',
            val: (endTime.getTime() - startTime.getTime()) / 1000
          })
          this.diffInfo = res.data
          this.$store.commit('setDiffRouteStatus', {
            key: 'diffLoading',
            val: false
          })
        })
    }
  }
}
</script>
