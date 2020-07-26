<template>
  <div v-loading="loading">
    <div style="display: flex"></div>
    <h3>{{$t('diffRoute.searchResult')}}：</h3>
    <div style="padding: 10px;">
      <div v-if="!String(result) && !loading">{{$t('dynamic.noData')}}</div>

      <div v-else-if="!loading">
        <el-steps style="margin: 10px;" direction="vertical" :active="result.length" align-center>
          <el-step v-for="(item, index) in result" :key="index" :title="item.name">
            <div slot="icon">
              <public-svg-icons width="25px" height="25px" :svgType="iconListById[item.type].icon"></public-svg-icons>
            </div>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'layingResult',
  props: {
    bus: Object
  },
  data () {
    return {
      mapDom: () => { },
      loading: true,
      result: []
    }
  },
  computed: {
    iconListById: function () {
      return this.$store.getters.vendorNameByType.icon.reduce((res, val) => {
        if (val.type) {
          res[val.type] = val
        }
        return res
      }, {})
    }
  },
  mounted () {
    // console.log(this.bus.bearer.start.id, this.bus.bearer.end.id)
    // this.$http.get('/static/test.json', {
    this.$http.get('/api/pointGraph/shortPath', {
      params: {
        // aId: 44311,
        // bId: 44315
        aId: this.bus.bearer.start.id,
        bId: this.bus.bearer.end.id
      }
    })
      .then(res => {
        this.loading = false
        this.result = res.data
        this.$emit('returnData', res.data)
      })
  }
}
</script>
