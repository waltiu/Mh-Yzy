<template>
  <div>
    <div id="topoflow1" style="width:1073px" class="topo"></div>
  </div>
</template>

<script>
import TopoFlow from 'topoflow';
// import odf from './img/ODF.png'
// import wy from '../img/网元.png'
// import gj from './img/光交向'
export default {
  name: 'toPoFlow',
  data () {
    return {
      topoflow: []
    }
  },
  props: {
    topoData: Object,
    allData: Object

  },
  watch: {
    topoData: {
      handler: function (newVal) {
        if (newVal) {
          this.topoflow.setData(newVal);

        }
      },
    }
  },
  mounted () {
    this.toPo()
  },
  methods: {
    toPo () {
      let config = {
        eln: '#topoflow1',
        data: {},
        height: '500px',
        width: '1073px',
        alphaDecay: 0.1,
        alpha: 1,
        radius: 70,
        strength: -1000,
        linkTemplate: {
          "1": {
            renderNode: (defs) => {
              defs.attr('stroke', '#F00')
              defs.attr('text', '111')
              defs.append('text').text('text')
              defs.text('adsa')

            }
          },
          "0": {
            renderNode: (defs) => {
              defs.attr('stroke', '#666666')
              defs.append('text').text('text')
              defs.text('adsa')


            }
          }
        },
        nodeTemplate: {
          // 对应的nodes信息数据结构中的type字段
          "13": {
            width: 300,
            height: 50,
            deleteAble: true,
            operatingPoint: [
              'left', 'right'
            ],
            renderNode: (node, nodeInfo) => {
              node.append('svg:rect')
                .style('fill', 'white')
                .style('stroke', nodeInfo.color || 'black')
                .attr('height', 50)
                .attr('width', 300)
              node.append('text')
                .attr('x', 25)
                .attr('y', 30)
                .html(nodeInfo.name);
              node.append('text')
                .attr('x', 215)
                .attr('y', 30)

                .html('MUX/DEMUX ')
            }
          },
          "14": {
            width: 300,
            height: 50,
            deleteAble: true,
            operatingPoint: [
              'left', 'right'
            ],
            renderNode: (node, nodeInfo) => {

              node.append('svg:rect')
                .style('fill', 'white')
                .style('stroke', nodeInfo.color || 'black')
                .attr('height', 50)
                .attr('width', 300)
              node.append('text')
                .attr('x', 25)
                .attr('y', 30)
                .html(nodeInfo.name);
              node.append('text')
                .attr('x', 255)
                .attr('y', 30)
                .html('OADM');
            }
          }
        },

        onSelectLink: (eln, node) => {
          this.$emit('showLightLoad', node)

          if (node.from === this.allData.id && node.to === this.allData.parent.id) {
            this.$emit('getLightLoad', node)
          } else {

            this.$store.commit('setSysStatus', {
              info: {
                msg: '只能修改当前设备的相关光路，请重新选择！',
                code: '500',
                time: new Date(),
                msgEn: '只能修改当前设备的相关光路，请重新选择！'
              },
              key: 'httpErr',
            })
          }
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
        },

        onDeleteLink: link => {
          return new Promise((resolve) => {
            resolve(link);
          });

        },



      };
      this.topoflow = new TopoFlow(config);
    }

  }



}
</script>

<style scoped>
.topo {
  position: absolute;
}
</style>