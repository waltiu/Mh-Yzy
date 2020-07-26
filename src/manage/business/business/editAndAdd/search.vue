<template>
  <div>
    光路搜索
    <el-input
      placeholder="搜索光路"
      v-model="searchText"
      style="padding-top: 10px;padding-bottom: 10px;"
      size="mini"
      @change="search"
    ></el-input>
    <el-card
      element-loading-text="请求详细数据..."
      v-loading="fullinfoloading"
      slot="content"
      class="card-line"
      style="overflow-y: auto; margin-top: 10px"
    >
      <div style="overflow-y: auto;">
        <div v-if="result.length">
          <div class="textline" v-for="(item, index) in result" :key="index">
            <div>{{ item.name }}</div>
            <div>
              <el-button
                type="primary"
                @click="$alertInfo(item, 'lightRoad')"
                size="mini"
              >{{$t('alert.view')}}</el-button>
              <el-button type="primary" @click="addPreview(item)" size="mini">添加</el-button>
            </div>
          </div>
        </div>
        <div v-else>
          <center>暂无数据</center>
        </div>
      </div>
    </el-card>
    <!-- </middle-search-info> -->
  </div>
</template>

<script>
import { ResourceApiLayer } from '@/_command/curd'
import { checkOutData } from '@/_command/tools'

export default {
  name: 'SearchLightRoad',
  computed: {
    request: function () {
      return new ResourceApiLayer('lightRoad')
    }
  },
  data () {
    return {
      fullinfoloading: false,
      searchText: '',
      result: []
    }
  },
  watch: {
    searchText: function () {
      this.search()
    }
  },
  methods: {
    search () {
      this.request.search({
        args: { name: this.searchText }
      })
        .then(checkOutData)
        .then(res => { this.result = res })
    },
    addPreview (item) {
      this.fullinfoloading = true
      this.request
        .readOneTable({ info: item })
        .then(res => this.$emit('returnData', { id: res.data.id, name: res.data.name }))
        .finally(() => {
          this.fullinfoloading = false

        })
    }
  },
}
</script>

<style>
.textline {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.card-line {
  min-height: 30vh;
  max-height: 30vh;
  overflow-y: auto;
}
</style>
