<template>
  <div style="line-height:30px;margin-right:5px">
    <el-switch v-model="swicthStatus" @change="search" style="padding-right:4px;margin-top:-2px"></el-switch>{{$t('_view.showArea')}}
  </div>
</template>

<script>
export default {
  name: 'FilterOverArea', 
  props: {
    request: Object
  },
  data () {
    return {
      swicthStatus: false
    }
  },
  methods: {
    search () {
      this.request.search({ args: { overArea: this.swicthStatus } })
    }
  },
}
</script>
