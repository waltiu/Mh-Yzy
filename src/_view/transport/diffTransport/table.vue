<template>
  <div>
    <public-table-title
      :request="request"
      :column="tableColumn"
      :args="searchInfo"
      @searchInfo="searchTable"
    ></public-table-title>
    <!-- <public-next-table-view :request="request" :column="tableColumn"></public-next-table-view> -->
    <div>
      <el-card>
        <div v-for="(item, index) in tableData" :key="index">
          <div style="height: 80px">
            {{ item.name }}
            <div style="display: flex; justify-content: flex-end;padding: 10px">
              <el-button
                size="mini"
                type="primary"
                @click="alertInfo(item)"
              >{{$t('alert.viewInfo')}}</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="addToPreview(item)"
              >{{$t('lightRoad.addContrast')}}</el-button>
            </div>
            <hr />
          </div>
        </div>
      </el-card>
    </div>

    <page
      :page="page"
      @pageInfo="pageInfo"
      style="display: flex; justify-content: flex-end; margin-top: 20px;"
    ></page>
    <public-alert-page-with-button :info="info" title="传输系统查看" :width="'90vw'" :top="'5vh'">
      <content-info :request="request" :info="info"></content-info>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import { http } from '@/_command/http'
import contentInfo from '../read/content'
import { ResourceApiLayer } from '@/_command/curd';
import { column } from '../index.js'
import page from './page'


export default {
  name: 'transPort',

  data () {
    return {
      searchInfo: {},
      tableData: {},
      info: {},
      page: {
        size: "10",
        page: "0"
      }
    }

  },
  components: {
    contentInfo,
    page
  },
  computed: {
    request: function () {
      return new ResourceApiLayer('transPort')
    },
    tableColumn: function () {
      return { ...column }
    }
  },
  methods: {
    alertInfo (info) {
      this.info = info
    },
    addToPreview (info) {
      this.$emit("addToPreview", info)
    },
    searchTable (info) {
      this.getTable(info)
    },
    pageInfo (info) {
      this.getTable(info)
    },
    getTable (info) {
      http.get(`api/ldsysTransferSystems/search/findPage`,
        {
          params: {
            ...info
          }
        }).then(res => {
          // console.log(res)
          this.tableData = res.data._embedded.ldsysTransferSystems
          this.page = res.data.page
        })
    }
  },
  mounted () {
    this.getTable()
  }
}
</script>
