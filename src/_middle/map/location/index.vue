<template>
  <div style="width: 370px">
    <div style="display: flex">
      <input class="searchBox" :placeholder="$t('infoMap.locationSearch')" type="text" v-model.lazy="query" />
      <div class="searchbutton">
        <i class="el-icon-search searchIcon"></i>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <div v-if="query" class="contentInfo">
        <div v-if="loading" class="loadingText">
          <i class="el-icon-loading"></i>
          <span>{{$t('infoMap.loading')}}</span>
        </div>
        <div v-else>
          <div v-if="!queryData.length" class="contentLine">{{$t('infoMap.noData')}}</div>
          <div
            v-for="(item, index) in queryData"
            :key="index"
            class="contentLine"
            @click="submit(item)"
          >
            <div class="mainLine">
              <i class="el-icon-location-information" style="color: #409eff"></i>
              <div>{{ item.name }}</div>
            </div>
            <div class="miniLine">
              <div>{{ item.province }} {{ item.city }} {{ item.district }}</div>
              <div class="coorLine">
                <!-- 坐标 -->
                {{ item.location.lat }}, {{ item.location.lng }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getLocationList } from '@/_command/searchLocation'

export default {
  name: 'SearchAllLocation',
  data () {
    return {
      query: '',
      queryData: [],
      loading: true
    }
  },
  watch: {
    query: function () {
      !this.query || this.search()
    }
  },
  methods: {
    search () {
      this.loading = true
      getLocationList(this.query)
        .then(res => { this.queryData = res.result })
        .catch(this.$message.error)
        .finally(() => { this.loading = false })
    },
    submit (item) {
      this.$emit('center-change', item.location)
      // this.$message.success(`${this.$i18n.t('public.setMapCenterTo')}: ${item.name}`)
    }
  }
}
</script>

<style>
.coorLine {
  font-size: 12px;
}
.miniLine {
  font-size: 12px;
  color: silver;
  display: flex;
  justify-content: space-between;
}
.mainLine {
  display: flex;
}

.contentLine {
  cursor: pointer;
  padding: 13px;
  font-size: 15px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  text-align: left;
}
.loadingText {
  padding-top: 15px;
  text-align: center;
  font-size: 15px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.contentInfo {
  min-height: 50px;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
}
.searchIcon {
  font-size: 25px;
  color: white;
  margin-top: 7px;
}
.searchbutton {
  cursor: pointer;
  background-color: #3385ff;
  width: 70px;
  height: 39px;
  text-align: center;
}
.searchBox {
  box-sizing: border-box;
  border: 0;
  padding: 9px 0;
  border-left: 10px solid transparent;
  border-right: 27px solid transparent;
  line-height: 20px;
  font-size: 16px;
  height: 38px;
  color: #333;
  position: relative;
  border-radius: 2px 0 0 2px;
  width: 300px;
  text-rendering: auto;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: textfield;
  background-color: white;
  -webkit-rtl-ordering: logical;
  cursor: text;
  margin: 0em;
  font: 400 13.3333px Arial;
}
</style>
