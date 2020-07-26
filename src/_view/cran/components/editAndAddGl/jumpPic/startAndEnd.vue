<template>
  <div>
    <el-card :body-style="{'padding': '0px'}" shadow="never" style="margin-top: 5px;">
      <draw-point @returnData="(e) => {editInfo = {...e}}" :info="dataInfo" :type="type"></draw-point>
    </el-card>

    <ptn-and-otn v-if="edit" @returnData="getReturnData" :info="editInfo"></ptn-and-otn>
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
    info: Object
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
    immediate:true
    }
  },
  methods: {
    getReturnData (args) {
      this.$emit('returnData', args)
      this.dataInfo = args

    }
  }
}
</script>
