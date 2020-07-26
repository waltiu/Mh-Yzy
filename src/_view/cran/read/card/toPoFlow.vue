<template>
  <div>
    <div style="display:flex;" class="tips">
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
    <to-po :topoData="defaultD" @showLightLoad="showLightLoad"></to-po>
    <link-detail :type="type" :columns="config" :selectArrayShow="selectArrayForShow"></link-detail>
  </div>
</template>

<script>
import linkDetail from '@/manage/lightRoad/lightRoad/alertPage'
import toPo from '../../components/toPoflow/read'
export default {
  name: 'toPoFlow',
  components: {
    toPo,
    linkDetail
  },
  props: {
    defaultData: Object
  },
  data () {
    return {
      defaultD: {},
      config: [],
      type: "",
      selectArrayForShow: {}
    }
  },
  methods: {
    showLightLoad (newVal) {
      if (newVal.id) {
        this.selectArrayForShow = { id: newVal.id }

      } else {

        this.$store.commit('setSysStatus', {
          info: {
            msg: '暂无光路信息！',
            code: '500',
            time: new Date(),
            msgEn: '暂无光路信息！'
          },
          key: 'httpErr',
        })
      }
    }
  },
  watch: {
    defaultData: function (newVal) {
      let a = newVal.topologyInfo.nodes.map(item => {
        if (newVal.parent && item.id === newVal.parent.id) {
          item = { ...item, ...{ color: 'blue' } }
        }
        if (newVal.child && item.id === newVal.child.id) {
          item = { ...item, ...{ color: 'green' } }
        }
        if (item.id === newVal.id) {
          return { ...item, ...{ color: 'red' } }
        }
        else {
          return item
        }
      })
      let b = newVal.topologyInfo
      b.nodes = a
      this.defaultD = b
    }
  },
  mounted () {
    this.type = "lightRoad"
    this.config = this.$allConfig['lightRoad']
  }
}
</script>

<style  scoped>
.tips {
  position: relative;
  top: -40px;
  left: 300px;
}
</style>>
