<template>
  <div style="width: 30vw">
    <div style="padding-bottom: 10px;">
      <el-input
        suffix-icon="el-icon-search"
        :placeholder="$t('subdistricts.search')"
        v-model="searchText"
      ></el-input>
    </div>
    <el-card class="card-class" style="overflow-y: auto">
      <div style="overflow-y: auto">
        <center v-if="!searchList.length">{{$t('subdistricts.no_data')}}</center>
        <div v-for="(item, index) in searchList" :key="index">
          <div>
            {{ item.name }}
            <div>
              <el-button
                type="primary"
                @click="$alertInfo(item, 'deviceRoom')"
                size="mini"
              >{{$t('subdistricts.view')}}</el-button>
              <el-button
                v-if="!read"
                type="danger"
                @click="() => { deleteInfo(item) }"
                size="mini"
              >{{$t('subdistricts.delete')}}</el-button>
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
  name: "SearchResult",
  props: {
    read: Boolean,
    eventBus: Object
  },
  data () {
    return {
      searchText: "",
      baseSearchList: []
    };
  },
  computed: {
    searchList: {
      set: function (newVal) {
        this.baseSearchList = newVal;
      },
      get: function () {
        return this.baseSearchList.filter(item => item.name.includes(this.searchText));
      }
    }
  },
  watch: {
    eventBus: {
      immediate: true,
      handler: function () {
        this.eventBus
          .on('RemoteSearch', (res) => {
            if (!this.baseSearchList.find(item => item.id === res.id)) {
              this.baseSearchList.push(res)
            } else {
              this.$message.error(`列表中已经存在 ${res.name}, 添加失败。`)
            }
            this.eventBus.setState('machineRooms', this.baseSearchList)
          })
          .on('ToShowList', (val) => {
            this.baseSearchList = val
            this.eventBus.emit('ToSelect', val)
          })
      }
    }
  },
  methods: {
    deleteInfo (info) {
      let itemIndex = this.baseSearchList.reduce((res, val, index) => {
        if (info.name === val.name) {
          res = index;
        }
        return res;
      }, 0);
      this.$delete(this.baseSearchList, itemIndex)
      this.eventBus.setState('machineRooms', this.baseSearchList)
    }
  },
  mounted () {
    this.baseSearchList = this.eventBus.fullData.machineRooms || []

  },
};
</script>

<style>
.card-class {
  max-height: "45vh";
}
</style>