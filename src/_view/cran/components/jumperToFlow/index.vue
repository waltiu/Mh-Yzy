<template>
  <div>
    <div id="topoflow" style="width:1073px"></div>
  </div>
</template>

<script>
import odf from '@/_view/transport/componets/img/odf.png'
import gj from '@/_view/transport/componets/img/光交箱.png'
import cran from './分和波器.png'
import TopoFlow from 'topoflow';
import { type } from 'os';
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
        eln: '#topoflow',
        data: {},
        height: '500px',
        width: '1073px',
        alphaDecay: 0.1,
        alpha: 1,
        radius: 70,
        strength: -1000,
        linkTemplate: {
          "1": {
            deleteAble: false,
            renderNode: (defs) => {
              defs.attr('stroke', '#F00')
              defs.attr('text', '111')
              defs.append('text').text('text')
              defs.text('adsa')

            }
          },
          "0": {
            deleteAble: false,
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
            width: 50,
            height: 50,
            deleteAble: false,
            operatingPoint: [
              'left', 'right'
            ],
            renderNode: (node, nodeInfo) => {

              node.append('image')
                .attr('xlink:href', cran)
                .attr('height', nodeInfo.height)
                .attr('width', nodeInfo.width)
              node.append('text')
                .attr('x', 10)
                .attr('y', 0)
                .html(nodeInfo.name);
            }
          },
          "14": {
            width: 50,
            height: 50,
            deleteAble: false,
            operatingPoint: [
              'left', 'right'
            ],
            renderNode: (node, nodeInfo) => {

              node.append('image')
                .attr('xlink:href', cran)
                .attr('height', nodeInfo.height)
                .attr('width', nodeInfo.width)
              node.append('text')
                .attr('x', 10)
                .attr('y', 0)
                .html(nodeInfo.name);
            }
          },
          "2": {
            width: 50,
            height: 50,
            deleteAble: false,
            operatingPoint: [
              'left', 'right'
            ],
            renderNode: (node, nodeInfo) => {

              node.append('image')
                .attr('xlink:href', odf)
                .attr('height', nodeInfo.height)
                .attr('width', nodeInfo.width)
              node.append('text')
                .attr('x', 0)
                .attr('y', 0)
                .html(nodeInfo.name);
            }
          },
          "1": {
            width: 50,
            height: 50,
            deleteAble: false,
            operatingPoint: [
              'left', 'right'
            ],
            renderNode: (node, nodeInfo) => {
              node.append('image')
                .attr('xlink:href', gj)
                .attr('height', nodeInfo.height)
                .attr('width', nodeInfo.width)
              node.append('text')
                .attr('x', 0)
                .attr('y', 0)
                .html(nodeInfo.name);
            }
          },
        },
        onSelectNode: (eln, node) => {
          this.$emit('nodeDetail', { id: node.id, type: node.type, name: type.name })
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

<style>
</style>