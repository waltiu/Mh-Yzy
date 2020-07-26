<template>
  <!--
    tabs: Array
    [
    {
      name: '啦啦啦',
      key: 'lalala'
    }
     ]
  -->
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t($pageUrl[type].name) + $t('OS.information')"
      @ok="$emit('ok')"
      @close="$emit('close')"
      :editTf="editTf"
    >
      <div v-loading="loading">
        <el-tabs v-model="activeName">
          <!-- 基础信息 -->
          <el-tab-pane :label="$t('main.basicInformation')" name="baseInfo">
            <slot name="baseInfo">
              <show-table-info :type="type" :table="columns" :info="fullData"></show-table-info>
              <slot name="baseInfoAttach"></slot>
            </slot>
          </el-tab-pane>

          <el-tab-pane
            v-for="(val, index) in tabs"
            :key="index"
            :label="$t(val.name)"
            :name="val.key"
          >
            <slot :name="val.key"></slot>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>

export default {
  name: 'baseInfoAlertPage',
  props: {
    defaultActiveName: {
      type: String,
      default: 'baseInfo'
    },
    tabs: Array,
    type: String,
    columns: Array, // 表格表头
    selectArrayShow: Object, // 要展示的数据
    editTf: {
      default: false,
      type: Boolean
    }
  },
  components: {
  },
  data () {
    return {
      loading: true,
      fullData: {},
      activeName: this.defaultActiveName
    }
  },
  watch: {
    selectArrayShow: {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      }
    }
  }
}
</script>
