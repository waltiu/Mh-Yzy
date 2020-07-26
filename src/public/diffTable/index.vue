<template>
  <div>
    <!-- 引用带有分页的表格 -->
    <table-and-paging :colums="colums" :tableData="tableData"></table-and-paging>
  </div>
</template>

<script>
export default {
  name: 'diffTable',
  props: {
    info: Object,
    colum: Array
  },
  computed: {
    tableData: function () {
      let lang = 0
      Object.entries(this.info).forEach(([, val]) => {
        if (val && val.length > lang) {
          lang = val.length
        }
      })
      let returnData = []
      for (let index = 0; index < lang; index++) {
        let tmp = {}
        for (const iterator of this.colums) {
          tmp[iterator.key] = this.info[iterator.key][index] || ''
        }
        returnData.push(tmp)
      }
      return returnData
    },
    store: function () {
      return { ...this.$store.state.vendor.vendorName }
    },
    colums: function () {
      let self = this
      return this.colum.map(a => {
        return {
          title: this.store[a].name,
          key: a,
          render: (h, params) => {
            if (params.row[a]) {
              return h('div', [
                h('el-button', {
                  props: {
                    type: 'primary',
                    icon: 'el-icon-info',
                    size: 'mini',
                    circle: true
                  },
                  on: {
                    click () {
                      self.$alertInfo(params.row[a], self.$store.state.vendor.vendorName[a].alert)
                    }
                  }
                }),
                h(
                  'p',
                  params.row[a].name)
              ])
            }
          }
        }
      })
    }
  }
}
</script>
