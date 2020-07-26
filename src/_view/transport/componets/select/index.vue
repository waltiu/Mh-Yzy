<template>
  <div>
    <div class="search">
      <el-form ref="form" :model="search" label-width="100px">
        <el-form-item label="网元">
          <el-select
            v-model="search.wy"
            filterable
            remote
            reserve-keyword
            value-key="id"
            @change="change"
            clearable
            @clear="clear"
            width="200px"
            :remote-method="searchWy"
          >
            <el-option v-for="item in list.wy" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="光路">
          <el-select
            v-model="search.gl"
            filterable
            remote
            reserve-keyword
            value-key="id"
            @change="change"
            clearable
            @clear="clear"
            :remote-method="searchGl"
          >
            <el-option v-for="item in list.gl" :key="item.id" :label="item.name" :value="item"></el-option>
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
        wy: "",
        gl: ""
      },
      list: {
        wy: {},
        gl: {}
      },
      defaultList: {
        wy: {},
        gl: {}
      }

    }
  },
  methods: {
    clear () {
      this.searchWy()
      this.searchGl()
    },
    searchWy (info) {
      if (info) {
        this.search.wy = info
      }
      // /api/ldsysEquipments / search / findByNameLike
      this.$http.get("/api/ldsysEquipments/search/findByNameLike", {
        params: {
          name: "%" + this.search.wy + "%",
          page: 0,
          size: 10
        }
      })
        .then(res => {
          this.list.wy = res.data._embedded.ldsysEquipments
        })
    },
    searchGl (info) {
      if (info) {
        this.search.gl = info
      }
      // /api/ldsysEquipments / search / findByNameLike
      this.$http.get("/api/ldsysOpticalCableWays/search/findByNameLikeAndEpAndM", {
        params: {
          name: "%" + this.search.gl + "%",
          page: 0,
          size: 10
        }
      })
        .then(res => {
          this.list.gl = res.data._embedded.ldsysOpticalCableWays
        })
    },
    change (info) {
      if (info) {
        const data = [info].map(item => {
          return {
            name: item.name,
            id: item.id,
            type: item.type
          }
        })
        if (data[0].type === 10) {
          this.$emit('nodeData', data)

        } else {
          this.$emit('linkData', info)
        }

      }
    }
  },
  mounted () {
    this.searchWy()
    this.searchGl()
  }

}
</script>

<style>
</style>