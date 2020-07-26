<template>
  <div>
    <div style="display:flex;">
      <choose :fullData="fullData" @changeInfo="changeInfo"></choose>
      <div class="tips" style="display:flex;">
        <div>
          <div style="display:flex;margin-left:30px">
            <p style="width:100%">当前设备：</p>
            <div style="width:100px;height:20px;border:1px solid red"></div>
          </div>
          <div style="display:flex;margin-left:30px">
            <p style="width:100%">对端设备：</p>
            <div style="width:100px;height:20px;border:1px solid blue"></div>
          </div>
        </div>
        <div>
          <div style="display:flex;margin-left:30px">
            <p style="width:100%">上联设备：</p>
            <div style="width:100px;height:20px;border:1px solid green"></div>
          </div>
          <div style="display:flex;margin-left:30px">
            <p style="width:100%">关联设备：</p>
            <div style="width:100px;height:20px;border:1px solid black"></div>
          </div>
        </div>
      </div>
    </div>
    <to-po-flow :topoData="computedTopo" :allData="topoData" @getLightLoad="getLightLoad"></to-po-flow>
    <edit
      :type="createGlOption.type"
      :tableData="createGlOption.tableData"
      :cranIds="cranIds"
      :createGl="createGl"
      @returnLineData="returnLineData"
      v-if="showEdit"
    ></edit>
  </div>
</template>

<script>
import toPoFlow from '../../../components/toPoflow'
import choose from './choose'
import edit from '../../../components/editAndAddGl'
export default {
  name: 'card',
  components: {
    choose,
    toPoFlow,
    edit
  },
  data () {
    return {
      topoData: {
        topologyInfo: {}
      },
      showEdit: false,
      subdata: {},
      createGlOption: {
        type: "lightRoad",
        tableData: {}
      },
      cranIds: {
        start: {
          id: ''
        },
        end: {
          id: ''
        }
      },
      createGl: {

      }
    }
  },
  props: {
    fullData: Object
  },
  methods: {
    returnLineData (info) {
      let a = this.topoData
      a.topologyInfo.links.map(item => {
        if (item.from === info.data.jumperInfo.start.id && item.to === info.data.jumperInfo.end.id) {
          item.id = info.data.id

        }
      })
      this.computedTopo = a.topologyInfo
      this.subdata = info.data
    },
    changeInfo (newVal) {
      this.topoData.topologyInfo = newVal.topologyInfo
      this.topoData.parent = newVal.parent
      this.$emit('changeInfo', this.topoData)
    },
    getLightLoad (info) {
      this.showEdit = true
      if (this.subdata) {
        this.createGlOption.tableData = this.subdata
      }
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
        this.$http.get(`api/ldsysOpticalMultiplexers/${info.from}`).then(res => {
          data.start.id = res.data.id
          data.start.name = res.data.omSN
          data.start.type = res.data.type
          this.createGl = { ...data }
        })
        this.$http.get(`api/ldsysOpticalMultiplexers/${info.to}`).then(res => {
          data.end.id = res.data.id
          data.end.name = res.data.omSN
          data.end.type = res.data.type
          this.createGl = { ...data }

        })
        this.createGlOption.tableData = { add: 0 }

      }
    }
  },
  watch: {
    fullData: {
      handler: function (newVal) {
        this.topoData = newVal
      },
      deep: true
    },

  },
  computed: {
    computedTopo: function () {
      let b = {}
      if (this.topoData.topologyInfo.nodes) {

        let a = this.topoData.topologyInfo.nodes.map(item => {
          if (this.topoData.parent && item.id === this.topoData.parent.id) {
            item = { ...item, ...{ color: 'blue' } }
          }
          if (this.topoData.child && item.id === this.topoData.child.id) {
            item = { ...item, ...{ color: 'green' } }
          }
          if (item.id === this.topoData.id) {
            return { ...item, ...{ color: 'red' } }
          } else {
            return item

          }
        })
        b = this.topoData.topologyInfo
        b.nodes = a
      }
      return b
    }
  }
}
</script>

<style>
.tips {
  margin-left: 30px;
  position: relative;
  top: 28px;
}
</style>