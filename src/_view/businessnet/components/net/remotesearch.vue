<template>
  <div>
    <el-card style="width: 100%;">
      {{$t('diffRoute.businessSearch')}}
      <el-input v-model="searchtext"></el-input>

      <div v-loading="loading">
        <div style="display:flex; padding: 10px;" v-for="(item, index) in searchList" :key="index">
          {{ item.name }}
          <el-button
            icon="el-icon-circle-plus-outline"
            size="mini"
            type="primary"
            @click="() => { addPreview(item) }"
          >{{$t('diffRoute.addPreview')}}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ResourceApiLayer } from '@/_command/curd';
import { checkOutData } from '@/_command/tools';

export default {
  name: 'RemoteSearch',
  props: {
  },
  data () {
    return {
      searchtext: '',
      loading: false,
      fullinfoloaing: false,
      searchList: []
    }
  },
  watch: {
    searchtext: function () {
      this.loading = true
      this.request
        .search({ args: { name: this.searchtext } })
        .then(checkOutData)
        .then(res => {
          this.searchList = res
        })
        .finally(() => { this.loading = false })
    }
  },
  computed: {
    request: function () {
      return new ResourceApiLayer('business')
    }
  },
  methods: {
    addPreview (item) {
      this.fullinfoloaing = true
      this.request.readOneMap({ info: item })
        .then(res => {
          this.$emit('addPreview', { id: res.data.id, name: res.data.name })
        })
        .finally(() => { this.fullinfoloaing = false })
    }
  },
}
</script>
