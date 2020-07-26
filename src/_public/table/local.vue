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

export default {
  name: 'TableView',
  props: {
    tableData: Array,
    column: Array
  },
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    computedRender (item) {
      if (item && item.render) {
        return item.render
      } else {
        return (h, info) => h('div', info.row[item.key])
      }
    }
  }
}
</script>
