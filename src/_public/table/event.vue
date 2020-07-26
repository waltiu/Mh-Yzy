<template>
  <div style="margin-top: 10px;">
    <div v-loading="loading">
      <el-table v-on="$listeners" :data="tableData">
        <el-table-column
          v-for="(item, index) in column"
          :key="index"
          :label="item.title"
          v-bind="item.config || {}"
        >
          <template v-slot="scope">
            <public-render :info="scope" :renderObject="computedRender(item)"></public-render>
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
    bus: Object,
    column: Array
  },
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  watch: {
    bus: {
      immediate: true,
      handler: function () {
        this.bindEvents()
      },
      deep: true
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
      this.bus
        .on('SearchStart', () => { this.loading = true })
        .on('SearchEnd', res => { this.tableData = checkOutData(res) })
        .on('SearchEnd', () => { this.loading = false })

        // 本地检索
        .on('LocalPage', res => this.tableData = res)
    }
  }
}
</script>
