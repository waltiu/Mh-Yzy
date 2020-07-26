<template>
  <div>
    <div
      v-show="loading"
      style="padding-top: 100px; padding-bottom: 250px;z-index: 100"
      v-loading="loading"
    ></div>
    <transition name="el-fade-in-linear">
      <div v-show="!loading" style="z-index: 90">
        <el-table
          :stripe="true"
          :data="tableData"
          :highlight-current-row="true"
          :empty-text="$t('main.empty')"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="columns[0].type === 'selection'" type="selection" width="30"></el-table-column>

          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.key"
            :label="$t(item.title)"
            :width="item.width"
            :align="item.align"
          >
            <div slot-scope="scope">
              <render-element :renderObject="computedRender(item)" :info="scope"></render-element>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </transition>
  </div>
</template>

<script>
import renderElement from '@/public/render/index.vue'
import _ from 'lodash'

export default {
  name: 'tableComponents',
  mixins: [renderElement],
  components: {
    renderElement
  },
  props: {
    load: Promise,
    columns: Array,
  },
  data () {
    return {
      loading: true,
      tableData: []
    }
  },
  watch: {
    load: {
      immediate: true,
      handler: function () {
        this.loading = true
        this.load
          .then(res => { this.tableData = res })
          .catch(this.$message.error)
          .finally(() => { this.loading = false })
      }
    }
  },
  methods: {

    computedRender (item) {
      if (!(item.render && _.isFunction(item.render))) {
        item = {
          ...item,
          render: (h, params) => {
            return h('div', params.row[item.key])
          }
        }
      }
      return item
    },
    handleSelectionChange (list) {
      this.$emit('on-selection-change', list)
      this.$store.commit('getSelection', list)
    }
  }
}
</script>