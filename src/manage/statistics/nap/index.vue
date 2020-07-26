<template>
  <div class="cao">
    <!--<el-table-->
      <!--style="height: 30px;"-->
      <!--:show-header="false"-->
      <!--:row-style="rowStyle"-->
      <!--:data="allCount">-->
      <!--<el-table-column-->
        <!--width="348%"-->
        <!--prop="name">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--width="195%"-->
        <!--prop="number">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--width="190%"-->
        <!--prop="QRCodeBindRate">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--width="180%"-->
        <!--prop="numberOfBindQRCode">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--width="188%"-->
        <!--prop="outNumber">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--width="188%"-->
        <!--prop="useNumber">-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
        <!--width="188%"-->
        <!--prop="numberOfNoUse">-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
        <!--prop="portUseRate">-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  <el-table
    v-loading="loading"
    :row-style="rowStyle2"
    :data="tableData"
    >
    <!--<div>第一级表头</div>-->
    <el-table-column type="expand">
      <template slot-scope="props">
        <!--<div v-for="(v,k) in props.row.city" style="margin-left: 9%">{{k}}</div>-->
        <!--<div>第二级表</div>-->
        <el-table
          :row-style="rowStyle3"
          class="table2"
          :show-header="false"
          :data="props.row.city"
          >
          <el-table-column type="expand">
            <template slot-scope="props1">
              <!--<div>第三级表</div>-->
              <el-table
                :row-style="rowStyle4"
                class="table3"
                :show-header="false"
                :data="props1.row.country"
                >
                <el-table-column type="expand">
                  <template >
                  </template>
                </el-table-column>
                <el-table-column
                  class="c1"
                  align="center"
                  prop="name">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="NAP数量"
                  prop="number">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="二维码绑定数量"
                  prop="QRCodeBindRate">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="二维码绑定率"
                  prop="numberOfBindQRCode">
                </el-table-column>
                <el-table-column
                  label="OUT端口总量"
                  align="center"
                  prop="outNumber">
                </el-table-column>
                <el-table-column
                  label="OUT端口占用量"
                  align="center"
                  prop="useNumber">
                </el-table-column>

                <el-table-column
                  label="OUT端口空闲量"
                  align="center"
                  prop="numberOfNoUse">
                </el-table-column>

                <el-table-column
                  label="OUT端口占用率"
                  align="center"
                  prop="portUseRate">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="NAP数量"
            align="center"
            prop="number">
          </el-table-column>
          <el-table-column
            label="二维码绑定数量"
            align="center"
            prop="QRCodeBindRate">
          </el-table-column>
          <el-table-column
            label="二维码绑定率"
            align="center"
            prop="numberOfBindQRCode">
          </el-table-column>
          <el-table-column
            label="OUT端口总量"
            align="center"
            prop="outNumber">
          </el-table-column>
          <el-table-column
            label="OUT端口占用量"
            align="center"
            prop="useNumber">
          </el-table-column>

          <el-table-column
            label="OUT端口空闲量"
            align="center"
            prop="numberOfNoUse">
          </el-table-column>

          <el-table-column
            align="center"
            label="OUT端口占用率"
            prop="portUseRate">
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      :label="$t('opticalSplitter.districtName')"
      prop="name">
    </el-table-column>
    <el-table-column
      align="center"
      :label="$t('opticalSplitter.NapNumber')"
      prop="number">
    </el-table-column>
    <el-table-column
      align="center"
      :label="$t('opticalSplitter.QRCodeBindRate')"
      prop="QRCodeBindRate">
    </el-table-column>
    <el-table-column
      :label="$t('opticalSplitter.numberOfBindQRCode')"
      align="center"
      prop="numberOfBindQRCode">
    </el-table-column>
    <el-table-column
      align="center"
      :label="$t('opticalSplitter.outNumber')"
      prop="outNumber">
    </el-table-column>
    <el-table-column
      align="center"
      :label="$t('opticalSplitter.useNumber')"
      prop="useNumber">
    </el-table-column>

    <el-table-column
      align="center"
      :label="$t('opticalSplitter.numberOfNoUse')"
      prop="numberOfNoUse">
    </el-table-column>

    <el-table-column
      align="center"
      :label="$t('opticalSplitter.OutportOccupancyRate')"
      prop="portUseRate">
    </el-table-column>
  </el-table>

  </div>
</template>

<style>
 .cao .el-table__expanded-cell[class*=cell] {
    padding: 0px 0px;
  }
.cao  .el-table td, .el-table th {
     padding: 0px 0;
  }
/*.el-table__expanded-cell {*/
  /*background-color: #fff8da;*/
/*}*/
/*.table2 .el-table__body-wrapper{*/
  /*margin-right: -10px; margin-bottom: -10px;*/
/*}*/
/*.table3 .cell{*/
  /*width: 80%;padding-left: 60px;*/
/*}*/
</style>

<script>
  export default {
    data () {
      return {
        loading: false,
        allCount: [], // 全国合计
        showHead: Boolean,
        rowStyle: {
          backgroundColor: '#e9e9e9'
        },
        rowStyle2: {
          backgroundColor: '#c9ebfd'
        },
        rowStyle3: {
          backgroundColor: '#ffcfc3'
        },
        rowStyle4: {
          backgroundColor: ''
        },
        tableData: [{}],
        tableChild: [{}]
      }
    },
    mounted () {
      this.getAll()
    },
    methods: {
      getAll: async function () {
        this.loading = true
        this.allCount = []
        let res = await this.$http.get('/api/ldsysCount/getOSCountByPCC')
        this.tableData = res.data
        let ret = this.tableData.find(n => n.name === '全国合计') // 取出全国合计
        let ret2 = this.tableData.find(n => n.name === '未设置') // 取出未设置
        let a = this.tableData.filter(n => n.name !== '全国合计') // 取出全国合计后的所有数据
        a = a.filter(n => n.name !== '未设置')
        let b = a.map(function (obj) {
          obj.portUseRate = (obj.portUseRate * 100).toFixed(2) + '%' // 占用率
          obj.QRCodeBindRate = (obj.QRCodeBindRate * 100).toFixed(2) + '%' // 绑定率
          let c = obj.city.map(function (obj2) {
            obj2.portUseRate = (obj2.portUseRate * 100).toFixed(2) + '%' // 占用率
            obj2.QRCodeBindRate = (obj2.QRCodeBindRate * 100).toFixed(2) + '%' // 绑定率
            let d = obj2.country.map(function (obj3) {
              obj3.portUseRate = (obj3.portUseRate * 100).toFixed(2) + '%' // 占用率
              obj3.QRCodeBindRate = (obj3.QRCodeBindRate * 100).toFixed(2) + '%' // 绑定率
              return obj3
            })
            obj2.country = d
            return obj2
          })
          obj.city = c
          return obj
        })// 将占用率变为百分比显示
        ret.portUseRate = (ret.portUseRate * 100).toFixed(2) + '%' // 占用率
        ret.QRCodeBindRate = (ret.QRCodeBindRate * 100).toFixed(2) + '%' // 绑定率
        ret.name = this.$t('opticalSplitter.NationalTotal')
        ret2.portUseRate = (ret2.portUseRate * 100).toFixed(2) + '%' // 占用率
        ret2.QRCodeBindRate = (ret2.QRCodeBindRate * 100).toFixed(2) + '%' // 绑定率
        ret2.name = this.$t('opticalSplitter.areaNotSet')
        this.tableData = b
        this.tableData.unshift(ret2)
        this.tableData.unshift(ret)
        this.allCount.push(ret)
        this.loading = false
      }
    }
  }
</script>
