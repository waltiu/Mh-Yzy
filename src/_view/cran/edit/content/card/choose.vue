<template>
  <div>
    <div class="search">
      <el-form ref="form" :model="search" label-width="200px">
        <el-form-item label="分合波器对端设备">
          <el-select
            v-model="search.Cran"
            filterable
            remote
            ref="input"
            reserve-keyword
            value-key="id"
            @change="change"
            clearable
            @clear="clear"
            width="200px"
            :remote-method="searchCran"
          >
            <el-option v-for="item of list" :key="item.id" :label="item.omSN" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'choose',
  data () {
    return {
      search: {
        Cran: ""
      },
      list: {

      },
      defaultList: {
        Cran: {}
      },
      childList: []

    }
  },
  watch: {
    fullData: {
      handler: function (newVal) {
        this.crantf(this.fullData)
        if (newVal && newVal.parent) {
          this.search.Cran = newVal.parent.omSN

        }
      },
      immediate: true,
      deep: true
    },

  },
  props: {
    fullData: Object,
    detailData: Object
  },
  methods: {
    clear () {
      this.$confirm('此操作将删除对端设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.patch(`api/ldsysOpticalMultiplexers/${this.fullData.id}/setOpposite`).then((res) => {
          if (res.status === 200) {
            this.$http.get(`api/ldsysOpticalMultiplexers/${this.fullData.id}`).then(res => {
              let a = res.data
              this.$emit('changeInfo', a)
            })
          }
        })
      }).catch(() => this.search.Cran = this.fullData.parent.omSN)

    },
    searchCran (info) {
      if (info) {
        this.search.Cran = info
      }
      // /api/ldsysEquipments / search / findByNameLike
      this.$http.get("/api/ldsysOpticalMultiplexers/search/findPage", {
        params: {
          omSN: "%" + this.search.Cran + "%",
          page: 0,
          size: 10
        }
      })
        .then(res => {
          this.list = res.data._embedded.ldsysOpticalMultiplexers
          this.list = this.list.filter(item => {
            return item.id !== this.fullData.id
          })

        })
    },
    crantf (info) {
      if (info.child) {
        this.childList.push(info.child.id)
        this.crantf(info.child)
      }
    },
    TF (info) {
      this.crantf(this.fullData)
      let tf = true
      if (info.child) {
        tf = false
        this.$store.commit('setSysStatus', {
          info: {
            msg: '您选择的对端设备已被占用，请重新选择！',
            code: '500',
            time: new Date(),
            msgEn: '您选择的对端设备已被占用，请重新选择！'
          },
          key: 'httpErr',
        })
        this.search.Cran = ""
      } else if (info.id === this.fullData.id) {
        tf = false
        this.search.Cran = ""


        this.$store.commit('setSysStatus', {
          info: {
            msg: '对端设备选择错误，请重新选择！',
            code: '500',
            time: new Date(),
            msgEn: '对端设备选择错误，请重新选择！'
          },
          key: 'httpErr',
        })
      } else if (this.fullData.type === 13 && this.fullData.child) {
        tf = false
        this.search.Cran = ""
        this.$store.commit('setSysStatus', {
          info: {
            msg: '当前分合波器为MUX/DEMUX类型已存在上联设备,暂不能添加对端！',
            code: '500',
            time: new Date(),
            msgEn: '当前分合波器为MUX/DEMUX类型已存在上联设备,暂不能添加对端！'
          },
          key: 'httpErr',
        })
      } else if (this.childList.includes(info.id)) {
        tf = false
        this.search.Cran = ""
        this.$store.commit('setSysStatus', {
          info: {
            msg: '添加对端设备错误,请重新选择！',
            code: '500',
            time: new Date(),
            msgEn: '添加对端设备错误,请重新选择！'
          },
          key: 'httpErr',
        })
      }
      return tf
    },
    change (info) {
      this.list = []
      if (!this.fullData.father && this.TF(info)) {
        this.$confirm(`是否选择${info.omSN}作为当前设备的对端设备`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.patch(`api/ldsysOpticalMultiplexers/${this.fullData.id}/setOpposite`, {
            id: Number(info.id)
          }).then((res) => {
            if (res.status === 200) {
              this.$http.get(`api/ldsysOpticalMultiplexers/${this.fullData.id}`).then(res => {
                let a = res.data
                this.$emit('changeInfo', a)
                this.$refs.input.blur()

              })
            }
          })
        })
      }


    }


  },
  mounted () {


  }

}
</script>

<style>
</style>