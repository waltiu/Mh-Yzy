<template>
  <div>
    <div id="topoflow1" style="width:1073px"></div>
  </div>
</template>

<script>
import TopoFlow from 'topoflow';
// import odf from './img/ODF.png'
import wy from '../img/网元.png'
// import gj from './img/光交向'
export default {
  name: 'toPoFlow',
  data () {
    return {
      topoflow: [],
      config: {},
      allData: [],
    }
  },
  props: {
    defaultData: Object,
    nodeData: Array,
    linkData: Object,
    changeToPoData: Object,
    optionName: String,
  },
  methods: {
    editLinkData (node) {
      const startAndEnd = {}
      if (node.id) {
        startAndEnd.name = node.name
        startAndEnd.end = node.end
        startAndEnd.start = node.from
        startAndEnd.end = node.to
        startAndEnd.id = node.id
      } else {
        const allNode = this.topoflow.getNodes();
        startAndEnd.start = allNode.filter((item) => {
          return item.id === node.from
        })[0]
        startAndEnd.end = allNode.filter((item) => {
          return item.id === node.to
        })[0]

      }
      this.$emit('createLink', startAndEnd)
    },
    addNodeData (nodeInfo) {
      const data = {
        type: "10",
        x: 0,
        y: 0,
        name: nodeInfo.name || nodeInfo[0].name,
        id: nodeInfo.id || nodeInfo[0].id
      }
      let allNode = this.topoflow.getNodes()
      const a = allNode.every((item) => {
        return item.id !== data.id
      })
      if (a) {
        this.topoflow.addNode(data)
        this.allData.push(data)
        this.$emit("addNode", data)
      } else {
        this.$message.error('网元已存在，请勿重复添加！');
      }
    }
  },
  watch: {
    'changeToPoData.links': function () {
      // this.topoflow.setData(this.changeToPoData)
    },
    nodeData: function (newVal) {
      this.addNodeData(newVal)



    },
    linkData: function (newVal) {
      this.addNodeData(newVal.nodes[0])
      this.addNodeData(newVal.nodes[1])
      let link = {
        from: newVal.nodes[0].id,
        to: newVal.nodes[1].id,
        id: newVal.link.id,
        type: '1'
      }
      this.topoflow.addLink(link)


      // this.topoflow.addLink()
    },
    defaultData: function (newVal) {
      this.topoflow.setData(newVal)
    },
    chanegToPoData: function (newVal) {
      this.topoflow.setData(newVal)
    },

  },

  mounted () {

    let data = {}

    this.config = {
      eln: '#topoflow1',
      data: data,
      height: '500px',
      width: '1073px',
      alphaDecay: 0.1,
      alpha: 1,
      distance: 40,
      radius: 70,
      strength: -10,
      linkTemplate: {
        "1": {
          renderNode: (defs) => {
            defs
              .attr('stroke', '#F00')
          }
        },
        "0": {
          renderNode: (defs) => {
            defs
              .attr('stroke', '#666666')
          }
        }
      },
      nodeTemplate: {
        // 对应的nodes信息数据结构中的type字段
        "10": {
          width: 50,
          height: 50,
          deleteAble: true,
          operatingPoint: [
            'left', 'right'
          ],
          renderNode: (node, nodeInfo) => {

            node.append('image')
              .attr('xlink:href', wy)
              .attr('height', nodeInfo.height)
              .attr('width', nodeInfo.width)
            node.append('text')
              .attr('x', -20)
              .attr('y', 60)
              .html(nodeInfo.name);
          }
        }
      },
      onSelectNode: (eln, node) => {
        const nodeDetail = {
          id: node.id,
          name: node.name,
          type: node.type
        }
        this.$emit("getNodeDetail", nodeDetail)
      },
      onSelectLink: (eln, node) => {
        // console.log(eln, node)
        this.editLinkData(node)
        this.$emit('readLink', { id: node.id })
      },
      onNodeContextMenuRender: (nodeInfo) => {
        if (nodeInfo.contextType === 'node') {
          return [
            { label: '删除节点', action: 'deleteNode' },
            { label: '详情', action: 'h_detail' }
          ];
        } else if (nodeInfo.contextType === 'link') {
          return [
            { label: '删除线', action: 'deleteLink' },
            { label: '详情', action: 'h_detail' }
          ]
        }
      },
      contextmenuClick: (node, action) => {
        switch (action.action) {
          case 'deleteNode':
            this.topoflow.deleteNode(node.id);
            break
          case 'deleteLink':
            this.topoflow.deleteLink(node);
            break
        }
        this.$emit('showCreateGl', node)
      },
      onConnect: (source) => {

        let link = {
          id: "",
          from: source.from,
          to: source.to,
          type: '0'
        }
        this.$emit("nullCreate", link)
        // if (source.from !== 'No1' && source.to !== "No2") {
        //   console.log(source.source, source.target)
        //   const allNode = this.topoflow.getNodes();

        //   allNode.map
        //   let start = {
        //     id: source.from
        //   }
        //   let end = {
        //     id: source.to
        //   }
        //   allNode.map(item => {
        //     if (item.id === start.id) {
        //       start.name = item.name
        //     }
        //     if (item.id === end.id) {
        //       end.name = item.name
        //     }
        //   })
        //   this.$emit("nullCreate", start, end)
        // }
      },
      onDeleteLink: link => {
        return new Promise((resolve) => {
          resolve(link);
        });

      },
      onChange: data => {
        if (data.type === "deleteNode" || data.type === "deleteLink") {
          this.$emit('deleteData', {
            nodes: data.nodes,
            links: data.links
          })
        }
        //   const chartData = {}
        //   chartData.links = data.links
        //   chartData.nodes = data.nodes
        //   this.$e
      }

    };
    this.topoflow = new TopoFlow(this.config);

  }


}
</script>

<style>
</style>