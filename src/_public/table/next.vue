<template>
  <div style="margin-top: 10px;">
    <div v-loading="loading">
      <el-table v-on="$listeners" :data="tableData" stripe>
        <el-table-column
          v-for="(item, index) in displayColumn"
          :key="index"
          :label="$t(item.title)"
          v-bind="item.config || {}"
        >
          <template v-slot="scope">
            <public-render :info="scope" :fullData="tableData" :renderObject="computedRender(item)"></public-render>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { checkOutData } from '@/_command/tools'

export default {
  name: 'TableView',
  props: {
    request: Object,
    column: Object
  },
  data () {
    return {
      loading: false,
      tableData: [],
      computedData: []
    }
  },
  computed: {
    // 接受两个参数, tableData[item,key], tableData 当数据在ready时候可用
    displayColumn: function () {
      return Object.values(this.column)
        .filter(item => item.table && 'display' in item.table)
        .filter(item =>
          item.table.display(this.tableData[item.key], this.tableData)
        )
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.table
          }
        })
    }
  },
  watch: {
    request: {
      immediate: true,
      handler: function () {
        this.bindEvents()
      },
      deep: true
    },
    computedData: function (newVal) {
      this.tableData = newVal.map(item => {
        return {
          ...item, ...{ portUseRate: `${(item.portUseRate * 100).toFixed(2)}%` }
        }
      })
    }
  },
  methods: {
    computedRender (item) {
      if (item && item.render) {
        return item.render
      } else {
        return (h, info) => h('div', info.row[item.key])
      }
    },
    bindEvents () {
      ['SearchStart', 'DeleteStart', 'CreatStart', 'UpdateStart'].forEach(name =>
        this.request.on(name, () => {
          this.loading = true
        })
      );

      this.request.on('SearchEnd', (data) => {
        this.loading = false
        this.tableData = checkOutData(data)
        this.computedData = this.tableData
      });

      ['DeleteEnd', 'CreatEnd', 'UpdateEnd'].forEach(name =>
        this.request.on(name, () => {
          this.request.search()
        })
      );
    }
  },
  mounted () {

    this.request.search()
  },
}
</script>
