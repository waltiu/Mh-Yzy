<template>
  <div>
    <div style="display: flex; ">
      <div>
        <select-show :selectInfo="previewList" @change="(info) => { showInfo = info }"></select-show>

        <map-show style="margin-top: 10px;" :showInfo="showInfo"></map-show>
      </div>

      <local-search style="margin-left: 20px;" :result="previewList"></local-search>
    </div>
    <remote-search style="margin-top: 20px;" @addPreview="emitData"></remote-search>
  </div>
</template>

<script>
import MapShow from '../map'
import SelectShow from '../select'
import RemoteSearch from './remotesearch'
import LocalSearch from './search'

export default {
  name: 'NetEdit',
  components: {
    MapShow, SelectShow, RemoteSearch, LocalSearch
  },
  props: {
    fullData: Object
  },
  data () {
    return {
      showInfo: [],
      selectInfo: [],
      previewList: []
    }
  },
  watch: {
    fullData: {
      handler: function (newVal) {
        this.previewList = newVal.ldsysOpticaleCableWorks
        this.showInfo = this.previewList
      },
      deep: true
    }
  },
  methods: {
    emitData (info) {
      if (this.previewList.length === 0) {
        this.previewList.push(info)

      } else {
        var someResult = this.previewList.every(function (item) {
          return (item.id !== info.id);
        });

        if (someResult) {
          // console.log(someResult)
          this.previewList.push(info)
        } else {
          this.$notify.error({
            title: '错误',
            message: '这条数据已经添加'
          });
        }

        this.showInfo = this.previewList
        this.$emit('returnData', {
          ldsysOpticaleCableWorks: this.previewList
        })
      }
    }
  }}
</script>
