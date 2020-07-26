<template>
  <!-- 渲染组件 jumperInfo 信息 -->
  <div style="display: block;margin-bottom:50px">
    <div>
      <!-- 开始 -->
      <div :style="{
        width: '100%',
        float: 'left',
        ...preData
      }">
        <show-start-and-end
          @end="getEnd"
          :edit="edit"
          @returnData="(args) => {bindData({'start': args})}"
          :type="start.type ? typeInfo.start[start.type] : {}"
          :position="'start'"
          :info="start"
          :cran="cranStart"
        ></show-start-and-end>
      </div>

      <!-- NODE -->
      <!-- node 存在数据 -->
      <div v-show="!_.isEmpty(node)">
        <show-node
          :edit="edit"
          @returnData="(args) => {bindData(args)}"
          :info="node"
          :fullData="fullData"
          :typeInfo="typeInfo"
        ></show-node>
      </div>

      <!-- 结束 -->
      <div
        :style="{
        'margin-top': '10px',
        float: 'left',
        width: '100%',
        ...preData
      }"
      >
        <end
          @end="getEnd"
          :edit="edit"
          @returnData="(args) => {bindData({'end': args})}"
          :type="end.type ? typeInfo.end[end.type] :{}"
          :position="'end'"
          :info="end"
          :cran="cranEnd"
        ></end>
      </div>
    </div>
  </div>
</template>

<script>
import showNode from './node'
import showStartAndEnd from './startAndEnd'
import end from './end'
import jumperInfoType from './jumperInfoType.js'

export default {
  name: 'jumpPic',
  props: {
    edit: {
      default: true,
      type: Boolean
    },
    info: Object
  },
  components: {
    showStartAndEnd,
    showNode,
    end
  },
  data () {
    return {
      fullData: {},
      start: {},
      node: [],
      end: {},
      cranEnd: {},
      cranStart: {},
      jumpInfo: {}
    }
  },
  watch: {
    info: {
      handler: function (newVal) {
        this.fullData = (newVal) || {}
      },
      deep: true
    },
    fullData: {
      handler: function (newVal) {
        this.jumpInfo = newVal.jumperInfo
        this.start = this.jumpInfo.start || {}
        this.node = this.jumpInfo.node || []
        this.end = this.jumpInfo.end || {}
        this.$emit('returnData', { 'jumperInfo': newVal.jumperInfo })
      },
      deep: true
    }
  },
  computed: {
    typeInfo: () => jumperInfoType.jumperInfoType,
    preData: function () {
      if (this.node.length === 2) {
        return {
          'margin-top': '40px'
        }
      } else {
        return {
          'margin-top': '0px'
        }
      }
    }
  },
  methods: {
    getEnd (info) {
      if (info.play === 'start') {
        this.cranEnd = info
      } else {
        this.cranStart = info
      }
    },
    bindData (a) {
      this.fullData = { ...this.fullData, 'jumperInfo': { ...this.fullData.jumperInfo, ...a } }
    }


  }
}
</script>
