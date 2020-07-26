<template>
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t($pageUrl[type].name) + $t('OS.information')"
      @close="$emit('close')"
    >
      <div v-loading="loading">
        <!-- 基础信息 -->
        <el-tabs value="baseInfo">
          <el-tab-pane :label="$t('main.basicInformation')" name="baseInfo">
            <show-table-info :isMixins="false" :table="columns" :info="fullData">
              <div slot="bar"></div>
            </show-table-info>

            <sys-role-list :info="fullData"></sys-role-list>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>

export default {
  name: 'userAlertPage',
  props: {
    type: String,
    selectArrayShow: Object,
    columns: Array
  },
  components: {
  },
  data () {
    return {
      loading: true,
      fullData: {}
    }
  },
  watch: {
    selectArrayShow: {
      handler: function (newVal) {
        const p = this.columns[10].cityJson.p
        const d = this.columns[10].cityJson.d
        const c = this.columns[10].cityJson.c

        this.loading = true
        this.$api.get({
          url: '/api/sysUsers/search/findOneUserById',
          args: {
            id: newVal.id
          }
        }, e => {
          this.fullData = e.data
          if (this.fullData.belongCity || this.fullData.belongCountry || this.fullData.belongProvince) {
            let province = ''
            let city = ''
            let country = ''
            if (p[this.fullData.belongProvince]) {
              province = `${p[this.fullData.belongProvince]}省`
            }
            if (c[this.fullData.belongProvince][this.fullData.belongCity]) {
              city = `-${c[this.fullData.belongProvince][this.fullData.belongCity]}`
            }
            if (this.fullData.belongCountry) {
              country = `-${d[this.fullData.belongCity][this.fullData.belongCountry].name}`
            }
            this.fullData.cityInfo = `${province}${city}${country}`
          } else {
            this.fullData.cityInfo = '-'
          }
          this.loading = false
        })
      }
    }
  }
}
</script>
//