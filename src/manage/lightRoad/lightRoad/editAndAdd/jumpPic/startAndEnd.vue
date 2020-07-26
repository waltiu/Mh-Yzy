<template>
  <div>
    <el-card :body-style="{'padding': '0px'}" shadow="never" style="margin-top: 5px;">
      <draw-point @returnData="(e) => {editInfo = {...e}}" :info="dataInfo" :type="type"></draw-point>
    </el-card>

    <ptn-and-otn v-if="edit" @returnData="(args) => {$emit('returnData', args)}" :info="editInfo" @end=end></ptn-and-otn>
  </div>
</template>

<script>
import ptnAndOtn from './editDialog/ptnAndOtn'
import drawPoint from './drawPulblic/drawPoint'

export default {
  name: 'lightRoadStartAndEnd',
  props: {
    edit: Boolean,
    type: Object,
    info: Object,
    cran:Object
  },
  components: {
    drawPoint,
    ptnAndOtn
  },
  data () {
    return {
      dataInfo: {},
      editInfo: {},
      index: ''
    }
  },
  watch: {
    info: {
      handler:function (newVal) {
      this.dataInfo = { ...newVal }
    },
    immediate:true,
    deep:true
    },
    cran:{
      handler:function(newVal){
        this.dataInfo =newVal
        this.$emit('returnData', newVal)
    },
    immediate:true,
    deep:true
    }
  },
  methods: {
    end(info){
      this.$emit('end',{...info,...{play:"start"}})
    }
  }
}
</script>
