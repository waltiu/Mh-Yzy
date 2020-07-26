<template>
  <div style="display: inline-flex;">
    <!-- info: NODE info -->
    <div v-for="(item, indexA) in info" :key="indexA">
      <div
        v-for="(a, indexB) in item"
        :key="indexB"
        style="display: block; float: left; width: 100%"
      >
        <!-- 点 -->
        <el-card
          shadow="never"
          :body-style="{'padding': '0px'}"
          style="margin-top: 5px;"
          v-if="typeInfo.node.type[a.type].type === 'point'"
        >
          <draw-point
            @returnData="(e) => {editPoint = {...e}; layer = indexA; index = indexB}"
            :info="a"
            :type="typeInfo.node.type[a.type]"
          ></draw-point>
        </el-card>
        <!-- 线 -->
        <div style=" display: flex;" v-if="typeInfo.node.type[a.type].type === 'line'">
          <!-- 增加 -->
          <div style="width: 10px;" v-show="edit">
            <i
              class="el-icon-circle-plus"
              style="font-size: 30px; margin-top: 6px;"
              @click="addPoint(indexA, indexB)"
            ></i>
          </div>

          <div style="margin-top: 5px; margin-left: 20px;">
            <draw-line
              @returnData="(e) => {editLine = {...e}; layer = indexA; index = indexB}"
              v-if="typeInfo.node.type[a.type].type === 'line'"
              :info="a"
              :num="fullData.coreNum === '双芯' ? 2 : 1"
            ></draw-line>
          </div>
        </div>
      </div>
    </div>

    <!--
        编辑点
      在这里开始弹框
    -->
    <edit-info-odf
      v-if="edit"
      @remove="remove"
      :info="editPoint"
      :fullData="fullData"
      @returnData="changePoint"
    ></edit-info-odf>
  </div>
</template>

<script>
// 绘制
import drawPoint from './drawPulblic/drawPoint'
import drawLine from './drawPulblic/drawLine'

// 编辑 ODF/光交
import editInfoOdf from './editDialog/odfAndSwicth'

// 增加点
import addPointTemplate from './jumperInfoType.js'

export default {
  name: 'lightRoadNode',
  props: {
    fullData: Object,
    info: Array,
    typeInfo: Object,
    edit: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      nodeData: {},
      editPoint: {},
      editLine: {},
      layer: '',
      index: ''
    }
  },
  computed: {
    pointTemplate: () => addPointTemplate.addNew
  },
  components: {
    drawLine,
    drawPoint,
    editInfoOdf
  },
  watch: {
    info: {
      handler: function (newVal) {
        this.nodeData = newVal
      }
    },
    nodeData: function (newVal) {
      this.$emit('returnData', { 'node': newVal })
    }
  },
  methods: {
    changePoint (a) {
      // 查询两侧光缆, 为fullData赋值.
      // 获取两端绑定的光缆
      // 跳纤忽略
      // 设置前一个光缆信息
      if (a.jumpType === 'inner') {
        // A端
        this.$api.get({
          url: '/api/ldsysOpticalCrossConnects/getOCFromPort',
          args: { occId: a.id, port: a.portA }
        }, (res) => {
          this.bindData({ id: res.data.ocId, name: res.data.ocName, type: '0' }, this.layer, this.index - 1)
        })
        // A跳线
        this.$api.get({
          url: '/api/ldsysOpticalCrossConnects/getOCFromPort',
          args: { occId: a.id, port: a.portAJump }
        }, (res) => {
          this.bindData({ id: res.data.ocId, name: res.data.ocName, type: '0' }, this.layer, this.index + 1)
        })
      }
      if (a.jumpType === 'room') {
        // 置空两端
        this.bindData({ id: '', name: '跳纤', type: '0' }, this.layer, this.index - 1)
        this.bindData({ id: '', name: '跳纤', type: '0' }, this.layer, this.index + 1)
        a = { ...a, 'portAJump': '', 'portBJump': '' }
        // 置空单独
      }
      this.bindData(a)
    },
    bindData (args, layer = this.layer, index = this.index) {
      let tmpLayer = [...this.nodeData[layer]]
      this.$set(tmpLayer, index, args)
      this.$set(this.nodeData, layer, tmpLayer)
    },
    remove () {
      this.$delete(this.nodeData[this.layer], this.index + 1)
      this.$delete(this.nodeData[this.layer], this.index)
      // this.editPoint = {}
    },
    addPoint (layer, index) {
      this.nodeData[layer].splice(index, 0, ...this.pointTemplate)
    }
  }
}
</script>
