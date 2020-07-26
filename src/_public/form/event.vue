<template>
  <div>
    <el-form v-bind="$attrs" label-width="120px">
      <el-form-item
        v-for="(item, index) in column"
        :key="index"
        :label="`${item.title}:`"
        :style="item.style || {}"
      >
        <slot :name="`${item.key}-full`">
          <slot :name="`${item.key}-header`"></slot>

          <slot :name="`${item.key}-body`">
            <!-- 渲染器 -->
            <public-render
              v-if="item.render"
              :renderObject="item.render"
              :value="formData[item.key]"
              :full="formData"
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
    eventBus: Object,
  },
  data () {
    return {
      baseFormData: {},
      changeData: {}
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
      this.eventBus.setState(key, info)
    },
    resetForm () {
      this.baseFormData = {}
      this.eventBus.setFull(this.baseFormData)
    },
  },
  mounted () {
    this.baseFormData = this.eventBus.fullData || this.baseFormData
    this.eventBus
      .on('FullChange', res => this.baseFormData = res)
  },
}
</script>
