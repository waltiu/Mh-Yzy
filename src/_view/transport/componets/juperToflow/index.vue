<template>
  <div>
    <div id="jumpertoflow1" style="width:1073px"></div>
  </div>
</template>

<script>
import TopoFlow from 'topoflow';
import odf from '../img/odf.png'
import wy from '../img/网元.png'
import gj from '../img/光交箱.png'
export default {
  name: 'toPoFlow',
  data () {
    return {
      jumpertoflow: [],
      config: {},
      allData: [],
    }
  },
  props: {
    defaultData: Object,
  },

  watch: {
    defaultData: function (newVal) {
      this.jumpertoflow.setData(newVal)
    }
  },

  mounted () {
    let data = {}
    if (this.defaultData) {
      data = this.data
    }
    this.config = {
      eln: '#jumpertoflow1',
      data: data,
      height: '500px',
      width: '1073px',
      alphaDecay: 0.1,
      alpha: 1,
      distance: 40,
      radius: 70,
      strength: -10,
      // linkTemplate: {
      //   "1": {
      //     renderNode: (defs) => {
      //       defs
      //         .attr('stroke', '#F00')
      //     }
      //   },
      //   "0": {
      //     renderNode: (defs) => {
      //       defs
      //         .attr('stroke', '#666666')
      //     }
      //   }
      // },
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
        },
        "2": {
          width: 50,
          height: 50,
          operatingPoint: [
            'left', 'right'
          ],
          renderNode: (node, nodeInfo) => {

            node.append('image')
              .attr('xlink:href', odf)
              .attr('height', nodeInfo.height)
              .attr('width', nodeInfo.width)
            node.append('text')
              .attr('x', -20)
              .attr('y', 60)
              .html(nodeInfo.name);
          }
        },
        "1": {
          width: 50,
          height: 50,
          operatingPoint: [
            'left', 'right'
          ],
          renderNode: (node, nodeInfo) => {
            node.append('image')
              .attr('xlink:href', gj)
              .attr('height', nodeInfo.height)
              .attr('width', nodeInfo.width)
            node.append('text')
              .attr('x', -20)
              .attr('y', 60)
              .html(nodeInfo.name);
          }
        },
      },
      onSelectNode: (eln, node) => {
        const nodeDetail = {
          id: node.id,
          name: node.name,
          type: node.type
        }
        this.$emit("getNodeDetail", nodeDetail)
      },
    };
    this.jumpertoflow = new TopoFlow(this.config);

  }


}
</script>

<style>
</style>