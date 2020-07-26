<template>
  <div>
    <el-select
      :loading="loading"
      :remote="true"
      :placeholder="$t('infoMap.locationSearch')"
      size="small"
      v-model="selected"
      filterable
      :remote-method="search"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="`${item.name} (${item.location.lng}, ${item.location.lat})`"
        :value="JSON.stringify(item)"
      >
        <span style="float: left">
          {{ item.name }}
          <span
            style="float: right; color: #8492a6; font-size: 13px"
          >{{ computedCity(item) }}</span>
        </span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { baiduAK } from '@/_config/baiduAk'

export default {
  name: 'localAutoComplete',
  data () {
    return {
      style: {
        width: '200px'
      },
      loading: false,
      options: [
      ],
      selected: ''
    }
  },
  methods: {
    clearAll () {
      this.options = []
      this.selected = ''
    },
    computedCity (info) {
      // 检出列表, 分先后
      let checkList = ['address', 'area', 'city', 'province']
      let returnData = ''
      // 遍历
      for (const iterator of checkList) {
        // 拼接
        if (info[iterator]) {
          returnData = returnData + ', ' + info[iterator]
        }
      }
      return '　' + returnData.slice(1)
    },
    search (newVal) {
      this.loading = true
      let center = this.$store.state.infoMapShow.mapProperty.center
      this.$http.get('/searchLocaltion', {
        params: {
          ak: baiduAK,
          query: newVal,
          location: `${center.lat},${center.lng}`,
          output: 'json'
        }
      })
        .then((result) => {
          if (result.data.status === 0) {
            this.options = result.data.results
            this.loading = false
          }
        })
    }
  },
  watch: {
    selected: function (newVal) {
      newVal = JSON.parse(newVal)
      // 设置Style
      this.style = { width: `${newVal.name} (${newVal.location.lng}, ${newVal.location.lat})`.length * 9.3 + 'px' }
      // 设置地图中心
      this.$store.commit('setMapCenter', newVal.location)
      // 弹框
      this.$message({
        message: this.$i18n.t('infoMap.setMap') + newVal.name + this.$i18n.t('infoMap.coordinate') + newVal.location.lng + ', ' + newVal.location.lat,
        type: 'success',
        showClose: true,
        duration: 5000
      })
    }
  }
}
</script>
