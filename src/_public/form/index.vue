<template>
  <div>
    <el-form v-bind="$attrs" :style="tableHeader" @submit.native.prevent>
      <el-form-item
        v-for="(item, index) in column"
        :key="index"
        :label="`${$t(item.title)}:`"
        :style="tableItem"
      >
        <slot :name="`${item.key}-full`">
          <slot :name="`${item.key}-header`"></slot>

          <slot :name="`${item.key}-body`">
            <!-- 渲染器 -->
            <public-render
              v-if="item.render"
              :renderObject="item.render"
              :value="formData[item.key]"
              @bindData="(info) => { bindData(info, item.key) }"
              :functions="{ bindData }"
            ></public-render>
          </slot>

          <slot :name="`${item.key}-tail`"></slot>
        </slot>
      </el-form-item>
    </el-form>

    <slot name="addone" :methods="{resetForm, bindData}"></slot>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'FormEngine',
  props: {
    column: Array,
    fullData: Object,
    formstyle: String,
    tableItem: Object,
    tableHeader: Object

  },
  data () {
    return {
      baseFormData: {},
      changeData: {}
    }
  },
  watch: {
    fullData: function (newVal) {
      this.baseFormData = newVal
    }
  },
  computed: {
    formData: function () {
      if (!_.isEmpty(this.baseFormData)) {
        return this.baseFormData
      } else {
        // 初始化
        return this.column.reduce((res, val) => {
          res[val.key] = null
          return res
        }, {})
      }
    }
  },
  methods: {
    bindData (info, key) {
      this.changeData[key] = info
      this.$set(this.baseFormData, key, info)

      // 更新的form
      this.$emit('changeData', this.fullData && this.fullData.id ? { ...this.changeData, id: this.fullData.id } : this.changeData)
      // 单独修改事件
      this.$emit('change', key, info)
      // 传递fulldata
      this.$emit('allData', this.baseFormData)
    },
    resetForm () {
      this.baseFormData = {}
    },
  },
  mounted () {
  },
}
</script>
