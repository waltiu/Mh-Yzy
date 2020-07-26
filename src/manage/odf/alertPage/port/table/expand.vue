<template>
  <div>
    <el-table :data="getData.children">
      <el-table-column
        v-for="item  in tableConfig"
        :key="item.key"
        :prop="item.key"
        :width="item.width"
      >
      <!-- <template v-if="!item.type" slot-scope="scope" >
        {{scope.row.stateName}}
      </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { config } from './config'
export default {
  name: 'expand',
  props: {
    getData: Object
  },
  data () {
    return {
      tableData: ""
    }
  },
  computed: {
    tableConfig: function () {
      return Object.values(config)
        .map(item => {
          return {
            ...item
          }
        })
    }
  },
  watch: {
    tableData: function (newVAL) {
      return newVAL
    }
  },
  mounted () {
    this.tableData = this.getData.children
  }

}
</script>

<style>
</style>