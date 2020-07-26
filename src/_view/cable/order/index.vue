<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="纤芯动态管理" name="index" :key="'index'">
        <public-event-table-title :bus="tableBus" :column="columnComplex">
          <template v-slot:button-left>
            <create-info v-if="auth('c')" :bus="tableBus"></create-info>
          </template>
        </public-event-table-title>

        <middle-event-table-view v-if="auth('r')" :bus="tableBus" :column="columnComplex"></middle-event-table-view>
        <public-event-paging
          v-if="auth('r')"
          :bus="tableBus"
          style="display: flex; justify-content: flex-end; margin-top: 20px;"
        ></public-event-paging>
      </el-tab-pane>
      <el-tab-pane label="工程统计">
        <order-statistics></order-statistics>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { TableBus } from './lib/tablebus';
import { column } from './index.js';

import read from './read/index.vue'
import CreateInfo from './create/index'
import { auth } from '@/_command/excelPermissions.js'
import orderStatistics from './orderStatistics'

export default {
  name: 'CableOrder',
  data () {
    return {
      table: [],
      activeName: 'index'
    }
  },
  components: {
    CreateInfo,
    orderStatistics
  },
  computed: {
    tableBus: function () {
      return new TableBus()
    },
    columnComplex: function () {
      return { ...column, "incall-options": this.options() }
    }
  },
  methods: {
    auth: (key) => auth(`xxgdgl.${key}`),
    options () {
      return {
        title: this.$t("subdistricts.operating"),
        key: "incall-options",
        table: {
          display: () => true,
          render: (h, params) =>
            h(
              "div",
              {
                style: "display: flex;"
              },
              [
                this.auth('r') ?
                  h(read, {
                    props: {
                      bus: this.tableBus,
                      info: params.row
                    }
                  }) : '',
                this.auth('d') ?
                  h("public-event-delete-button", {
                    props: {
                      bus: this.tableBus,
                      info: params.row
                    }
                  })
                  : '',
              ]
            )
        }
      };
    }
  },
  mounted () {
    this.tableBus.search()
  }
}
</script>