<template>
  <div>
    光路组成
    <div style="padding-top: 10px;padding-bottom: 10px;">
      <el-input suffix-icon="el-icon-search" placeholder="搜索已显示光路" v-model="searchText"></el-input>
    </div>
    <el-card class="card-class" style="overflow-y: auto">
      <div style="overflow-y: auto">
        <center v-if="!searchList.length">暂无数据</center>
        <div v-for="(item, index) in searchList" :key="index">
          <div>
            {{ item.name }}
            <div>
              <el-button
                type="primary"
                @click="$alertInfo(item, 'lightRoad')"
                size="mini"
              >{{$t('alert.view')}}</el-button>
              <el-button
                type="danger"
                v-if="type !== 'edit'"
                @click="deleteInfo(index)"
                size="mini"
              >删除</el-button>
            </div>
            <hr class="item-inline" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: {
    type: String,
    result: Array
  },
  data () {
    return {
      searchText: '',
      searchList: []
    }
  },
  watch: {
    result: function (newVal) {
      this.searchList = newVal
    }
  },

  methods: {
    deleteInfo (info) {
      this.searchList.splice(info, 1)
      this.$emit('deleteInfo', this.searchList)
    }
  }
}
</script>

<style >
.item-inline {
  margin: 10px;
}
.card-class {
  overflow-y: auto;
  min-width: 20vw;
  min-height: 35vh;
  max-height: 35vh;
}
</style>