<template>
  <div>
    <div v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="基础信息查看" name="first">
          <public-content
            style="width:100%"
            :bus="bus"
            :column="tableColumn"
            :fullData="fullData"
          ></public-content>
        </el-tab-pane>

        <el-tab-pane label="业务" name="sec">
          <ldsys-jump-fibers-table :bus="bus"></ldsys-jump-fibers-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
import { column } from "../index.js";
import ldsysJumpFibersTable from '../public/ldsysJumpFibers/table'
import {gmtPick} from '@/_command/data'
export default {
  name: 'ContentInfo',
  props: {
    bus: Object,
    info: Object
  },
  components: {
    ldsysJumpFibersTable
  },
  data () {
    return {
      loading: false,
      fullData: {}
    }
  },
  watch: {
    bus: {
      immediate: true,
      handler: function () {
        this.bindEvent()
      }
    }
  },
  computed: {
    tableColumn: function () {
      return Object.values(column)
        .filter(item => item.read && item.read.display)
        .filter(item => item.read.display())
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.read
          };
        });
    }
  },
  methods: {
    bindEvent () {

      const { read, setFull } = this.bus

      this.loading = true
      read(this.info.id)
        .then(res => res.data)
        .then(setFull)
        .then(() => this.loading = false)

      this.bus.on('FullChange', (res) => {
        // 构造新的审计对象
        this.fullData = gmtPick(res)
      })

    }
  }
}
</script>