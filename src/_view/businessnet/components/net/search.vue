<template>
  <div style="width: 30vw">
    <div style="padding-bottom: 10px;">
      <el-input suffix-icon="el-icon-search" :placeholder="$t('fence.search')" v-model="searchText"></el-input>
    </div>
    <el-card class="showCard" style="overflow-y: auto">
      <div style="overflow-y: auto">
        <center v-if="!searchList.length">{{$t('tableSearch.noData')}}</center>
        <div v-for="(item, index) in searchList" :key="index">
          <div>
            {{ item.name }}
            <div>
              <el-button
                type="primary"
                @click="$alertInfo(item, 'business')"
                size="mini"
              >{{$t('alert.view')}}</el-button>
              <el-button
                type="danger"
                @click="() => { deleteInfo(index) }"
                size="mini"
              >{{$t('addZone.delete')}}</el-button>
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
    result: Array
  },
  data () {
    return {
      searchText: '',
      baseSearchList: []
    }
  },
  watch: {
    result: function (newVal) {
      this.baseSearchList = newVal
    }
  },
  computed: {
    searchList: {
      set: function (newVal) {
        this.baseSearchList = newVal
      },
      get: function () {
        return this.result.filter(item => item.name.includes(this.searchText))
      }
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

<style>
.showCard {
  max-height: 60vh;
  height: 80vh;
}
</style>