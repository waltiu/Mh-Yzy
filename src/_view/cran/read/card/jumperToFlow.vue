<template>
  <div>
    <topoflow :topoData="showData" @nodeDetail="nodeDetail"></topoflow>
    <node-detail :detail="node"></node-detail>
  </div>
</template>

<script>
import nodeDetail from '../../components/nodeDetail'
import topoflow from '../../components/jumperToFlow'
export default {
  name: 'jumperToFlow',
  components: {
    topoflow,
    nodeDetail
  },
  props: {
    defaultData: {},
    node: {}
  },
  methods: {
    nodeDetail (info) {
      this.node = info
    }
  },
  data () {
    return {
      showData: {}
    }
  },
  watch: {
    defaultData: {
      handler: function (newVal) {
        this.showData = newVal.jumpCoreInfo
        this.showData.links.map(item => {
          return item.id = null
        })
      },
      immediate: true
    }
  }
}
</script>

<style>
</style>