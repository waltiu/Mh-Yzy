<template>
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t($orderUrl[type].name) + $t('OS.information')"
      @close="$emit('close')"
    >
      <template v-loading="loading" v-slot="{method}">
        <el-tabs value="info">
          <el-tab-pane :label="$t('OS.basicInformation')" name="info">
            <!-- 基础信息 -->
            <show-table-info :type="type" :table="columns" :info="fullData">
              <div slot="view-map"></div>
              <template v-slot:item-state>
                <showStatus
                  :info="selectArrayShow"
                  @returnData="() => { method.close();$emit('close')  }"
                ></showStatus>
              </template>
            </show-table-info>
          </el-tab-pane>

          <el-tab-pane :label="$t('OS.historicalSubmission')" name="history">
            <table-and-paging
              :colums="[...historyCommitColumns, handler]"
              :tableData="fullData.opticalSplitterOrderCommitUnits ? fullData.opticalSplitterOrderCommitUnits.info : []"
            ></table-and-paging>
          </el-tab-pane>
        </el-tabs>
      </template>
    </dialog-page>

    <history-commit
      :info="selectForShow"
      :columns="historyCommitColumns"
      :messigSpecial="specialIndexNumber"
    ></history-commit>
  </div>
</template>

<script>
import historyCommit from './histortCommit'
import showStatus from '@/public/orderStatus'

export default {
  name: 'deviceAlertPage',
  props: {
    type: String,
    columns: Array, // 表格表头
    selectArrayShow: Object // 要展示的数据
  },
  components: {
    historyCommit,
    showStatus
  },
  data () {
    return {
      specialIndexNumber: [],
      selectForShow: {},
      historyCommitColumns: [
        {
          title: 'alert.opticalSplitterName',
          key: 'opticalSplitterName'
        },
        {
          title: 'alert.founder',
          key: 'userName'
        },
        {
          title: 'alert.creationTime',
          key: 'createDate'
        }
      ],
      handler: {
        title: 'tableSearch.operation',
        key: 'zz',
        render: (h, context) => {
          return [h('el-button', {
            props: {
              size: 'small',
              type: 'primary'
            },
            on: {
              click: () => {
                this.selectForShow = { ...context.row }
                this.specialIndexNumber = []
                const oldOutPortShow = this.selectForShow.oldOutPort
                const newOutPortShow = this.selectForShow.newOutPort
                const arryNewPortKey = Object.keys(newOutPortShow)
                for (let i = 0; i < arryNewPortKey.length; i++) {
                  if (JSON.stringify(oldOutPortShow[i]) !== JSON.stringify(newOutPortShow[i])) {
                    this.specialIndexNumber.push(i)
                  }
                }
              }
            }
          }, this.$i18n.t('alert.view')),
          h('el-button', {
            props: {
              size: 'small',
              type: 'primary'
            },
            on: {
              click: () => {
                this.checkOut(context)
              }
            }
          }, this.$i18n.t('alert.exportAsPDFFile'))
          ]
        }
      },
      loading: true,
      fullData: {}
    }
  },
  watch: {
    selectArrayShow: {
      immediate: true,
      handler: function (newVal) {
        // this.$getDepartmentsList(this.type)
        this.loading = true
        this.$getOrderFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      }
    }
  },
  methods: {
    checkOut (info) {
      window.open('/api/ldsysOpticalSplitterOrders/commitPdfDownload?orderId=' +
        this.selectArrayShow.id +
        '&commitIndex=' + info.index)
      // this.$http.post('/api/ldsysOpticalSplitterOrders/commitPdfDownload?orderId=' +
      //   this.selectArrayShow.id +
      //   '&commitIndex=' + info.index)
      //   .then((result) => {
      //     this.$downloadFile(result)
      //   })
    }
  }
}
</script>
