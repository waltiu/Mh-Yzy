<template>
  <div>
    <div style="display:flex">
      <choose @nodeData="getChooseNode" @linkData="getChooseLink"></choose>
      <el-button type="primary" @click="create" class="createButton">新建网元</el-button>
    </div>
    <edit-info-wy
      :type="createWyOption.type"
      :tableData="createWyOption.tableData"
      :optionName="optionName"
    ></edit-info-wy>
    <edit-info-gl
      :type="createGlOption.type"
      :tableData="createGlOption.tableData"
      :optionName="optionName"
      :createGl="createGl"
      @returnLineData="returnLineData"
    ></edit-info-gl>
    <to-po-flow
      :nodeData="nodeData"
      :linkData="linkData"
      :optionName="optionName"
      :changeToPoData="submitTopoData"
      :defaultData="fullData"
      @createLink="createLink"
      @deleteData="deleteData"
      @addNode="addNode"
      @returnLinkAndNodes="returnLinkAndNodes"
      @deleteNode="deleteNode"
      @nullCreate="nullCreate"
    ></to-po-flow>
  </div>
</template>

<script>
import editInfoWy from '../../componets/editandadd/editAndAddWy'
import editInfoGl from '../../componets/editandadd/editAndAddGl'
import choose from '../../componets/select'
import toPoFlow from '../../componets/topoflow'
export default {
  name: "editChart",
  components: {
    choose,
    toPoFlow,
    editInfoWy,
    editInfoGl
  },
  props: {
    fullData: Object
  },
  watch: {
    nodeData: function (newVal) {
      return newVal
    },
    fullData: function (newVal) {
      this.submitTopoData = newVal
      this.$emit('topoData', this.submitTopoData)

    },
    createLink: function (newVal) {
      return newVal
    },
    linkData: function (newVal) {
      this.submitTopoData.links.push(newVal.link)
    }

  },
  data () {
    return {
      data: {},
      nodeData: [],
      linkData: {},
      submitTopoData: {
        nodes: [],
        links: []
      },
      createWyOption: {
        type: "device",
        tableData: {}
      },
      createGlOption: {
        type: "lightRoad",
        tableData: {}
      },
      optionName: "",
      createGl: {}
    }
  },
  mounted () {
    this.optionName = this.$options.name
  },
  methods: {
    deleteData (info) {
      this.submitTopoData = info
      this.$emit('topoData', this.submitTopoData)
    },
    getChooseNode (info) {
      this.nodeData = info
    },
    getChooseLink (info) {
      this.linkData = {
        link: {
          from: info.jumperInfo.start.id,
          to: info.jumperInfo.end.id,
          id: info.id,
          type: '1'
        },
        nodes: [
          {
            id: info.jumperInfo.start.id,
            name: info.jumperInfo.start.name
          }, {
            id: info.jumperInfo.end.id,
            name: info.jumperInfo.end.name
          }
        ]
      }
    },
    returnLinkAndNodes (info) {

      this.returnLineData(info)
      let startNode = info.data.jumperInfo.start
      let endNode = info.data.jumperInfo.end
      this.submitTopoData.nodes.push(startNode)
      this.submitTopoData.nodes.push(endNode)

    },
    create () {
      this.createWyOption.tableData = { add: 0 }
    },
    deleteNode (info) {
      this.submitTopoData = info
    },
    addNode (node) {
      var a = {
        x: 20,
        y: 30
      }
      a.name = node.name
      a.id = node.id
      a.type = "10"
      this.submitTopoData.nodes.push(a)
      // console.log(this.submitTopoData)
      this.$emit('topoData', this.submitTopoData)

    },
    nullCreate (info) {
      let a = this.submitTopoData.links.every(item => {
        // console.log(item.from, info.from)
        return item.from !== info.from || item.to !== info.to
      })
      if (a) {
        this.submitTopoData.links.push(info)
      }
      // console.log(this.submitTopoData)
      this.$emit('topoData', this.submitTopoData)

    },
    createLink (info) {
      if (info.id) {
        this.$getTableFullInfo('lightRoad', { id: info.id }, (e) => {
          this.createGlOption.tableData = e.data
        })
      } else {
        let data = {
          start: {
            name: '',
            id: ''
          },
          end: {
            name: '',
            id: ''
          }
        }
        data.start.name = info.start.name
        data.start.id = info.start.id
        data.end.name = info.end.name
        data.end.id = info.end.id
        this.createGl = data
        this.createGlOption.tableData = { add: 0 }

      }
    },
    returnLineData (info) {
      let data = info.data.jumperInfo
      // 结点点击连线
      let a = info.data
      let b = this.submitTopoData.links
      b.map(item => {
        if (item.from === data.start.id && item.to === data.end.id) {
          item.id = a.id
          item.type = '1'
        }
      })
    }

  },

}
</script>
<style scoped>
.createButton {
  position: relative;
  left: 20px;
  width: 100px;
  height: 40px;
  top: 30px;
}
</style>